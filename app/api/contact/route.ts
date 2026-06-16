import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

export const runtime = "nodejs";

/**
 * Quick contact form handler.
 * - Honeypot (`company`) silently drops bots.
 * - Simple in-memory, per-IP rate limit (best-effort; resets on cold start).
 * - Delivers via Resend to Karen's inbox.
 */

type Payload = {
  name?: string;
  contact?: string;
  message?: string;
  needs?: string[];
  company?: string; // honeypot
};

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't learn anything.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const contact = (body.contact ?? "").trim();
  const message = (body.message ?? "").trim();
  const needs = Array.isArray(body.needs)
    ? body.needs.filter((n) => typeof n === "string").slice(0, 10)
    : [];

  if (!name || !contact) {
    return NextResponse.json(
      { error: "Please include your name and a way to reach you." },
      { status: 400 },
    );
  }
  if (name.length > 200 || contact.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "Message too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.business.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "website@the-remote-admin.com";

  // Without a configured key we can't deliver — fail clearly (also helps in dev).
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; cannot send contact email.");
    return NextResponse.json(
      { error: "Email is not configured yet." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const needsLine = needs.length ? needs.join(", ") : "Not specified";
  const html = `
    <h2>New website inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
    <p><strong>Needs:</strong> ${escapeHtml(needsLine)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message || "(no message)").replace(/\n/g, "<br>")}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: `The Remote Admin Website <${from}>`,
      to: [to],
      replyTo: contact.includes("@") ? contact : undefined,
      subject: `New inquiry from ${name}`,
      html,
      text: `New website inquiry\n\nName: ${name}\nContact: ${contact}\nNeeds: ${needsLine}\n\nMessage:\n${message || "(no message)"}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}

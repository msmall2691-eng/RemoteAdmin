import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/content/site";

export const runtime = "nodejs";

/**
 * Quick contact form handler.
 * - Honeypot (`company`) silently drops bots.
 * - Simple in-memory, per-IP rate limit (best-effort; resets on cold start).
 * - Delivers via Gmail SMTP straight to Karen's inbox.
 *
 * Required env vars (set in Vercel → Settings → Environment Variables):
 *   GMAIL_USER          the Gmail/Workspace address that sends (e.g. office@the-remote-admin.com)
 *   GMAIL_APP_PASSWORD  a 16-char Google "App Password" for that account (needs 2FA on)
 *   CONTACT_TO_EMAIL    where inquiries land (defaults to GMAIL_USER, then the site email)
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

  // Best-effort backup of every submission to a Google Sheet (never blocks the response).
  const sheetUrl = process.env.SHEETS_WEBHOOK_URL;
  let backupOk = true;
  if (sheetUrl) {
    try {
      const backupRes = await fetch(sheetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, help: needs.join(", "), message }),
      });
      if (!backupRes.ok) backupOk = false;
    } catch (backupErr) {
      backupOk = false;
      console.error("Sheet backup failed:", backupErr);
    }
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL ?? gmailUser ?? site.business.email;

  // Without credentials we can't deliver — fail clearly (also helps in dev).
  if (!gmailUser || !gmailPass) {
    console.error(
      "GMAIL_USER / GMAIL_APP_PASSWORD not set; cannot send contact email.",
    );
    return NextResponse.json(
      { error: "Email is not configured yet." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

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
    await transporter.sendMail({
      // Gmail sends as the authenticated account; show a friendly name.
      from: `"The Remote Admin Website" <${gmailUser}>`,
      to,
      replyTo: contact.includes("@") ? contact : undefined,
      subject: `New inquiry from ${name}`,
      html,
      text: `New website inquiry\n\nName: ${name}\nContact: ${contact}\nNeeds: ${needsLine}\n\nMessage:\n${message || "(no message)"}`,
    });

    if (!backupOk) {
      try {
        await transporter.sendMail({
          from: `"The Remote Admin Website" <${gmailUser}>`,
          to,
          subject: "Contact form: a submission did NOT save to the backup sheet",
          text: `A submission from ${name} (${contact}) was emailed to you but did NOT save to the Google Sheet backup. Message: ${message || "(no message)"}`,
        });
      } catch (alertErr) {
        console.error("Backup-failure alert email failed:", alertErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route (Gmail) error:", err);
    return NextResponse.json(
      { error: "Could not send your message." },
      { status: 502 },
    );
  }
}

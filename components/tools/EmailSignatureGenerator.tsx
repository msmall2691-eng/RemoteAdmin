"use client";

import { useRef, useState } from "react";
import { Upload, Download, Code } from "lucide-react";
import {
  labelClass,
  inputClass,
  esc,
  safeUrl,
  CopyButton,
  ToolCta,
} from "./ui";

type Props = {
  accent: string;
  setAccent: (hex: string) => void;
};

type Fields = {
  name: string;
  title: string;
  business: string;
  phone: string;
  email: string;
  website: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  tagline: string;
  cta: string;
};

const EMPTY: Fields = {
  name: "",
  title: "",
  business: "",
  phone: "",
  email: "",
  website: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  tagline: "",
  cta: "",
};

function buildHtml(f: Fields, logo: string | null, accent: string): string {
  const a = esc(accent);
  const rows: string[] = [];

  rows.push(
    `<div style="font-size:16px;font-weight:bold;color:${a};">${esc(
      f.name || "Your Name",
    )}</div>`,
  );

  const line2 = [f.title, f.business].filter(Boolean).map(esc).join(" · ");
  if (line2)
    rows.push(`<div style="color:#555555;font-size:13px;">${line2}</div>`);

  const contact: string[] = [];
  if (f.phone)
    contact.push(
      `<a href="tel:${esc(f.phone.replace(/[^\d+]/g, ""))}" style="color:#333333;text-decoration:none;">${esc(
        f.phone,
      )}</a>`,
    );
  if (f.email)
    contact.push(
      `<a href="mailto:${esc(f.email)}" style="color:#333333;text-decoration:none;">${esc(
        f.email,
      )}</a>`,
    );
  if (f.website)
    contact.push(
      `<a href="${esc(safeUrl(f.website))}" style="color:${a};text-decoration:none;">${esc(
        f.website.replace(/^https?:\/\//, ""),
      )}</a>`,
    );
  if (contact.length)
    rows.push(
      `<div style="margin-top:6px;font-size:13px;color:#333333;">${contact.join(
        ' &nbsp;|&nbsp; ',
      )}</div>`,
    );

  const socials: string[] = [];
  if (f.facebook)
    socials.push(
      `<a href="${esc(safeUrl(f.facebook))}" style="color:${a};text-decoration:none;">Facebook</a>`,
    );
  if (f.instagram)
    socials.push(
      `<a href="${esc(safeUrl(f.instagram))}" style="color:${a};text-decoration:none;">Instagram</a>`,
    );
  if (f.linkedin)
    socials.push(
      `<a href="${esc(safeUrl(f.linkedin))}" style="color:${a};text-decoration:none;">LinkedIn</a>`,
    );
  if (socials.length)
    rows.push(
      `<div style="margin-top:6px;font-size:13px;">${socials.join(
        ' &nbsp;·&nbsp; ',
      )}</div>`,
    );

  if (f.tagline)
    rows.push(
      `<div style="margin-top:8px;font-size:12px;font-style:italic;color:#777777;">${esc(
        f.tagline,
      )}</div>`,
    );

  if (f.cta)
    rows.push(
      `<div style="margin-top:10px;"><a href="${esc(
        safeUrl(f.website || f.email ? f.website || `mailto:${f.email}` : "#"),
      )}" style="display:inline-block;background:${a};color:#ffffff;font-size:13px;font-weight:bold;text-decoration:none;padding:8px 16px;border-radius:6px;">${esc(
        f.cta,
      )}</a></div>`,
    );

  const logoCell = logo
    ? `<td style="padding-right:16px;vertical-align:top;"><img src="${esc(
        logo,
      )}" width="68" style="display:block;width:68px;height:auto;border-radius:8px;" alt="${esc(
        f.business || f.name,
      )}"></td>`
    : "";

  return (
    `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;line-height:1.45;">` +
    `<tr>${logoCell}<td style="vertical-align:top;border-left:3px solid ${a};padding-left:16px;">` +
    rows.join("") +
    `</td></tr></table>`
  );
}

function buildPlain(f: Fields): string {
  const lines: string[] = [];
  if (f.name) lines.push(f.name);
  const l2 = [f.title, f.business].filter(Boolean).join(" · ");
  if (l2) lines.push(l2);
  if (f.phone) lines.push(`Phone: ${f.phone}`);
  if (f.email) lines.push(`Email: ${f.email}`);
  if (f.website) lines.push(`Web: ${f.website}`);
  const soc = [
    f.facebook && `Facebook: ${f.facebook}`,
    f.instagram && `Instagram: ${f.instagram}`,
    f.linkedin && `LinkedIn: ${f.linkedin}`,
  ].filter(Boolean);
  if (soc.length) lines.push(soc.join("  "));
  if (f.tagline) lines.push(f.tagline);
  return lines.join("\n");
}

export function EmailSignatureGenerator({ accent, setAccent }: Props) {
  const [f, setF] = useState<Fields>(EMPTY);
  const [logo, setLogo] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  function onLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500_000) {
      alert("Please choose a logo under 500 KB for best email compatibility.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setLogo(String(reader.result));
    reader.readAsDataURL(file);
  }

  const html = buildHtml(f, logo, accent);
  const plain = buildPlain(f);

  function downloadTxt() {
    const blob = new Blob([plain], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-signature.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const field = (
    k: keyof Fields,
    label: string,
    placeholder = "",
    type = "text",
  ) => (
    <div>
      <label className={labelClass} htmlFor={`sig-${k}`}>
        {label}
      </label>
      <input
        id={`sig-${k}`}
        type={type}
        value={f[k]}
        onChange={set(k)}
        placeholder={placeholder}
        className={inputClass}
        autoComplete="off"
      />
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Inputs */}
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {field("name", "Full name", "Karen Felch")}
          {field("title", "Job title", "Owner")}
          {field("business", "Business name", "The Remote Admin")}
          {field("phone", "Phone", "(603) 555-0100", "tel")}
          {field("email", "Email", "you@business.com", "email")}
          {field("website", "Website", "yourbusiness.com")}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {field("facebook", "Facebook URL", "facebook.com/…")}
          {field("instagram", "Instagram URL", "instagram.com/…")}
          {field("linkedin", "LinkedIn URL", "linkedin.com/in/…")}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {field("tagline", "Tagline (optional)", "Making your life easier")}
          {field("cta", "Button text (optional)", "Book a Call")}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className={labelClass}>Logo (optional)</span>
            <div className="mt-1.5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="btn-ghost"
              >
                <Upload className="h-4 w-4" />
                {logo ? "Change logo" : "Upload logo"}
              </button>
              {logo && (
                <button
                  type="button"
                  onClick={() => setLogo(null)}
                  className="text-sm text-muted underline hover:text-ink"
                >
                  Remove
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onLogo}
                className="hidden"
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="sig-accent">
              Accent color
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="sig-accent"
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border border-line bg-oat"
                aria-label="Signature accent color"
              />
              <input
                type="text"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview + actions */}
      <div className="space-y-4">
        <div>
          <span className={labelClass}>Live preview</span>
          <div className="mt-1.5 min-h-[140px] overflow-x-auto rounded-card border border-line bg-white p-5">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <CopyButton
            html={html}
            text={plain}
            label="Copy signature"
            className="btn-ink"
          />
          <CopyButton text={plain} label="Copy plain text" />
          <button type="button" onClick={downloadTxt} className="btn-ghost">
            <Download className="h-4 w-4" />
            Download .txt
          </button>
          <button
            type="button"
            onClick={() => setShowCode((v) => !v)}
            className="btn-ghost"
          >
            <Code className="h-4 w-4" />
            {showCode ? "Hide HTML" : "Show HTML"}
          </button>
        </div>

        {showCode && (
          <textarea
            readOnly
            value={html}
            onFocus={(e) => e.currentTarget.select()}
            className={`${inputClass} h-32 font-mono text-xs`}
          />
        )}

        <details className="rounded-card border border-line bg-mist/30 p-4 text-sm text-ink">
          <summary className="cursor-pointer font-medium">
            How to add this to Gmail or Outlook
          </summary>
          <div className="mt-3 space-y-2 text-muted">
            <p>
              <strong className="text-ink">Gmail:</strong> Click “Copy
              signature,” then go to Settings (gear) → See all settings →
              General → Signature → create or edit a signature → paste (Ctrl/Cmd
              + V) → Save Changes.
            </p>
            <p>
              <strong className="text-ink">Outlook:</strong> File → Options →
              Mail → Signatures → New → paste into the edit box → Save. (In new
              Outlook / web: Settings → Mail → Compose and reply → Signature.)
            </p>
          </div>
        </details>
      </div>

      <div className="lg:col-span-2">
        <ToolCta>
          Need help setting up branded forms, email templates, or customer
          follow-ups? The Remote Admin can help.
        </ToolCta>
      </div>
    </div>
  );
}

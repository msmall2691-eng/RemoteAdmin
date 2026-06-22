"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, type LucideIcon } from "lucide-react";

/** Shared styling + helpers for the free admin tools. */

export const labelClass = "block text-sm font-medium text-ink";
export const groupLabel =
  "text-xs font-semibold uppercase tracking-[0.12em] text-muted";
export const inputClass =
  "mt-1.5 w-full rounded-xl border border-line bg-oat px-4 py-2.5 text-ink placeholder:text-muted/60 focus:border-sage focus:outline-none";

/** Escape text for safe insertion into generated HTML. */
export function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Only allow safe URL schemes; otherwise return "#". Blocks javascript: etc. */
export function safeUrl(raw: string): string {
  const v = raw.trim();
  if (!v) return "#";
  if (/^(https?:|mailto:|tel:)/i.test(v)) return v;
  if (/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(v)) return `https://${v}`;
  return "#";
}

export const ACCENT_PRESETS = [
  { name: "Professional Blue", hex: "#3A6096" },
  { name: "Fresh Green", hex: "#2F6B43" },
  { name: "Calm Teal", hex: "#13808C" },
  { name: "Warm Coral", hex: "#D9603F" },
  { name: "Soft Gold", hex: "#C79A3E" },
];

/** Compact color control: a named-color dropdown + a swatch, with a
 *  "Custom…" option that reveals a color picker only when chosen. */
export function AccentSelect({
  accent,
  setAccent,
  className = "",
}: {
  accent: string;
  setAccent: (hex: string) => void;
  className?: string;
}) {
  const [custom, setCustom] = useState(
    () => !ACCENT_PRESETS.some((p) => p.hex.toLowerCase() === accent.toLowerCase()),
  );

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className="h-6 w-6 shrink-0 rounded-full border border-black/10"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
      />
      <select
        value={custom ? "custom" : accent}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "custom") setCustom(true);
          else {
            setCustom(false);
            setAccent(v);
          }
        }}
        aria-label="Signature color"
        className="rounded-lg border border-line bg-oat px-3 py-2 text-sm text-ink focus:border-sage focus:outline-none"
      >
        {ACCENT_PRESETS.map((p) => (
          <option key={p.hex} value={p.hex}>
            {p.name}
          </option>
        ))}
        <option value="custom">Custom…</option>
      </select>
      {custom && (
        <input
          type="color"
          value={accent}
          onChange={(e) => setAccent(e.target.value)}
          aria-label="Custom accent color"
          className="h-9 w-10 cursor-pointer rounded border border-line bg-oat"
        />
      )}
    </div>
  );
}

async function copyRich(html: string, plain: string): Promise<boolean> {
  try {
    if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([plain], { type: "text/plain" }),
        }),
      ]);
      return true;
    }
  } catch {
    /* fall through to plain copy */
  }
  return copyPlain(plain);
}

async function copyPlain(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function CopyButton({
  text,
  html,
  label = "Copy",
  Icon = Copy,
  className = "btn-ghost",
}: {
  text: string;
  html?: string;
  label?: string;
  Icon?: LucideIcon;
  className?: string;
}) {
  const [done, setDone] = useState(false);

  async function onClick() {
    const ok = html ? await copyRich(html, text) : await copyPlain(text);
    if (ok) {
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    }
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
      {done ? "Copied!" : label}
    </button>
  );
}

/** A consistent "Want help?" call-to-action shown under each tool. */
export function ToolCta({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex flex-col items-start gap-3 rounded-card border border-line bg-mist/40 p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-ink">{children}</p>
      <Link href="/#book" className="btn-brass shrink-0">
        Book a free call
      </Link>
    </div>
  );
}

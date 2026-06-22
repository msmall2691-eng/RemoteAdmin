"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowDown } from "lucide-react";
import { AccentSelect, CopyButton, esc, inputClass } from "./tools/ui";

/**
 * Tiny, genuinely-usable email-signature widget for the top of the page —
 * a few fields, a live preview, and copy. No big section, no instructions;
 * links down to the full toolkit for the rest.
 */

function buildSig(
  name: string,
  title: string,
  company: string,
  email: string,
  accent: string,
) {
  const a = esc(accent);
  const line2 = [title, company].filter(Boolean).map(esc).join(" · ");
  const rows = [
    `<div style="font-weight:bold;color:${a};font-size:14px;">${esc(name || "Your Name")}</div>`,
    line2 ? `<div style="color:#555555;font-size:12px;">${line2}</div>` : "",
    email
      ? `<div style="font-size:12px;margin-top:2px;"><a href="mailto:${esc(
          email,
        )}" style="color:${a};text-decoration:none;">${esc(email)}</a></div>`
      : "",
  ].join("");
  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;line-height:1.4;"><tr><td style="border-left:3px solid ${a};padding-left:10px;">${rows}</td></tr></table>`;
}

export function MiniTool() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [accent, setAccent] = useState("#3A6096");

  const html = buildSig(name, title, company, email, accent);
  const plain = [name, [title, company].filter(Boolean).join(" · "), email]
    .filter(Boolean)
    .join("\n");

  const field = (
    value: string,
    onChange: (v: string) => void,
    placeholder: string,
    type = "text",
  ) => (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      autoComplete="off"
      className={`${inputClass} mt-0 py-2 text-sm`}
    />
  );

  return (
    <section className="container-page py-8 sm:py-10">
      <div className="mx-auto max-w-3xl rounded-card border border-line bg-card/80 p-4 shadow-sm backdrop-blur-sm sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Free tool · email signature
          </p>
          <Link
            href="#tools"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-sage-deep transition-colors hover:text-ink"
          >
            More tools
            <ArrowDown className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-3 grid gap-4 sm:grid-cols-2 sm:items-center">
          <div>
            <div className="grid grid-cols-2 gap-2">
              {field(name, setName, "Name")}
              {field(title, setTitle, "Title")}
              {field(company, setCompany, "Company")}
              {field(email, setEmail, "Email", "email")}
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <span className="text-xs font-medium text-muted">Color</span>
              <AccentSelect accent={accent} setAccent={setAccent} />
            </div>
          </div>

          <div>
            <div className="overflow-x-auto rounded-xl border border-line bg-white p-3">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <CopyButton
                html={html}
                text={plain}
                label="Copy signature"
                className="btn-ink !px-4 !py-2 text-xs"
              />
              <Link href="#tools" className="btn-ghost !px-4 !py-2 text-xs">
                Full version
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

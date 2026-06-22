"use client";

import { useState } from "react";
import { Mail, Palette, BellRing } from "lucide-react";
import { EmailSignatureGenerator } from "./EmailSignatureGenerator";
import { BrandAccentPicker } from "./BrandAccentPicker";
import { LatePaymentReminder } from "./LatePaymentReminder";

const MENU = [
  { id: "signature", label: "Email Signature", Icon: Mail },
  { id: "accent", label: "Brand Accent Picker", Icon: Palette },
  { id: "reminder", label: "Late Payment Reminder", Icon: BellRing },
];

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 font-display text-2xl font-semibold tracking-tightish text-ink sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-muted">{description}</p>
      <div className="mt-7 rounded-card border border-line bg-card p-6 sm:p-8">
        {children}
      </div>
    </section>
  );
}

export function ToolsHub() {
  // Shared accent color — the Brand Accent Picker and Email Signature use the same value.
  const [accent, setAccent] = useState("#3A6096");

  return (
    <div>
      {/* Quick jump menu */}
      <nav
        aria-label="Tools"
        className="sticky top-16 z-30 -mx-5 mb-10 border-y border-line bg-oat/90 px-5 py-3 backdrop-blur sm:top-20"
      >
        <ul className="flex flex-wrap gap-2">
          {MENU.map(({ id, label, Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-flex items-center gap-2 rounded-pill border border-line bg-card px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-sage hover:bg-mist/40"
              >
                <Icon className="h-4 w-4 text-sage-deep" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-16">
        <Section
          id="signature"
          eyebrow="Tool 01"
          title="Email Signature Generator"
          description="Build a polished email signature and paste it straight into Gmail or Outlook. Fill in your details and watch the preview update live."
        >
          <EmailSignatureGenerator accent={accent} setAccent={setAccent} />
        </Section>

        <Section
          id="accent"
          eyebrow="Tool 02"
          title="Brand Accent Picker"
          description="Choose one accent color to use across your invoices, forms, and emails. Pick a mood or set a custom color — it carries into the signature tool too."
        >
          <BrandAccentPicker accent={accent} setAccent={setAccent} />
        </Section>

        <Section
          id="reminder"
          eyebrow="Tool 03"
          title="Late Payment Reminder Generator"
          description="Create a polite but firm payment reminder in seconds. Choose a tone, then copy the email or a short text-message version."
        >
          <LatePaymentReminder />
        </Section>
      </div>
    </div>
  );
}

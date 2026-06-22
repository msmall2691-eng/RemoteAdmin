"use client";

import { useState } from "react";
import { labelClass, inputClass, CopyButton, ToolCta } from "./ui";

type Tone = "friendly" | "professional" | "firm" | "final";

const TONES: { id: Tone; label: string }[] = [
  { id: "friendly", label: "Friendly" },
  { id: "professional", label: "Professional" },
  { id: "firm", label: "Firm" },
  { id: "final", label: "Final Notice" },
];

type Fields = {
  client: string;
  business: string;
  invoice: string;
  amount: string;
  due: string;
  link: string;
};

const EMPTY: Fields = {
  client: "",
  business: "",
  invoice: "",
  amount: "",
  due: "",
  link: "",
};

function build(f: Fields, tone: Tone) {
  const client = f.client || "[Client Name]";
  const business = f.business || "[Your Business]";
  const inv = f.invoice || "[Invoice #]";
  const amount = f.amount || "[Amount Due]";
  const due = f.due || "[Due Date]";
  const payLine = f.link ? `\n\nYou can pay here: ${f.link}` : "";
  const payShort = f.link ? `Pay: ${f.link} ` : "";

  let subject = "";
  let body = "";
  let sms = "";

  switch (tone) {
    case "friendly":
      subject = `Friendly reminder — invoice #${inv}`;
      body = `Hi ${client},\n\nJust a friendly reminder that invoice #${inv} for ${amount} was due on ${due}. When you have a moment, please send payment or let us know if you have any questions.${payLine}\n\nThank you!\n${business}`;
      sms = `Hi ${client}, friendly reminder: invoice #${inv} (${amount}) was due ${due}. ${payShort}Thanks! — ${business}`;
      break;
    case "professional":
      subject = `Payment reminder — invoice #${inv}`;
      body = `Hello ${client},\n\nOur records show that invoice #${inv} in the amount of ${amount} was due on ${due}. Please submit payment at your earliest convenience.${payLine}\n\nThank you,\n${business}`;
      sms = `Hello ${client}, invoice #${inv} for ${amount} was due ${due}. Please submit payment when you can. ${payShort}— ${business}`;
      break;
    case "firm":
      subject = `Overdue: invoice #${inv} requires attention`;
      body = `Hello ${client},\n\nInvoice #${inv} for ${amount} remains unpaid as of today (originally due ${due}). Please submit payment promptly to avoid further follow-up.${payLine}\n\nRegards,\n${business}`;
      sms = `${client}, invoice #${inv} (${amount}) is overdue. Please submit payment promptly. ${payShort}— ${business}`;
      break;
    case "final":
      subject = `FINAL NOTICE — invoice #${inv} past due`;
      body = `Hello ${client},\n\nThis is a final reminder that invoice #${inv} for ${amount} is overdue (due ${due}). Please remit payment immediately or contact us to resolve this balance.${payLine}\n\n${business}`;
      sms = `Final notice: invoice #${inv} (${amount}) is overdue. Please pay now or contact us. ${payShort}— ${business}`;
      break;
  }

  return { subject, body, sms };
}

export function LatePaymentReminder() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [tone, setTone] = useState<Tone>("friendly");

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  const { subject, body, sms } = build(f, tone);
  const fullEmail = `Subject: ${subject}\n\n${body}`;

  const field = (
    k: keyof Fields,
    label: string,
    placeholder = "",
    type = "text",
  ) => (
    <div>
      <label className={labelClass} htmlFor={`pay-${k}`}>
        {label}
      </label>
      <input
        id={`pay-${k}`}
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
          {field("client", "Client name", "Jordan Smith")}
          {field("business", "Your business name", "The Remote Admin")}
          {field("invoice", "Invoice number", "1042")}
          {field("amount", "Amount due", "$1,250.00")}
          {field("due", "Original due date", "June 1, 2026")}
          {field("link", "Payment link (optional)", "pay.yourbiz.com/1042")}
        </div>

        <div>
          <span className={labelClass}>Tone</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTone(t.id)}
                aria-pressed={tone === t.id}
                className={`rounded-pill border px-4 py-2 text-sm font-medium transition-colors ${
                  tone === t.id
                    ? "border-sage bg-mist text-ink"
                    : "border-line bg-oat text-ink hover:border-sage"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Outputs */}
      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <span className={labelClass}>Email</span>
            <CopyButton
              text={fullEmail}
              label="Copy email"
              className="btn-ghost !px-4 !py-2 text-xs"
            />
          </div>
          <div className="mt-1.5 rounded-card border border-line bg-white p-4">
            <p className="text-sm font-semibold text-ink">{subject}</p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
              {body}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className={labelClass}>Text message (SMS)</span>
            <CopyButton
              text={sms}
              label="Copy text"
              className="btn-ghost !px-4 !py-2 text-xs"
            />
          </div>
          <div className="mt-1.5 rounded-card border border-line bg-white p-4">
            <p className="whitespace-pre-wrap text-sm text-gray-700">{sms}</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <ToolCta>
          Tired of chasing unpaid invoices? The Remote Admin can help with
          invoicing, collections, and customer follow-up.
        </ToolCta>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { site } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const { contact } = site.getStarted;
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      contact: String(data.get("contact") ?? ""),
      message: String(data.get("message") ?? ""),
      needs: data.getAll("needs").map(String),
      // Honeypot — real users leave this empty.
      company: String(data.get("company") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-sage" />
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">
          {contact.successTitle}
        </h3>
        <p className="mt-2 text-muted">{contact.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-7 sm:p-8" noValidate>
      <h3 className="font-display text-xl font-semibold text-ink">
        {contact.heading}
      </h3>
      <p className="mt-1 text-sm text-muted">{contact.body}</p>

      {/* Honeypot field — visually hidden, ignored by humans */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-ink"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-line bg-oat px-4 py-2.5 text-ink placeholder:text-muted/60 focus:border-sage"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-ink"
          >
            Email or phone
          </label>
          <input
            id="contact"
            name="contact"
            type="text"
            required
            className="mt-1.5 w-full rounded-xl border border-line bg-oat px-4 py-2.5 text-ink placeholder:text-muted/60 focus:border-sage"
            placeholder="How should I reach you?"
          />
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-ink">
            What do you need help with?
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {contact.needOptions.map((option) => (
              <label
                key={option}
                className="inline-flex cursor-pointer items-center gap-2 rounded-pill border border-line bg-oat px-3.5 py-2 text-sm text-ink transition-colors has-[:checked]:border-sage has-[:checked]:bg-mist"
              >
                <input
                  type="checkbox"
                  name="needs"
                  value={option}
                  className="h-4 w-4 accent-sage"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-ink"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1.5 w-full rounded-xl border border-line bg-oat px-4 py-2.5 text-ink placeholder:text-muted/60 focus:border-sage"
            placeholder="Tell me a little about what's going on…"
          />
        </div>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2.5 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-ink"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" />
          <span>
            <strong className="font-semibold">{contact.errorTitle}</strong>{" "}
            {contact.errorBody}
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-ink mt-6 w-full disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}

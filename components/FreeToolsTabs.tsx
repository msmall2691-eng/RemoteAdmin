"use client";

import { useState } from "react";
import { Mail, BellRing } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EmailSignatureGenerator } from "./tools/EmailSignatureGenerator";
import { LatePaymentReminder } from "./tools/LatePaymentReminder";

const TABS = [
  {
    id: "signature",
    label: "Email signature",
    Icon: Mail,
    blurb:
      "Your details → a styled signature, ready to paste into Gmail or Outlook.",
  },
  {
    id: "reminder",
    label: "Payment reminder",
    Icon: BellRing,
    blurb:
      "Turn an overdue invoice into a polite, ready-to-send nudge — email or text.",
  },
] as const;

export function FreeToolsTabs() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("signature");
  const reduce = useReducedMotion();
  const current = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-ink text-oat shadow-sm"
                  : "border border-line bg-card text-ink hover:border-sage hover:bg-mist/40"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center font-mono text-xs text-muted">
        {current.blurb}
      </p>

      {/* Active tool */}
      <div className="mt-6 overflow-hidden rounded-card border border-line bg-card p-6 shadow-sm sm:p-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
          >
            {active === "signature" ? (
              <EmailSignatureGenerator />
            ) : (
              <LatePaymentReminder />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

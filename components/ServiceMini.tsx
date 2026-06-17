"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { icons, type IconName } from "@/content/site";

/**
 * Compact, on-brand animated visual for a service card. On scroll-in, the
 * service icon settles and two short "done" rows tick in, then a gold progress
 * bar fills — a small "handled" moment for every service, not just Office
 * Rescue. Honors prefers-reduced-motion (renders the finished state, no motion).
 */
export function ServiceMini({
  iconName,
  items,
}: {
  iconName: IconName;
  items: readonly string[];
}) {
  const reduce = useReducedMotion();
  const Icon = icons[iconName];

  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-mist/40 p-4">
      <div className="flex items-center justify-between">
        <motion.span
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-card text-sage-deep shadow-sm"
          initial={reduce ? false : { scale: 0.7, rotate: -8, opacity: 0 }}
          whileInView={reduce ? undefined : { scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        >
          <Icon className="h-5 w-5" />
        </motion.span>
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-sage-deep">
          Handled
        </span>
      </div>

      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={item}
            className="flex items-center gap-2 text-xs font-medium text-ink"
            initial={reduce ? false : { opacity: 0, x: -8 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.18, duration: 0.4 }}
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold/25 text-sage-deep">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {item}
          </motion.li>
        ))}
      </ul>

      <motion.div
        className="mt-3 h-1 origin-left rounded-full bg-gold"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}

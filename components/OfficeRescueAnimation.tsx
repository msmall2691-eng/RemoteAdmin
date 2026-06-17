"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FileText, Receipt, Mail, Check } from "lucide-react";

/**
 * Signature visual: messy invoice / receipt / inbox cards settle into a tidy
 * "This week — handled" stack, with a brass "Paid" badge.
 *
 * The chaotic → settled transition runs once when scrolled into view, and is
 * skipped entirely under prefers-reduced-motion (we render the settled state).
 */
const messy = [
  { icon: FileText, label: "Paperwork", x: -16, y: -10, r: -11 },
  { icon: Receipt, label: "Receipts", x: 18, y: -4, r: 8 },
  { icon: Mail, label: "Follow-ups", x: -8, y: 12, r: 5 },
];

export function OfficeRescueAnimation() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setSettled(true);
      return;
    }

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // brief beat in the "chaos" state before everything settles
          const t = setTimeout(() => setSettled(true), 650);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-md select-none"
      aria-hidden="true"
    >
      {/* The settled "handled" stack */}
      <div
        className={`absolute inset-x-6 bottom-6 rounded-card border border-line bg-card p-5 shadow-sm transition-all duration-700 ease-out ${
          settled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow">This week</p>
            <p className="mt-1 font-display text-xl font-semibold text-ink">
              Handled.
            </p>
          </div>
          <Image
            src="/tra-logo.png"
            alt=""
            width={445}
            height={446}
            className="h-9 w-auto opacity-90"
          />
        </div>
        <ul className="mt-4 space-y-2.5">
          {["Backlog cleared", "Files organized", "Follow-ups done"].map(
            (line, i) => (
              <li
                key={line}
                className={`flex items-center gap-2.5 text-sm text-ink transition-all duration-500 ${
                  settled
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2"
                }`}
                style={{ transitionDelay: settled ? `${250 + i * 110}ms` : "0ms" }}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sage/15 text-sage-deep">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {line}
              </li>
            ),
          )}
        </ul>
      </div>

      {/* The scattered cards settle into a tidy stack near the top */}
      {messy.map((m, i) => {
        const Icon = m.icon;
        return (
          <div
            key={m.label}
            className="absolute left-1/2 top-1/2 flex w-44 items-center gap-2 rounded-2xl border border-line bg-card px-3.5 py-3 shadow-sm transition-all duration-700 ease-out"
            style={{
              transform: settled
                ? `translate(-50%, -50%) translate(0px, ${-128 + i * 52}px) rotate(0deg)`
                : `translate(-50%, -50%) translate(${m.x * 4}px, ${m.y * 4}px) rotate(${m.r}deg)`,
              opacity: 1,
              transitionDelay: settled ? `${i * 90}ms` : "0ms",
            }}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage-deep">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="truncate text-sm font-medium text-ink">
              {m.label}
            </span>
          </div>
        );
      })}

      {/* Brass "Paid" badge pops in once settled */}
      <div
        className={`absolute right-2 top-4 flex items-center gap-1.5 rounded-pill bg-gold px-3.5 py-2 text-sm font-semibold text-[#20302d] shadow-md transition-all duration-500 ${
          settled ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
        style={{ transitionDelay: settled ? "700ms" : "0ms" }}
      >
        <Check className="h-4 w-4" strokeWidth={3} />
        Caught up!
      </div>
    </div>
  );
}

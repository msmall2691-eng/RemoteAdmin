"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Calm, simple interactive hero backdrop: a couple of slow-drifting brand
 * glows plus one soft glow that gently trails the cursor. Decorative only
 * (aria-hidden) and fully static under prefers-reduced-motion.
 */
export function HeroBackdrop() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  // Default resting spot: upper-right, near the logo.
  const [pos, setPos] = useState({ x: 72, y: 38 });

  useEffect(() => {
    if (reduce) return;
    const section = rootRef.current?.parentElement;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      setPos({ x, y });
    };
    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, [reduce]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Gentle aurora shimmer across the top — adds movement on mobile too */}
      <div
        className="animate-aurora absolute inset-x-0 top-0 h-72"
        style={{
          background:
            "linear-gradient(100deg, transparent 10%, rgb(var(--sage) / 0.12) 40%, rgb(var(--brass) / 0.10) 60%, transparent 90%)",
          backgroundSize: "220% 100%",
        }}
      />

      {/* Slow ambient drift */}
      <div className="animate-drift absolute -left-24 top-0 h-72 w-72 rounded-full bg-mist-2/40 blur-3xl" />
      <div
        className="animate-drift absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-sage/15 blur-3xl"
        style={{ animationDelay: "-9s" }}
      />
      <div
        className="animate-float absolute left-1/3 top-1/4 h-56 w-56 rounded-full bg-brass/10 blur-3xl"
        style={{ animationDelay: "-3s" }}
      />

      {/* Soft glow that gently follows the cursor */}
      <div
        className="absolute h-[30rem] w-[30rem] rounded-full blur-3xl transition-[left,top] duration-700 ease-out"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgb(var(--brass) / 0.12) 0%, rgb(var(--mist-2) / 0.10) 45%, transparent 72%)",
        }}
      />
    </div>
  );
}

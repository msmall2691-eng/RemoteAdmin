"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Scroll-reveal wrapper powered by Framer Motion (whileInView fade + slide-up).
 * Honors prefers-reduced-motion (renders static, no animation).
 * `as` picks the rendered element (div, li, article, ul…); `delay` is in ms.
 */
export function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  as?: keyof typeof motion;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = (motion[as] ?? motion.div) as React.ElementType;

  const variants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: delay / 1000 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

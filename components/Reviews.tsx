"use client";

import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function Reviews() {
  const { reviews } = site;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = reviews.items.length;

  const go = (dir: number) => setActive((a) => (a + dir + count) % count);

  // Gently auto-advance; pause on hover/focus and under reduced-motion.
  useEffect(() => {
    if (paused || count <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => setActive((a) => (a + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <section id="reviews">
      <div className="container-page py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{reviews.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
            {reviews.heading}
          </h2>
        </Reveal>

        {/* Carousel */}
        <Reveal className="mx-auto mt-12 max-w-2xl">
          <div
            className="card relative p-8 sm:p-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <Quote className="h-8 w-8 text-brass/50" aria-hidden="true" />
            <div
              className="mt-4 min-h-[7rem]"
              aria-live="polite"
              aria-atomic="true"
            >
              <blockquote className="font-display text-xl italic leading-snug text-ink sm:text-2xl">
                {reviews.items[active].quote}
              </blockquote>
              <div className="mt-5 flex items-center gap-2">
                <div className="flex" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold text-gold"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-ink">
                  {reviews.items[active].name}
                </span>
                <span className="text-sm text-muted">
                  · {reviews.items[active].attribution}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                {reviews.items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to review ${i + 1}`}
                    aria-current={i === active}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === active ? "w-6 bg-sage" : "w-2 bg-line"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous review"
                  onClick={() => go(-1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-sage hover:bg-mist/50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next review"
                  onClick={() => go(1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-sage hover:bg-mist/50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Client spotlight */}
        <Reveal className="mx-auto mt-6 max-w-2xl" delay={80}>
          <div className="rounded-card border border-brass/40 bg-mist/50 p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass-deep">
              {reviews.spotlight.attribution}
            </p>
            <blockquote className="mt-3 font-display text-lg italic leading-snug text-ink sm:text-xl">
              &ldquo;{reviews.spotlight.quote}&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-ink">
              {reviews.spotlight.name}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

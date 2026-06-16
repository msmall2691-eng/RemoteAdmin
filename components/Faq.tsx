"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function Faq() {
  const { faq } = site;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="texture-paper">
      <div className="container-page py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
            {faq.heading}
          </h2>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-2xl">
          <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-card">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <h3>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span className="font-display text-lg font-semibold text-ink">
                        {item.q}
                      </span>
                      <Plus
                        className={`h-5 w-5 shrink-0 text-sage-deep transition-transform duration-200 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    className={`grid transition-all duration-200 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-muted">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Compact mid-page call to action — keeps "Book a call" within reach while
 * scrolling, without a full section break.
 */
export function CtaStrip() {
  const { cta } = site;
  return (
    <section className="bg-mist/70">
      <div className="container-page py-10">
        <Reveal className="flex flex-col items-center justify-between gap-5 rounded-card border border-line bg-card px-7 py-7 text-center shadow-sm sm:flex-row sm:text-left">
          <div>
            <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
              {cta.heading}
            </p>
            <p className="mt-1 text-sm text-muted">{cta.body}</p>
          </div>
          <Link href="#book" className="btn-brass shrink-0">
            <CalendarDays className="h-4 w-4" />
            {cta.button}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

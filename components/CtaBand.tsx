import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Light, reusable "book a call" band for the bottom of each page.
 */
export function CtaBand() {
  const { business } = site;
  return (
    <section className="bg-mist/60">
      <div className="container-page py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
            Ready to get organized?
          </h2>
          <p className="mt-3 text-muted">
            Book a free, no-pressure discovery call and let&rsquo;s find the
            right next step for your business.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn-brass">
              <CalendarDays className="h-4 w-4" />
              Book a call
            </Link>
            <a href={business.phoneHref} className="btn-ghost">
              <Phone className="h-4 w-4" />
              {business.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

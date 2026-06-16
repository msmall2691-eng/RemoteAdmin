import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { site, icons } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Compact services overview for the home page — points to the full /services page.
 */
export function ServicesTeaser() {
  const { services } = site;
  return (
    <section className="texture-paper">
      <div className="container-page py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What we do</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
            {services.heading}
          </h2>
        </Reveal>

        {/* Signature offer highlight */}
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-card border border-brass/40 bg-card p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brass/15 text-brass-deep">
                <Sparkles className="h-6 w-6" />
              </span>
              <span className="rounded-pill bg-brass px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink">
                {services.featured.badge}
              </span>
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
              {services.featured.name}
            </h3>
            <p className="mt-3 text-muted">{services.featured.summary}</p>
          </div>
        </Reveal>

        {/* Three buckets, compact */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {services.buckets.map((bucket, i) => {
            const Icon = icons[bucket.icon];
            return (
              <Reveal as="article" key={bucket.name} delay={i * 80}>
                <div className="card hover-lift h-full p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-sage-deep">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                    {bucket.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{bucket.summary}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <Link href="/services" className="btn-ink">
            See everything we do
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

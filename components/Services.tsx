import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { site, icons } from "@/content/site";
import { Reveal } from "./Reveal";
import { OfficeRescueAnimation } from "./OfficeRescueAnimation";
import { ServiceMini } from "./ServiceMini";

export function Services() {
  const { services } = site;
  const FeaturedIcon = icons[services.featured.icon];

  return (
    <section id="services" className="relative overflow-hidden texture-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 -z-10 opacity-[0.05]"
      >
        <Image
          src="/tra-logo.png"
          alt=""
          width={445}
          height={446}
          className="h-[32rem] w-auto"
        />
      </div>
      <div className="container-page py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{services.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
            {services.heading}
          </h2>
          <p className="mt-3 font-display text-lg italic text-sage-deep">
            {services.intro}
          </p>
        </Reveal>

        {/* What I'm great at — quick niche overview */}
        <Reveal className="mx-auto mt-7 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {services.strengths.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-card px-3.5 py-1.5 text-sm font-medium text-ink"
            >
              <Check className="h-3.5 w-3.5 text-sage-deep" strokeWidth={3} />
              {s}
            </span>
          ))}
        </Reveal>

        {/* Featured — Office Rescue (signature) */}
        <Reveal className="mt-12">
          <div className="card overflow-hidden border-brass/40">
            <div className="grid gap-0 md:grid-cols-[1fr_0.85fr]">
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brass/15 text-brass-deep">
                    <FeaturedIcon className="h-6 w-6" />
                  </span>
                  <span className="rounded-pill bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#20302d]">
                    {services.featured.badge}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {services.featured.name}
                </h3>
                <p className="mt-1 font-display text-lg italic text-sage-deep">
                  {services.featured.subtitle}
                </p>
                <p className="mt-3 text-muted">{services.featured.summary}</p>
                <p className="mt-6 eyebrow">What&rsquo;s included</p>
                <ul className="mt-4 space-y-3">
                  {services.featured.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage-deep">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-[0.95rem] text-ink">{point}</span>
                    </li>
                  ))}
                </ul>
                <Link href={services.featured.cta.href} className="btn-brass mt-7">
                  {services.featured.cta.label}
                </Link>
              </div>
              <div className="flex items-center justify-center border-t border-line bg-mist/40 p-6 sm:p-10 md:border-l md:border-t-0">
                <OfficeRescueAnimation />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Three official buckets */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.buckets.map((bucket, i) => {
            return (
              <Reveal as="article" key={bucket.name} delay={i * 80}>
                <div className="card hover-lift h-full p-7">
                  <ServiceMini iconName={bucket.icon} items={bucket.mini} />
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                    {bucket.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{bucket.summary}</p>
                  <ul className="mt-5 space-y-2.5">
                    {bucket.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-ink"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-sage"
                          strokeWidth={2.5}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 text-center">
          <p className="font-display text-2xl italic text-sage-deep sm:text-3xl">
            {services.tagline}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

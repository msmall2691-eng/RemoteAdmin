import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";

export function Hero() {
  const { hero } = site;
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient "aurora" — slow drifting brand glows across the whole hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift absolute -left-24 top-0 h-72 w-72 rounded-full bg-sage/20 blur-3xl" />
        <div
          className="animate-drift absolute left-1/3 -bottom-28 h-80 w-80 rounded-full bg-mist-2/50 blur-3xl"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="animate-drift absolute -right-16 top-1/4 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
          style={{ animationDelay: "-13s" }}
        />
      </div>
      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="max-w-xl">
          <p className="hero-in eyebrow" style={{ animationDelay: "60ms" }}>
            {hero.eyebrow}
          </p>
          <h1
            className="hero-in mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tightish text-ink sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "140ms" }}
          >
            {hero.headline}
          </h1>
          <span
            className="hero-in mt-5 block h-1 w-16 rounded-full bg-gold"
            style={{ animationDelay: "220ms" }}
          />
          <p
            className="hero-in mt-5 font-display text-xl italic text-muted sm:text-2xl"
            style={{ animationDelay: "300ms" }}
          >
            {hero.subcopy}
          </p>

          <div
            className="hero-in mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "380ms" }}
          >
            <Link href={hero.primaryCta.href} className="btn-brass">
              {hero.primaryCta.label}
            </Link>
            <Link href={hero.secondaryCta.href} className="btn-ghost">
              {hero.secondaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul
            className="hero-in mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-muted"
            style={{ animationDelay: "460ms" }}
          >
            {hero.trustLine.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center justify-center py-10">
          {/* Soft "breathing" glow halo grounds the logo */}
          <div
            aria-hidden="true"
            className="animate-pulse-glow absolute -z-10 h-[22rem] w-[22rem] rounded-full blur-2xl sm:h-[26rem] sm:w-[26rem] lg:h-[30rem] lg:w-[30rem]"
            style={{
              background:
                "radial-gradient(circle, rgb(var(--mist-2) / 0.95) 0%, rgb(var(--sage) / 0.18) 45%, transparent 72%)",
            }}
          />
          {/* Gold + sage accent glows drift gently */}
          <div
            aria-hidden="true"
            className="animate-drift absolute right-6 top-8 -z-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl"
            style={{ animationDelay: "-4s" }}
          />
          <div
            aria-hidden="true"
            className="animate-drift absolute bottom-8 left-6 -z-10 h-44 w-44 rounded-full bg-sage/20 blur-3xl"
          />

          {/* Small floating brand accents add quiet life */}
          <span
            aria-hidden="true"
            className="animate-float absolute left-10 top-14 h-3 w-3 rounded-full bg-gold/70 shadow-sm"
          />
          <span
            aria-hidden="true"
            className="animate-float absolute right-10 top-24 h-2.5 w-2.5 rounded-full bg-sage/70 shadow-sm"
            style={{ animationDelay: "-2.5s" }}
          />
          <span
            aria-hidden="true"
            className="animate-float absolute bottom-16 left-24 h-2 w-2 rounded-full bg-brass/70 shadow-sm"
            style={{ animationDelay: "-4.5s" }}
          />

          <div className="hero-in" style={{ animationDelay: "240ms" }}>
            <div className="animate-float">
              <Image
                src="/tra-logo.png"
                alt={`${site.business.name} logo`}
                width={445}
                height={446}
                priority
                className="mx-auto h-auto w-full max-w-lg drop-shadow-md sm:max-w-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

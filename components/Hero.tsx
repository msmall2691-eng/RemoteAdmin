import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";

export function Hero() {
  const { hero } = site;
  return (
    <section id="top" className="relative overflow-hidden">
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

        <div className="relative flex items-center justify-center py-6">
          {/* Soft drifting color blobs add quiet, modern movement */}
          <div className="animate-drift absolute left-0 top-2 -z-10 h-56 w-56 rounded-full bg-sage/25 blur-3xl" />
          <div
            className="animate-drift absolute bottom-2 right-0 -z-10 h-60 w-60 rounded-full bg-gold/25 blur-3xl"
            style={{ animationDelay: "-9s" }}
          />
          {/* Slow-rotating brand ring echoes the logo's circle */}
          <div
            aria-hidden="true"
            className="animate-spin-slow absolute -z-10 h-[22rem] w-[22rem] rounded-full border-2 border-dashed border-sage/25 sm:h-[26rem] sm:w-[26rem] lg:h-[30rem] lg:w-[30rem]"
          />
          <div className="hero-in" style={{ animationDelay: "240ms" }}>
            <div className="animate-float">
              <Image
                src="/tra-logo.png"
                alt={`${site.business.name} logo`}
                width={445}
                height={446}
                priority
                className="mx-auto h-auto w-full max-w-md drop-shadow-md sm:max-w-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

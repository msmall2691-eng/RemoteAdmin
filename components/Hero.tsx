import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";

export function Hero() {
  const { hero } = site;
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="max-w-xl">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tightish text-ink sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-5 font-display text-xl italic text-muted sm:text-2xl">
            {hero.subcopy}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={hero.primaryCta.href} className="btn-brass">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="btn-ghost">
              {hero.secondaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-muted">
            {hero.trustLine.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          {/* Soft drifting color blobs add quiet, modern movement */}
          <div className="animate-drift absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-full bg-sage/25 blur-2xl" />
          <div
            className="animate-drift absolute -bottom-8 -right-4 -z-10 h-44 w-44 rounded-full bg-brass/25 blur-2xl"
            style={{ animationDelay: "-9s" }}
          />
          <div className="overflow-hidden rounded-[28px] border border-line bg-card shadow-sm">
            <Image
              src="/karen-2.jpg"
              alt="Illustration of Karen at her desk working for The Remote Admin"
              width={1024}
              height={1014}
              priority
              sizes="(max-width: 1024px) 90vw, 520px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

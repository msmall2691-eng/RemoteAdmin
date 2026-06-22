import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/content/site";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroLiveCard } from "./HeroLiveCard";

const floatingTasks = [
  { label: "Books up to date", pos: "left-0 top-6", delay: "-1s" },
  { label: "Reconciled", pos: "right-0 top-16", delay: "-3.5s" },
  { label: "Records organized", pos: "bottom-14 left-1", delay: "-5s" },
  { label: "Follow-ups done", pos: "bottom-24 right-1", delay: "-2.2s" },
];

export function Hero() {
  const { hero } = site;
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-mist/20 to-transparent"
    >
      {/* Calm, simple interactive backdrop — glow gently follows the cursor */}
      <HeroBackdrop />
      <div className="container-page grid items-center gap-6 py-10 sm:gap-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
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

          <div
            className="hero-in mt-8 max-w-sm"
            style={{ animationDelay: "460ms" }}
          >
            <HeroLiveCard />
          </div>
        </div>

        <div className="relative flex items-center justify-center py-2 sm:py-10">
          {/* Soft "breathing" glow halo grounds the logo */}
          <div
            aria-hidden="true"
            className="animate-pulse-glow absolute -z-10 h-[16rem] w-[16rem] rounded-full blur-2xl sm:h-[26rem] sm:w-[26rem] lg:h-[30rem] lg:w-[30rem]"
            style={{
              background:
                "radial-gradient(circle, rgb(var(--mist-2) / 0.95) 0%, rgb(var(--sage) / 0.18) 45%, transparent 72%)",
            }}
          />
          {/* Faint floating "task handled" chips — quiet, on-brand motion.
              Hidden on small screens to keep the mobile hero uncluttered. */}
          {floatingTasks.map((task) => (
            <span
              key={task.label}
              aria-hidden="true"
              className={`animate-chip absolute ${task.pos} hidden items-center gap-1.5 rounded-pill border border-line bg-card/80 px-2.5 py-1 text-[0.7rem] font-medium text-sage-deep shadow-sm backdrop-blur-sm sm:flex`}
              style={{ animationDelay: task.delay }}
            >
              <Check className="h-3 w-3 text-gold" strokeWidth={3} />
              {task.label}
            </span>
          ))}

          {/* The logo as the centerpiece — modest on mobile, large on desktop */}
          <div className="hero-in" style={{ animationDelay: "240ms" }}>
            <div className="animate-float">
              <Image
                src="/tra-logo.png"
                alt={`${site.business.name} logo`}
                width={445}
                height={446}
                priority
                className="mx-auto h-auto w-full max-w-[15rem] drop-shadow-md sm:max-w-md lg:max-w-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

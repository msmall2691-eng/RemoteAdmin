import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { Calendly } from "./Calendly";
import { ContactForm } from "./ContactForm";

export function GetStarted() {
  const { getStarted } = site;
  return (
    <section
      id="book"
      className="relative scroll-mt-20 overflow-hidden bg-mist/50"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-16 -z-10 opacity-[0.06]"
      >
        <Image
          src="/tra-logo.png"
          alt=""
          width={445}
          height={446}
          className="h-[26rem] w-auto"
        />
      </div>
      <div className="container-page py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{getStarted.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tightish text-ink sm:text-5xl">
            {getStarted.heading}
          </h2>
          <span className="mx-auto mt-5 block h-1 w-16 rounded-full bg-gold" />
          <p className="mt-5 text-muted">{getStarted.body}</p>
        </Reveal>

        {/* A warm, on-brand welcome right before the booking ask */}
        <Reveal className="mx-auto mt-10 max-w-3xl" delay={60}>
          <div className="grid items-center gap-6 rounded-card border border-line bg-mist/40 p-5 sm:grid-cols-[200px_1fr] sm:p-6">
            <div className="mx-auto w-40 overflow-hidden rounded-[18px] border border-line bg-card sm:w-full">
              <Image
                src="/karen-2.jpg"
                alt="The Remote Admin, illustration of a friendly admin at her desk"
                width={1024}
                height={1014}
                sizes="(max-width: 640px) 160px, 200px"
                className="h-auto w-full"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[0.95rem] text-ink">{getStarted.meet.line}</p>
              <p className="mt-2 text-sm font-semibold text-sage-deep">
                {getStarted.meet.role}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brass font-display text-lg font-semibold text-oat">
                1
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {getStarted.calendly.heading}
                </h3>
                <p className="text-sm text-muted">{getStarted.calendly.body}</p>
              </div>
            </div>
            <div className="mt-5">
              <Calendly />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brass font-display text-lg font-semibold text-oat">
                2
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {getStarted.contact.heading}
                </h3>
                <p className="text-sm text-muted">{getStarted.contact.body}</p>
              </div>
            </div>
            <div className="mt-5">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

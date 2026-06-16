import { ExternalLink } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { Calendly } from "./Calendly";
import { ContactForm } from "./ContactForm";

export function GetStarted() {
  const { getStarted, links } = site;
  return (
    <section id="book" className="scroll-mt-20">
      <div className="container-page py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{getStarted.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
            {getStarted.heading}
          </h2>
          <p className="mt-3 text-muted">{getStarted.body}</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <h3 className="font-display text-xl font-semibold text-ink">
              {getStarted.calendly.heading}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {getStarted.calendly.body}
            </p>
            <div className="mt-5">
              <Calendly />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ContactForm />
            <a
              href={links.jotform}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep hover:text-ink"
            >
              {getStarted.jotform.label}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

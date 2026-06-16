import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { Calendly } from "./Calendly";
import { ContactForm } from "./ContactForm";

export function GetStarted() {
  const { getStarted, links, about } = site;
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

        {/* Meet Karen — a real, warm face right before the booking ask */}
        <Reveal className="mx-auto mt-8 max-w-2xl" delay={60}>
          <div className="flex flex-col items-center gap-4 rounded-card border border-line bg-mist/40 p-5 text-center sm:flex-row sm:text-left">
            <Image
              src={about.photo.src}
              alt={about.photo.alt}
              width={72}
              height={72}
              className="shrink-0 rounded-full object-cover"
              style={{ height: 72, width: 72 }}
            />
            <div>
              <p className="text-[0.95rem] text-ink">{getStarted.meet.line}</p>
              <p className="mt-1 text-sm font-semibold text-sage-deep">
                {getStarted.meet.role}
              </p>
            </div>
          </div>
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

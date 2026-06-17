import Image from "next/image";
import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function About() {
  const { about } = site;
  return (
    <section id="about" className="bg-mist/50">
      <div className="container-page py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 -z-10 rounded-[28px] bg-brass/20" />
              <div className="overflow-hidden rounded-[24px] border border-line bg-card">
                <Image
                  src={about.photo.src}
                  alt={about.photo.alt}
                  width={542}
                  height={732}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 90vw, 360px"
                  priority={false}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="eyebrow">{about.eyebrow}</p>
            <p className="mt-4 font-display text-2xl italic leading-snug text-ink sm:text-3xl">
              &ldquo;{about.pullQuote}&rdquo;
            </p>
            <div className="mt-6 space-y-4 text-muted">
              {about.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <p className="mt-5 font-display text-2xl italic text-sage-deep">
              {about.signature}
            </p>

            <div className="mt-8 rounded-2xl border border-line bg-card p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <MapPin className="h-4 w-4 text-sage-deep" />
                {about.serviceArea.label}
              </p>
              <p className="mt-2 text-sm text-muted">
                {about.serviceArea.towns.join(", ")},{" "}
                {about.serviceArea.remoteNote}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

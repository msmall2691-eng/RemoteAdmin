import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * "Proudly supporting local businesses" — an auto-scrolling horizontal marquee
 * of client logo cards. The track pauses on hover so links are clickable; the
 * list is duplicated for a seamless loop (the clone is hidden from assistive
 * tech and keyboard focus). Under prefers-reduced-motion the scroll stops.
 */
export function Clients() {
  const { clients } = site;
  const loop = [...clients.items, ...clients.items];

  return (
    <section id="clients" className="border-y border-line bg-card">
      <div className="container-page py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{clients.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
            {clients.heading}
          </h2>
        </Reveal>

        <Reveal className="marquee-mask mt-12 overflow-hidden py-2">
          <ul className="marquee-track animate-marquee flex w-max items-stretch">
            {loop.map((client, i) => {
              const clone = i >= clients.items.length;
              return (
                <li
                  key={i}
                  aria-hidden={clone}
                  className="mr-6 w-64 shrink-0"
                >
                  <div className="hover-lift flex h-full flex-col items-center rounded-card border border-line bg-card p-6 text-center">
                    <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-white p-2">
                      <Image
                        src={client.logo}
                        alt={clone ? "" : `${client.name} logo`}
                        fill
                        sizes="240px"
                        className="object-contain p-1"
                      />
                    </div>
                    {client.url ? (
                      <a
                        href={client.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={clone ? -1 : 0}
                        className="btn-ghost mt-5"
                      >
                        Visit {client.name}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <p className="mt-5 font-display text-base font-semibold text-ink">
                        {client.name}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal className="mt-12 text-center">
          <p className="font-display text-2xl italic text-sage-deep sm:text-3xl">
            {clients.closer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

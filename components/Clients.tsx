import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * "Proudly supporting local businesses" — logo cards that link out to each
 * client's site (mirrors Karen's About page). Logos sit in /public/clients/.
 * A client with no `url` shows its logo without a "Visit" link.
 */
export function Clients() {
  const { clients } = site;

  return (
    <section id="clients" className="border-y border-line bg-card">
      <div className="container-page py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{clients.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
            {clients.heading}
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clients.items.map((client, i) => (
            <Reveal key={client.name} delay={i * 90} className="h-full">
              <div className="hover-lift flex h-full flex-col items-center rounded-card border border-line bg-oat p-7 text-center">
                <div className="relative flex h-28 w-full items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    fill
                    sizes="(max-width: 640px) 80vw, 280px"
                    className="object-contain"
                  />
                </div>
                {client.url ? (
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost mt-6"
                  >
                    Visit {client.name}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <p className="mt-6 font-display text-lg font-semibold text-ink">
                    {client.name}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <p className="font-display text-2xl italic text-sage-deep sm:text-3xl">
            {clients.closer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

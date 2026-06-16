import { Check } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function PainStrip() {
  const { pain } = site;
  return (
    <section className="bg-mist/60">
      <div className="container-page py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{pain.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
            {pain.heading}
          </h2>
        </Reveal>

        <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {pain.items.map((item, i) => (
            <Reveal as="li" key={item} delay={i * 60}>
              <div className="flex items-start gap-3 rounded-2xl border border-line bg-card px-4 py-3.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass/20 text-brass-deep">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-[0.95rem] text-ink">{item}</span>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 text-center" delay={120}>
          <p className="font-display text-2xl italic text-sage-deep sm:text-3xl">
            {pain.closer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import { BadgeCheck, Layers, ShieldCheck, MessagesSquare } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { AmbientGlow } from "./AmbientGlow";

const icons = [BadgeCheck, Layers, ShieldCheck, MessagesSquare];

export function ValueProps() {
  const { valueProps } = site;
  return (
    <section className="relative overflow-hidden bg-mist/50">
      <AmbientGlow />
      <div className="container-page py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tightish text-ink sm:text-3xl">
            {valueProps.heading}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal as="article" key={item.title} delay={i * 80}>
                <div className="card hover-lift h-full p-6 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage/15 text-sage-deep">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

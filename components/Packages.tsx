import { Check } from "lucide-react";
import { site, icons } from "@/content/site";
import { Reveal } from "./Reveal";

export function Packages() {
  const { packages } = site;
  return (
    <section id="packages" className="bg-mist/50">
      <div className="container-page py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{packages.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
            {packages.heading}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.items.map((pkg, i) => {
            const Icon = icons[pkg.icon];
            return (
              <Reveal as="article" key={pkg.name} delay={i * 80} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-card border bg-card p-7 ${
                    pkg.highlighted
                      ? "border-brass shadow-md ring-1 ring-brass/30"
                      : "border-line"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        pkg.highlighted
                          ? "bg-brass/15 text-brass-deep"
                          : "bg-mist text-sage-deep"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-pill border border-line px-3 py-1 text-xs font-medium text-muted">
                      {pkg.kind}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                    {pkg.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-brass-deep">
                    {pkg.price}
                  </p>
                  <p className="mt-3 text-sm text-muted">{pkg.description}</p>
                  <ul className="mt-5 space-y-2.5">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-ink"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-sage"
                          strokeWidth={2.5}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={pkg.cta.href}
                    className={`mt-7 ${pkg.highlighted ? "btn-brass" : "btn-ghost"}`}
                  >
                    {pkg.cta.label}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-sm text-muted">{packages.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

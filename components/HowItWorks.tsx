import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function HowItWorks() {
  const { how } = site;
  return (
    <section id="how">
      <div className="container-page py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{how.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
            {how.heading}
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {how.steps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 90} className="h-full">
              <div className="card hover-lift h-full p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-display text-xl font-semibold text-oat">
                  {step.n}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
                {"cta" in step && step.cta && (
                  <a
                    href={step.cta.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep hover:text-ink"
                  >
                    {step.cta.label}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

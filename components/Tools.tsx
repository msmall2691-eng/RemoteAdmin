import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function Tools() {
  const { tools } = site;
  return (
    <section className="bg-mist/40">
      <div className="container-page py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{tools.eyebrow}</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tightish text-ink sm:text-3xl">
            {tools.heading}
          </h2>
          <p className="mt-3 text-muted">{tools.body}</p>
        </Reveal>

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {tools.items.map((tool, i) => (
            <Reveal
              key={tool}
              as="span"
              delay={i * 45}
              className="rounded-pill border border-line bg-card px-4 py-2 text-sm font-medium text-ink shadow-sm transition-all duration-200 hover:border-sage hover:bg-mist/40 hover:shadow-md"
            >
              {tool}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Sparkles, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { FreeToolsTabs } from "./FreeToolsTabs";

export function FreeTools() {
  const { toolsPage } = site;

  return (
    <section
      id="tools"
      className="scroll-mt-24 bg-gradient-to-b from-mist/30 to-transparent"
    >
      <div className="container-page py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {toolsPage.eyebrow} · no sign-up
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
            Free tools. Try them out.
          </h2>
          <p className="mt-3 text-muted">{toolsPage.intro}</p>
          <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-pill border border-line bg-card/70 px-4 py-2 text-xs text-muted">
            <ShieldCheck className="h-4 w-4 text-sage-deep" />
            {toolsPage.disclaimer}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-5xl">
          <FreeToolsTabs />
        </Reveal>
      </div>
    </section>
  );
}

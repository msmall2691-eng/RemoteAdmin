import { Sparkles, Mail, BellRing, ArrowDown } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * Condensed teaser near the top — a quick sample of the free tools that links
 * down to the full interactive section, so the About section stays close up.
 */
export function ToolsPreview() {
  return (
    <section className="container-page py-8 sm:py-10">
      <Reveal className="rounded-card border border-line bg-card/70 p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist/70 text-sage-deep">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-ink">
                Free tools you can use
              </p>
              <p className="text-sm text-muted">
                No sign-up — try them lower down the page.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="#tools" className="btn-ghost">
              <Mail className="h-4 w-4" />
              Email signature
            </a>
            <a href="#tools" className="btn-ghost">
              <BellRing className="h-4 w-4" />
              Payment reminder
            </a>
            <a href="#tools" className="btn-ink" aria-label="Jump to the free tools">
              Try them
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

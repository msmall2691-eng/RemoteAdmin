import Link from "next/link";
import { Mail, BellRing, ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

const TEASERS = [
  {
    href: "/tools#signature",
    Icon: Mail,
    name: "Email Signature Maker",
    body: "Build a polished signature and paste it into Gmail or Outlook.",
  },
  {
    href: "/tools#reminder",
    Icon: BellRing,
    name: "Late Payment Reminder",
    body: "Generate a polite payment nudge in seconds — email or text.",
  },
];

export function FreeToolsTeaser() {
  return (
    <section className="bg-gradient-to-b from-transparent to-mist/30">
      <div className="container-page py-10 sm:py-12">
        <Reveal className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Free tools · no sign-up
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tightish text-ink sm:text-3xl">
              Free tools you can use right now
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              A few handy tools for small business owners — free to use, nothing
              to install, and nothing stored.
            </p>
          </div>
          <Link
            href="/tools"
            className="shrink-0 text-sm font-semibold text-sage-deep transition-colors hover:text-ink"
          >
            See all tools <ArrowRight className="inline h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {TEASERS.map(({ href, Icon, name, body }, i) => (
            <Reveal key={href} delay={i * 60}>
              <Link
                href={href}
                className="hover-lift group flex h-full flex-col rounded-card border border-line bg-card p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist/70 text-sage-deep">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm text-muted">{body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep">
                  Open tool
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

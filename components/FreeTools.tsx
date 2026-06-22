import { Sparkles, ShieldCheck, Mail, FileText } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { EmailSignatureGenerator } from "./tools/EmailSignatureGenerator";
import { InvoiceTool } from "./tools/InvoiceTool";

const { toolsPage } = site;

function ToolCard({
  id,
  tag,
  Icon,
  title,
  description,
  children,
}: {
  id: string;
  tag: string;
  Icon: typeof Mail;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="scroll-mt-28 overflow-hidden rounded-card border border-line bg-card shadow-sm"
    >
      <div className="flex items-start gap-4 border-b border-line bg-mist/30 p-6 sm:p-7">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-card text-sage-deep shadow-sm">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <p className="eyebrow">{tag}</p>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink sm:text-2xl">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted">{description}</p>
        </div>
      </div>
      <div className="p-6 sm:p-8">{children}</div>
    </div>
  );
}

export function FreeTools() {
  return (
    <section
      id="tools"
      className="scroll-mt-24 bg-gradient-to-b from-mist/30 to-transparent"
    >
      <div className="container-page py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {toolsPage.eyebrow} · no sign-up
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
            {toolsPage.title}
          </h2>
          <p className="mt-3 text-muted">{toolsPage.intro}</p>
          <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-pill border border-line bg-card/70 px-4 py-2 text-xs text-muted">
            <ShieldCheck className="h-4 w-4 text-sage-deep" />
            {toolsPage.disclaimer}
          </p>
        </Reveal>

        <div className="mt-12 space-y-10">
          <Reveal>
            <ToolCard
              id="email-signature"
              tag="Tool 01"
              Icon={Mail}
              title="Email Signature Generator"
              description="Build a polished signature and paste it straight into Gmail or Outlook — live preview as you type."
            >
              <EmailSignatureGenerator />
            </ToolCard>
          </Reveal>

          <Reveal delay={80}>
            <ToolCard
              id="invoice"
              tag="Tool 02"
              Icon={FileText}
              title="Invoice Maker"
              description="Create a clean, professional invoice in seconds, then print it or save it as a PDF."
            >
              <InvoiceTool />
            </ToolCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

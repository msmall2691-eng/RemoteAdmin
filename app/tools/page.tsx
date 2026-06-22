import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { ToolsHub } from "@/components/tools/ToolsHub";

const { toolsPage } = site;

export const metadata: Metadata = {
  title: "Free Admin Tools for Small Business Owners",
  description: toolsPage.intro,
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free Admin Tools for Small Business Owners",
    description: toolsPage.intro,
    url: "/tools",
  },
};

export default function ToolsPage() {
  return (
    <section className="container-page py-14 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{toolsPage.eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tightish text-ink md:text-5xl">
          {toolsPage.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{toolsPage.intro}</p>
        <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-pill border border-line bg-mist/40 px-4 py-2 text-xs text-muted">
          <ShieldCheck className="h-4 w-4 text-sage-deep" />
          {toolsPage.disclaimer}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-5xl">
        <ToolsHub />
      </div>
    </section>
  );
}

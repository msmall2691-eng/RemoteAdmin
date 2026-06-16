import type { Metadata } from "next";
import { About } from "@/components/About";
import { Clients } from "@/components/Clients";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Remote Admin brings 35+ years of keeping offices running to small service businesses across southern New Hampshire — careful, reliable, confidential.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <About />
      <Clients />
      <CtaBand />
    </>
  );
}

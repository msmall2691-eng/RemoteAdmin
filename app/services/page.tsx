import type { Metadata } from "next";
import { Services } from "@/components/Services";
import { Packages } from "@/components/Packages";
import { HowItWorks } from "@/components/HowItWorks";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bookkeeping, administrative support, and the signature Office Rescue catch-up — flexible help for small service businesses in southern New Hampshire.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Services />
      <Packages />
      <HowItWorks />
      <CtaBand />
    </>
  );
}

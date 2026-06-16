import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about working with The Remote Admin — confidentiality, software, communication, contracts, and remote-but-local support.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <Faq />
      <CtaBand />
    </>
  );
}

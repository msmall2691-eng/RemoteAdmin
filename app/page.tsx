import { Hero } from "@/components/Hero";
import { PainStrip } from "@/components/PainStrip";
import { ServicesTeaser } from "@/components/ServicesTeaser";
import { CtaBand } from "@/components/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <PainStrip />
      <ServicesTeaser />
      <CtaBand />
    </>
  );
}

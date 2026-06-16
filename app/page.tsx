import { Hero } from "@/components/Hero";
import { Clients } from "@/components/Clients";
import { PainStrip } from "@/components/PainStrip";
import { ServicesTeaser } from "@/components/ServicesTeaser";
import { CtaBand } from "@/components/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <PainStrip />
      <ServicesTeaser />
      <CtaBand />
    </>
  );
}

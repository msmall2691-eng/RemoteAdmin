import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { PainStrip } from "@/components/PainStrip";
import { Services } from "@/components/Services";
import { Tools } from "@/components/Tools";
import { HowItWorks } from "@/components/HowItWorks";
import { ToolsPreview } from "@/components/ToolsPreview";
import { FreeTools } from "@/components/FreeTools";
import { Packages } from "@/components/Packages";
import { CtaStrip } from "@/components/CtaStrip";
import { Reviews } from "@/components/Reviews";
import { Clients } from "@/components/Clients";
import { Faq } from "@/components/Faq";
import { SocialFeed } from "@/components/SocialFeed";
import { BrandBand } from "@/components/BrandBand";
import { GetStarted } from "@/components/GetStarted";

export default function Home() {
  return (
    <>
      <Hero />
      <ToolsPreview />
      <About />
      <PainStrip />
      <Services />
      <HowItWorks />
      <Tools />
      <Packages />
      <CtaStrip />
      <Reviews />
      <Clients />
      <Faq />
      <SocialFeed />
      <FreeTools />
      <BrandBand />
      <GetStarted />
    </>
  );
}

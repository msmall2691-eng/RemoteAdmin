import { Hero } from "@/components/Hero";
import { ValueProps } from "@/components/ValueProps";
import { About } from "@/components/About";
import { PainStrip } from "@/components/PainStrip";
import { Services } from "@/components/Services";
import { Tools } from "@/components/Tools";
import { HowItWorks } from "@/components/HowItWorks";
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
      <ValueProps />
      <About />
      <PainStrip />
      <Services />
      <Tools />
      <HowItWorks />
      <Packages />
      <CtaStrip />
      <Reviews />
      <Clients />
      <Faq />
      <SocialFeed />
      <BrandBand />
      <GetStarted />
    </>
  );
}

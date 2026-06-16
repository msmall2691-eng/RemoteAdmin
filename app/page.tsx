import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { PainStrip } from "@/components/PainStrip";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Packages } from "@/components/Packages";
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
      <About />
      <PainStrip />
      <Services />
      <HowItWorks />
      <Packages />
      <Reviews />
      <Clients />
      <Faq />
      <SocialFeed />
      <BrandBand />
      <GetStarted />
    </>
  );
}

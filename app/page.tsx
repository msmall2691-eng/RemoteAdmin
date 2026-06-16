import { Hero } from "@/components/Hero";
import { Clients } from "@/components/Clients";
import { PainStrip } from "@/components/PainStrip";
import { Services } from "@/components/Services";
import { Packages } from "@/components/Packages";
import { HowItWorks } from "@/components/HowItWorks";
import { About } from "@/components/About";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { SocialFeed } from "@/components/SocialFeed";
import { GetStarted } from "@/components/GetStarted";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <PainStrip />
      <Services />
      <Packages />
      <HowItWorks />
      <About />
      <Reviews />
      <Faq />
      <SocialFeed />
      <GetStarted />
    </>
  );
}

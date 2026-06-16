import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { PainStrip } from "@/components/PainStrip";
import { Services } from "@/components/Services";
import { Packages } from "@/components/Packages";
import { HowItWorks } from "@/components/HowItWorks";
import { About } from "@/components/About";
import { Reviews } from "@/components/Reviews";
import { Clients } from "@/components/Clients";
import { Faq } from "@/components/Faq";
import { SocialFeed } from "@/components/SocialFeed";
import { GetStarted } from "@/components/GetStarted";
import { Footer } from "@/components/Footer";
import { StickyMobileCta } from "@/components/StickyMobileCta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PainStrip />
        <Services />
        <Packages />
        <HowItWorks />
        <About />
        <Reviews />
        <Clients />
        <Faq />
        <SocialFeed />
        <GetStarted />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}

import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * A calm brand moment — her logo + slogan — used once near the bottom to
 * reinforce The Remote Admin before the booking section.
 */
export function BrandBand() {
  const { business } = site;
  return (
    <section className="bg-mist/70">
      <div className="container-page py-14 sm:py-16">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Image
            src="/tra-logo.png"
            alt={business.name}
            width={445}
            height={446}
            className="h-20 w-auto sm:h-24"
          />
          <p className="mt-4 font-display text-2xl italic text-sage-deep sm:text-3xl">
            {business.slogan}
          </p>
          <p className="mt-3 text-muted">
            Administrative support, invoicing &amp; collections for small,
            service-based businesses across southern New Hampshire.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import { site } from "@/content/site";

/**
 * Structured data for Google:
 * - ProfessionalService: who Karen is, where she serves, how to reach her (local SEO).
 * - FAQPage: lets the FAQ qualify for rich results.
 */
export function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.business.url;

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.business.name,
    description:
      "Virtual office admin support, light bookkeeping, and collections for contractors and service-based businesses across southern New Hampshire.",
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    telephone: site.business.phone,
    email: site.business.email,
    founder: { "@type": "Person", name: site.business.owner },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.business.city,
      addressRegion: site.business.state,
      addressCountry: "US",
    },
    areaServed: site.about.serviceArea.towns.map((town) => ({
      "@type": "City",
      name: `${town}, NH`,
    })),
    sameAs: [site.links.facebook, site.links.instagram].filter(Boolean),
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD must be injected as a string; content is fully controlled.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}

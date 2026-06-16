import { site } from "@/content/site";

/**
 * Local-SEO structured data: ProfessionalService.
 * Helps Google understand who Karen is, where she serves, and how to reach her.
 */
export function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.business.url;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.business.name,
    description:
      "Virtual admin & bookkeeping for small, service-based businesses across southern New Hampshire.",
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

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be injected as a string; content is fully controlled.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

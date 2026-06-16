import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  // Variable font: weight spans 400–600 automatically; opsz = optical sizing on.
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.business.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.business.name} — Virtual Admin & Bookkeeping in Southern NH`,
    template: `%s · ${site.business.name}`,
  },
  description:
    "Let's get your business organized — and get you paid. Virtual admin & bookkeeping for small, service-based businesses across southern New Hampshire. Book a free discovery call.",
  applicationName: site.business.name,
  authors: [{ name: site.business.owner }],
  keywords: [
    "virtual admin",
    "bookkeeping",
    "Amherst NH",
    "southern New Hampshire",
    "QuickBooks",
    "invoicing",
    "small business admin",
    "Office Rescue",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.business.name,
    title: `${site.business.name} — Virtual Admin & Bookkeeping in Southern NH`,
    description:
      "You focus on your customers; I'll take care of the admin. Bookkeeping & virtual admin for small businesses in southern New Hampshire.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.business.name} — Virtual Admin & Bookkeeping`,
    description:
      "You focus on your customers; I'll take care of the admin. Serving southern New Hampshire.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd />
        <Nav />
        <main>{children}</main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}

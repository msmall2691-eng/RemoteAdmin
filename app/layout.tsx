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
    default: `${site.business.name} — Invoicing & Admin Support in Southern NH`,
    template: `%s · ${site.business.name}`,
  },
  description:
    "Get your invoices out and your payments in. Invoicing, collections, and administrative support for small, service-based businesses across southern New Hampshire. Book a free discovery call.",
  applicationName: site.business.name,
  authors: [{ name: site.business.owner }],
  keywords: [
    "invoicing",
    "accounts receivable",
    "collections",
    "administrative support",
    "virtual admin",
    "contractor admin support",
    "Amherst NH",
    "southern New Hampshire",
    "QuickBooks",
    "small business admin",
    "Office Rescue",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.business.name,
    title: `${site.business.name} — Invoicing & Admin Support in Southern NH`,
    description:
      "You focus on your customers; I'll get the invoices out, chase the payments, and handle the admin. Serving small businesses across southern New Hampshire.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.business.name} — Invoicing & Admin Support`,
    description:
      "You focus on your customers; I'll get the invoices out and the payments in. Serving southern New Hampshire.",
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

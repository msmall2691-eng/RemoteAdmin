import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { ScrollProgress } from "@/components/ScrollProgress";
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
    default: `${site.business.name} | Office Admin Support in Southern NH`,
    template: `%s · ${site.business.name}`,
  },
  description:
    "Virtual office admin support for contractors and service businesses in southern New Hampshire. Get caught up, organized, and back in control. Book a free call.",
  applicationName: site.business.name,
  authors: [{ name: site.business.owner }],
  keywords: [
    "virtual administrative support",
    "office admin support",
    "contractor admin support",
    "invoicing and collections",
    "accounts receivable",
    "SOPs and process documentation",
    "light bookkeeping",
    "QuickBooks",
    "Amherst NH",
    "southern New Hampshire",
    "Office Rescue",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.business.name,
    title: `${site.business.name} | Office Admin Support for Contractors`,
    description:
      "Office admin, light bookkeeping, and collections for contractors and service businesses in southern New Hampshire. Get caught up and organized.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.business.name} | Office Admin Support in Southern NH`,
    description:
      "Office admin, light bookkeeping, and collections for contractors in southern NH. Get caught up and back in control.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#2d4a7a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-oat focus:shadow-md"
        >
          Skip to content
        </a>
        <JsonLd />
        <ScrollProgress />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}

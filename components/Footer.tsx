import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Facebook, Instagram, MapPin } from "lucide-react";
import { site } from "@/content/site";

export function Footer() {
  const { business, footer, nav, links } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-mist/50">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/tra-logo.png"
                alt={business.name}
                width={445}
                height={446}
                className="h-14 w-auto"
              />
              <span className="font-display text-lg font-semibold text-ink">
                The Remote Admin
              </span>
            </div>
            <p className="mt-4 font-display text-base italic text-brass-deep">
              {business.slogan}
            </p>
            <p className="mt-3 max-w-xs text-sm text-muted">{footer.blurb}</p>
          </div>

          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Get in touch</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={business.emailHref}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                >
                  <Mail className="h-4 w-4" />
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  href={business.phoneHref}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                >
                  <Phone className="h-4 w-4" />
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
              </li>
              {links.instagram && (
                <li>
                  <a
                    href={links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                </li>
              )}
              {links.google && (
                <li>
                  <a
                    href={links.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                  >
                    <MapPin className="h-4 w-4" />
                    Find us on Google
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
            <a
              href={footer.credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              {footer.credit.label}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

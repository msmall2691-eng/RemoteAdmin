import Image from "next/image";
import { Mail, Phone, Facebook, Instagram, ExternalLink } from "lucide-react";
import { site } from "@/content/site";

export function Footer() {
  const { business, footer, nav, links } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-oat">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-oat p-1.5">
                <Image
                  src="/tra-logo.png"
                  alt={business.name}
                  width={445}
                  height={446}
                  className="h-full w-auto"
                />
              </span>
              <span className="font-display text-lg font-semibold">
                The Remote Admin
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-oat/70">
              {footer.blurb}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-oat/80 transition-colors hover:text-oat"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={links.jotform}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-oat/80 transition-colors hover:text-oat"
                >
                  New client intake
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">
              Get in touch
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={business.emailHref}
                  className="inline-flex items-center gap-2 text-sm text-oat/80 transition-colors hover:text-oat"
                >
                  <Mail className="h-4 w-4" />
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  href={business.phoneHref}
                  className="inline-flex items-center gap-2 text-sm text-oat/80 transition-colors hover:text-oat"
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
                  className="inline-flex items-center gap-2 text-sm text-oat/80 transition-colors hover:text-oat"
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
                    className="inline-flex items-center gap-2 text-sm text-oat/80 transition-colors hover:text-oat"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-oat/60">
          © {year} {footer.copyright}
        </div>
      </div>
    </footer>
  );
}

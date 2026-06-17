"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, Facebook, Instagram } from "lucide-react";
import { site } from "@/content/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled ? "border-b border-line bg-oat/90 backdrop-blur" : "bg-oat"
      }`}
    >
      <nav
        className="container-page flex h-16 items-center justify-between sm:h-20"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="flex items-center"
          aria-label={`${site.business.name}, home`}
        >
          <Image
            src="/tra-logo.png"
            alt={site.business.name}
            width={445}
            height={446}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <span className="flex items-center gap-1">
            <a
              href={site.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Remote Admin on Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-mist/60 hover:text-ink"
            >
              <Facebook className="h-[1.15rem] w-[1.15rem]" />
            </a>
            {site.links.instagram && (
              <a
                href={site.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The Remote Admin on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-mist/60 hover:text-ink"
              >
                <Instagram className="h-[1.15rem] w-[1.15rem]" />
              </a>
            )}
          </span>
          <a href="#book" className="btn-brass">
            Book a call
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-oat md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-mist/60"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#book"
              className="btn-brass mt-2"
              onClick={() => setOpen(false)}
            >
              Book a call
            </a>
            <div className="mt-3 flex items-center gap-2 border-t border-line pt-4">
              <a
                href={site.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The Remote Admin on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
              >
                <Facebook className="h-5 w-5" />
              </a>
              {site.links.instagram && (
                <a
                  href={site.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="The Remote Admin on Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

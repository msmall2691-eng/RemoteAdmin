"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Facebook, Instagram } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("/#top");
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav item for the section currently in view.
  useEffect(() => {
    const ids = site.nav
      .map((item) => item.href.split("#")[1])
      .filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top of the viewport that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(`/#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open, and close on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled || open
          ? "border-b border-line bg-oat/90 backdrop-blur"
          : "bg-oat"
      }`}
    >
      <nav
        className="container-page flex h-16 items-center justify-between sm:h-20"
        aria-label="Primary"
      >
        <Link
          href="/#top"
          className="group flex items-center"
          aria-label={`${site.business.name}, home`}
        >
          <Image
            src="/tra-logo.png"
            alt={site.business.name}
            width={445}
            height={446}
            priority
            className="h-14 w-auto transition-transform duration-200 group-hover:scale-[1.03] sm:h-16"
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-sage after:transition-all after:duration-300 hover:text-ink ${
                  isActive
                    ? "text-ink after:w-full"
                    : "text-muted after:w-0 hover:after:w-full"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <span className="flex items-center gap-1">
            <a
              href={site.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Remote Admin on Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-all hover:scale-110 hover:bg-mist/60 hover:text-ink"
            >
              <Facebook className="h-[1.15rem] w-[1.15rem]" />
            </a>
            {site.links.instagram && (
              <a
                href={site.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The Remote Admin on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-all hover:scale-110 hover:bg-mist/60 hover:text-ink"
              >
                <Instagram className="h-[1.15rem] w-[1.15rem]" />
              </a>
            )}
            <ThemeSwitcher />
          </span>
          <Link href="/#book" className="btn-brass">
            Book a call
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-mist/60 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            {/* Dim the page behind the menu */}
            <motion.div
              className="fixed inset-0 top-16 z-40 bg-ink/20 backdrop-blur-[2px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              className="relative z-50 overflow-hidden border-t border-line bg-oat md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut" }}
            >
              <div className="container-page flex flex-col gap-1 py-4">
                {site.nav.map((item, i) => {
                  const isActive = active === item.href;
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-mist/70 text-ink"
                          : "text-ink hover:bg-mist/60"
                      }`}
                      onClick={() => setOpen(false)}
                      initial={reduce ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: reduce ? 0 : 0.05 + i * 0.04,
                      }}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-sage"
                        />
                      )}
                    </motion.a>
                  );
                })}
                <Link
                  href="/#book"
                  className="btn-brass mt-2"
                  onClick={() => setOpen(false)}
                >
                  Book a call
                </Link>
                <div className="mt-3 flex items-center gap-2 border-t border-line pt-4">
                  <a
                    href={site.links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="The Remote Admin on Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-mist/60"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  {site.links.instagram && (
                    <a
                      href={site.links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="The Remote Admin on Instagram"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-mist/60"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  <span className="ml-auto inline-flex items-center gap-2 text-sm text-muted">
                    Theme
                    <ThemeSwitcher variant="inline" />
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

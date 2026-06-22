"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MessageSquare } from "lucide-react";
import { site } from "@/content/site";

/**
 * Sticky "Book a call" bar for small screens. Appears after the hero scrolls
 * past, hides itself once the booking section is on screen.
 */
export function StickyMobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const book = document.getElementById("book");
      const bookVisible =
        book && book.getBoundingClientRect().top < window.innerHeight;
      setShow(window.scrollY > 600 && !bookVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-oat/95 p-3 backdrop-blur transition-transform duration-200 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-2">
        <Link href="/#book" className="btn-brass flex-1">
          <CalendarDays className="h-4 w-4" />
          Book a call
        </Link>
        <a
          href={site.business.smsHref}
          className="btn-ghost shrink-0"
          aria-label={`Text us at ${site.business.phone}`}
        >
          <MessageSquare className="h-4 w-4" />
          Text
        </a>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { site } from "@/content/site";

/**
 * Calendly inline widget, themed to match the site (bg fbf8f2, accent 6b8e72).
 * Falls back to a plain link if the Calendly script can't load.
 */
export function Calendly() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const existing = document.getElementById("calendly-widget-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onerror = () => !cancelled && setFailed(true);
      document.body.appendChild(script);
    }

    const timer = setTimeout(() => {
      if (cancelled) return;
      if (!ref.current?.querySelector("iframe")) setFailed(true);
    }, 4000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  // Themed Calendly URL (hides cookie banner, sets brand colors).
  const url = `${site.links.calendly}?hide_gdpr_banner=1&background_color=fbf8f2&text_color=1f3a2e&primary_color=6b8e72`;

  if (failed) {
    return (
      <div className="card flex flex-col items-center p-8 text-center">
        <p className="text-muted">
          The booking calendar didn&rsquo;t load. You can still grab a time
          here:
        </p>
        <a
          href={site.links.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-brass mt-5"
        >
          <ExternalLink className="h-4 w-4" />
          Open the booking calendar
        </a>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Book a free discovery call with The Remote Admin"
      className="calendly-inline-widget overflow-hidden rounded-card border border-line"
      data-url={url}
      style={{ minWidth: "320px", height: "660px" }}
    />
  );
}

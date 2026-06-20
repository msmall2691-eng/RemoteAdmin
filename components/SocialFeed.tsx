"use client";

import { useEffect, useRef, useState } from "react";
import { Facebook, Instagram, ExternalLink } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Facebook Page Plugin (timeline) with a graceful fallback. The plugin is
 * sized to its container so it fits neatly on phones (FB allows 180–500px);
 * we re-measure on resize and re-parse. If the SDK fails to load (blockers,
 * network), we show simple Follow buttons instead of an empty box.
 */
export function SocialFeed() {
  const { social, links } = site;
  const measureRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);
  const [width, setWidth] = useState<number | null>(null);

  // Measure the available width and clamp to Facebook's 180–500px range.
  useEffect(() => {
    const measure = () => {
      const w = measureRef.current?.clientWidth;
      if (!w) return;
      setWidth(Math.max(180, Math.min(500, Math.floor(w))));
    };
    measure();

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Load (or re-parse) the FB SDK whenever the target width changes.
  useEffect(() => {
    if (width == null) return;
    let cancelled = false;

    const w = window as unknown as { FB?: { XFBML: { parse: () => void } } };
    if (w.FB) {
      w.FB.XFBML.parse();
    } else if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
      script.onerror = () => !cancelled && setFailed(true);
      document.body.appendChild(script);
    }

    // Fallback: if the iframe never renders, show the follow buttons.
    const timer = setTimeout(() => {
      if (cancelled) return;
      const hasIframe = containerRef.current?.querySelector("iframe");
      if (!hasIframe) setFailed(true);
    }, 3500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [width]);

  return (
    <section id="social" className="bg-mist/50">
      <div className="container-page py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{social.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
            {social.heading}
          </h2>
          <p className="mt-3 text-muted">{social.body}</p>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-center">
          {/* Full-width up to 500px so the embed shrinks cleanly on phones */}
          <div ref={measureRef} className="w-full max-w-[500px]">
            {!failed ? (
              <div
                ref={containerRef}
                className="hover-lift overflow-hidden rounded-card border border-line bg-card"
              >
                {width != null && (
                  <div
                    key={width}
                    className="fb-page"
                    data-href={links.facebook}
                    data-tabs="timeline"
                    data-width={String(width)}
                    data-height="600"
                    data-small-header="false"
                    data-adapt-container-width="true"
                    data-hide-cover="false"
                    data-show-facepile="true"
                  >
                    <blockquote
                      cite={links.facebook}
                      className="fb-xfbml-parse-ignore"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="card p-8 text-center">
                <p className="text-muted">
                  My latest updates live on Facebook, come say hello.
                </p>
                <a
                  href={links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost mt-5"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open our Facebook page
                </a>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Facebook className="h-4 w-4" />
              Follow on Facebook
            </a>
            {links.instagram && (
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Instagram className="h-4 w-4" />
                Follow on Instagram
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Facebook, Instagram, ExternalLink } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Facebook Page Plugin (timeline) with a graceful fallback. If the FB SDK
 * fails to load (blockers, network) within a short window, we show simple
 * Follow buttons instead of an empty box.
 */
export function SocialFeed() {
  const { social, links } = site;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // If the SDK is already present, ask it to (re)parse our plugin.
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
  }, []);

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
          {!failed ? (
            <div
              ref={containerRef}
              className="overflow-hidden rounded-card border border-line bg-card"
            >
              <div
                className="fb-page"
                data-href={links.facebook}
                data-tabs="timeline"
                data-width="500"
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
            </div>
          ) : (
            <div className="card max-w-md p-8 text-center">
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

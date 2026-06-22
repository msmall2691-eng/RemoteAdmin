import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * The site is fully static content (nothing is rendered from user input), so the
 * main job here is to lock down which outside origins the browser may talk to.
 * We allow exactly the third parties this site uses:
 *   - Calendly  (booking widget script + iframe)
 *   - Facebook  (page-feed SDK script + iframe)
 * Fonts are self-hosted by next/font, so no font origins are needed.
 *
 * 'unsafe-inline' is required for styles (Framer Motion / Tailwind inject inline
 * styles) and for Next.js's small inline bootstrap scripts. Because no
 * user-supplied content is ever written into the page, the XSS surface is
 * minimal; the allow-listed origins are what matter most here.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https://assets.calendly.com https://connect.facebook.net",
  "frame-src https://*.calendly.com https://*.facebook.com https://www.facebook.com",
  "connect-src 'self' https://*.calendly.com https://*.facebook.com https://connect.facebook.net https://graph.facebook.com",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Force HTTPS for two years, including subdomains. Lets the site be
  // preloaded into browsers' built-in HTTPS-only lists.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Don't let browsers guess (MIME-sniff) a file's type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block the site from being framed elsewhere (clickjacking).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Only send the origin (not the full path) to other sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Turn off powerful browser features the site never uses.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

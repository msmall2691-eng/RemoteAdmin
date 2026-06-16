import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.business.name} — Virtual Admin & Bookkeeping in Southern NH`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded OG share image. Uses the site's color tokens and a tidy-stack mark.
 * NOTE(Karen): once a headshot is in /public, this can be extended to include
 * her photo via an <img> with an absolute URL.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1f4744",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundColor: "#faf8f3",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 7,
              padding: "0 14px",
            }}
          >
            <div style={{ height: 6, borderRadius: 3, backgroundColor: "#1f4744" }} />
            <div style={{ height: 6, width: "100%", borderRadius: 3, backgroundColor: "#5f9277" }} />
            <div style={{ height: 6, width: "60%", borderRadius: 3, backgroundColor: "#2f7a73" }} />
          </div>
          <div style={{ display: "flex", color: "#faf8f3", fontSize: 32, fontWeight: 600 }}>
            The Remote Admin
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              color: "#2f7a73",
              fontSize: 24,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {"Virtual admin & bookkeeping · Southern NH"}
          </div>
          <div
            style={{
              display: "flex",
              color: "#faf8f3",
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.05,
              maxWidth: 920,
            }}
          >
            {"Let’s get your business organized — and get you paid."}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", color: "#2f7a73", fontSize: 30, fontStyle: "italic" }}>
            {site.business.slogan}
          </div>
          <div style={{ display: "flex", color: "#d6e3f0", fontSize: 24 }}>
            {`${site.business.owner} · Amherst, NH`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

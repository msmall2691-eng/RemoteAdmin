import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { site } from "@/content/site";

export const alt = `${site.business.name}, Admin & Bookkeeping Support in Southern NH`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded OG share image — styled to match the site itself: warm cream
 * background, navy serif headline (Fraunces), the logo as a clean badge, and
 * soft brand glows. Fonts are fetched from Google Fonts; if that ever fails the
 * image still renders with a default font (never breaks the build).
 */

async function loadFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
        family,
      )}:wght@${weight}`,
      // Old UA so Google serves a satori-compatible woff/ttf (not woff2).
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1",
        },
      },
    ).then((r) => r.text());
    const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const logo = readFileSync(join(process.cwd(), "public/tra-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  const [fraunces, inter] = await Promise.all([
    loadFont("Fraunces", 600),
    loadFont("Inter", 400),
  ]);

  const fonts = [
    fraunces && { name: "Fraunces", data: fraunces, weight: 600 as const, style: "normal" as const },
    inter && { name: "Inter", data: inter, weight: 400 as const, style: "normal" as const },
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    weight: 600 | 400;
    style: "normal";
  }[];

  const serif = "Fraunces, Georgia, serif";
  const sans = "Inter, system-ui, sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 48,
          padding: "70px",
          backgroundColor: "#fdfcf5",
          overflow: "hidden",
          fontFamily: sans,
        }}
      >
        {/* Soft brand glows */}
        <div
          style={{
            position: "absolute",
            top: -130,
            right: -70,
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(191,212,215,0.85) 0%, rgba(122,152,196,0.20) 45%, rgba(253,252,245,0) 72%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: -110,
            width: 460,
            height: 460,
            background:
              "radial-gradient(circle, rgba(122,152,196,0.22) 0%, rgba(253,252,245,0) 70%)",
          }}
        />

        {/* Text column */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            maxWidth: 660,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#385c92",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Admin · Bookkeeping · Collections · Southern NH
          </div>

          <div
            style={{
              display: "flex",
              color: "#2d4a7a",
              fontSize: 62,
              lineHeight: 1.04,
              fontFamily: serif,
              fontWeight: 600,
              marginTop: 18,
            }}
          >
            Get caught up, organized, and back in control.
          </div>

          <div
            style={{
              display: "flex",
              width: 84,
              height: 6,
              borderRadius: 99,
              backgroundColor: "#3a6096",
              marginTop: 26,
            }}
          />

          <div
            style={{
              display: "flex",
              color: "#58667a",
              fontSize: 26,
              marginTop: 26,
              maxWidth: 560,
            }}
          >
            You focus on your customers; I&rsquo;ll take care of the admin.
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 46 }}>
            <div
              style={{
                display: "flex",
                color: "#2d4a7a",
                fontSize: 30,
                fontFamily: serif,
                fontWeight: 600,
              }}
            >
              The Remote Admin
            </div>
            <div
              style={{ display: "flex", color: "#58667a", fontSize: 22, marginTop: 4 }}
            >
              {`${site.business.owner} · Amherst, NH`}
            </div>
          </div>
        </div>

        {/* Logo badge */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 320,
            height: 320,
            borderRadius: 9999,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e0d6",
            boxShadow: "0 30px 70px -25px rgba(45,74,122,0.45)",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={240} height={240} alt="" />
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}

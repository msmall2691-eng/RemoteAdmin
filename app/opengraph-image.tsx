import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { site } from "@/content/site";

export const alt = `${site.business.name} — Invoicing & Administrative Support in Southern NH`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded OG share image — features Karen's real logo on a teal band.
 */
export default function OpengraphImage() {
  // Embed the real logo (read at build time) as a data URI so satori can render it.
  const logo = readFileSync(join(process.cwd(), "public/tra-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#37606a",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={80} height={80} alt="" />
          </div>
          <div style={{ display: "flex", color: "#f7f4ed", fontSize: 34, fontWeight: 600 }}>
            The Remote Admin
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              color: "#e6b84c",
              fontSize: 24,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {"Admin support, invoicing & collections · Southern NH"}
          </div>
          <div
            style={{
              display: "flex",
              color: "#f7f4ed",
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.05,
              maxWidth: 960,
            }}
          >
            {"Get your invoices out — and your payments in."}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", color: "#e6b84c", fontSize: 30, fontStyle: "italic" }}>
            {site.business.slogan}
          </div>
          <div style={{ display: "flex", color: "#bfd4d7", fontSize: 24 }}>
            {`${site.business.owner} · Amherst, NH`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

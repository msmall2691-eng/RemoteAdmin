import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon / app icon — the tidy-stack monogram on evergreen. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#1f3a2e",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 6,
          padding: "0 16px",
        }}
      >
        <div style={{ height: 6, borderRadius: 3, backgroundColor: "#fbf8f2" }} />
        <div style={{ height: 6, width: "100%", borderRadius: 3, backgroundColor: "#6b8e72" }} />
        <div style={{ height: 6, width: "58%", borderRadius: 3, backgroundColor: "#bf9a4a" }} />
      </div>
    ),
    { ...size },
  );
}

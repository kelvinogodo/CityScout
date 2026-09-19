import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0d0d0d 0%, #292929 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 96,
            height: 8,
            background: "#b8860b",
            marginBottom: 40,
          }}
        />
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.1 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 36, marginTop: 28, color: "#d4d4d4" }}>
          Find a home you&apos;ll be proud to own
        </div>
        <div style={{ fontSize: 28, marginTop: 56, color: "#a3a3a3" }}>
          Abakaliki · Ebonyi State · Nigeria
        </div>
      </div>
    ),
    size,
  );
}

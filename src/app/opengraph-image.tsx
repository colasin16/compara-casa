import { ImageResponse } from "next/og";

import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/translate";
import { SITE_NAME, THEME_COLOR } from "@/lib/seo";

const { metadata } = getDictionary(defaultLocale);

export const alt = metadata.ogImageAlt;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Social share card shown when a link to the site is shared.
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
          padding: 80,
          background:
            "linear-gradient(135deg, #04130d 0%, #062a1d 55%, #00855a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: THEME_COLOR,
              borderRadius: 24,
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: -3,
            }}
          >
            CC
          </div>
          <span style={{ fontSize: 44, fontWeight: 700 }}>{SITE_NAME}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            Compare houses &amp; flats with weighted criteria
          </span>
          <span style={{ fontSize: 36, color: "#a7f3d0", maxWidth: 900 }}>
            Score, checklist and pros &amp; cons — ranked side by side so you can
            decide with confidence.
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

import { THEME_COLOR } from "@/lib/seo";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Apple touch icon — brand monogram on the primary green with rounded padding.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: THEME_COLOR,
          color: "#ffffff",
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: -6,
        }}
      >
        CC
      </div>
    ),
    { ...size },
  );
}

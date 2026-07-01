import { ImageResponse } from "next/og";

import { THEME_COLOR } from "@/lib/seo";

export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

// App icon — brand monogram on the primary green.
export default function Icon() {
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
          fontSize: 280,
          fontWeight: 800,
          letterSpacing: -16,
        }}
      >
        CC
      </div>
    ),
    { ...size },
  );
}

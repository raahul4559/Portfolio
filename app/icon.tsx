import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * A monogram rather than a shrunken logo — legible at 16px, which almost
 * nothing else on the site needs to be.
 */
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
          background: "#0e0e0e",
          border: "2px solid #1f1f1f",
          borderRadius: 6,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 20,
            fontWeight: 700,
            color: "#ffb020",
          }}
        >
          r
        </span>
      </div>
    ),
    { ...size },
  );
}

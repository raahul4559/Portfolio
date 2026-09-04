import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background: "#0e0e0e",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 100,
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

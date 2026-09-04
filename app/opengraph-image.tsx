import { ImageResponse } from "next/og";

import { profile, systemStats } from "@/content";
import { loadMonoFont } from "@/lib/og-font";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = {
  bg: "#0e0e0e",
  text: "#ededed",
  muted: "#7a7a7a",
  faint: "#4a4a4a",
  border: "#1f1f1f",
  accent: "#ffb020",
};

/**
 * The default share card — used for the readme and any route without a more
 * specific one. Built from the same chrome vocabulary as the site itself
 * (hairline frame, mono system line, accent dot) rather than a separate
 * "marketing" treatment, so a shared link looks like it came from the OS.
 */
export default async function Image() {
  const [regular, bold] = await Promise.all([
    loadMonoFont(500),
    loadMonoFont(700),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: INK.bg,
          padding: 64,
          fontFamily: "JetBrains Mono",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 24,
            color: INK.muted,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: INK.accent,
              display: "flex",
            }}
          />
          <span style={{ color: INK.text, fontWeight: 700 }}>
            {profile.host}
          </span>
          <span>v{profile.version}</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 84,
              color: INK.text,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            {profile.name}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: INK.muted }}>
            {profile.positioning}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${INK.border}`,
            paddingTop: 28,
            fontSize: 24,
            color: INK.faint,
          }}
        >
          <span>{profile.role}</span>
          <span>
            {systemStats.projects} projects · {profile.location}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 500, style: "normal" },
        { name: "JetBrains Mono", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}

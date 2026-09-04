import { ImageResponse } from "next/og";

import { getProject, profile, projects } from "@/content";
import { loadMonoFont } from "@/lib/og-font";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const INK = {
  bg: "#0e0e0e",
  text: "#ededed",
  muted: "#7a7a7a",
  faint: "#4a4a4a",
  border: "#1f1f1f",
  accent: "#ffb020",
  ok: "#59c07b",
};

/**
 * Per-project share card. Same frame as the site default, but carries the
 * project's own name, tagline, and stack — so a link posted for one project
 * doesn't read as generic portfolio noise in a feed.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
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
            fontSize: 22,
            color: INK.faint,
          }}
        >
          <span style={{ color: INK.muted }}>{profile.host}</span>
          <span>/projects/{slug}.md</span>
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
              alignItems: "center",
              gap: 16,
              fontSize: 80,
              color: INK.text,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            {project?.name ?? slug}
            {project?.status === "live" && (
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: INK.ok,
                  display: "flex",
                }}
              />
            )}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: INK.muted }}>
            {project?.tagline ?? "Project write-up"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${INK.border}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {(project?.stack ?? []).slice(0, 4).map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  fontSize: 22,
                  color: INK.muted,
                  border: `1px solid ${INK.border}`,
                  borderRadius: 4,
                  padding: "6px 14px",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: INK.faint }}>
            {project?.year ?? ""}
          </div>
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

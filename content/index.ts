import { modules } from "./modules";
import { now } from "./now";
import { profile } from "./profile";
import { projects } from "./projects";
import { stack, stackItemCount } from "./stack";
import { timeline } from "./timeline";
import type { IndexEntry, VDir, VNode } from "./types";

export * from "./types";
export { modules, moduleByRoute, moduleById } from "./modules";
export { now } from "./now";
export { profile } from "./profile";
export { projects, featuredProjects, getProject } from "./projects";
export { stack, stackItemCount } from "./stack";
export { timeline } from "./timeline";

/**
 * Byte counts are derived from the actual content so `ls -l` reports something
 * true rather than a decorative number.
 */
function weigh(...parts: (string | string[] | undefined)[]): number {
  return parts.reduce<number>((n, part) => {
    if (!part) return n;
    return n + (Array.isArray(part) ? part.join(" ").length : part.length);
  }, 0);
}

function countFiles(node: VNode): number {
  if (node.type === "file") return 1;
  return node.children.reduce((n, c) => n + countFiles(c), 0);
}

/**
 * The virtual filesystem. This is not a hand-written fixture — it is projected
 * from the same objects the pages render, so the terminal can never drift out
 * of sync with the site.
 */
export const filesystem: VDir = {
  type: "dir",
  name: "~",
  children: [
    {
      type: "file",
      name: "readme.md",
      kind: "readme",
      route: "/",
      size: weigh(profile.positioning, profile.bio, profile.currently),
    },
    {
      type: "dir",
      name: "projects",
      children: projects.map((p) => ({
        type: "file" as const,
        name: `${p.slug}.ts`,
        kind: "project" as const,
        ref: p.slug,
        route: `/projects/${p.slug}`,
        size: weigh(
          p.description,
          p.problem,
          p.solution,
          p.features,
          p.challenges,
          p.results,
          p.retro,
        ),
      })),
    },
    {
      type: "file",
      name: "skills.md",
      kind: "stack",
      route: "/stack",
      size: weigh(...stack.map((g) => g.items.map((i) => i.note).join(""))),
    },
    {
      type: "file",
      name: "timeline.log",
      kind: "timeline",
      route: "/timeline",
      size: weigh(...timeline.map((t) => t.bullets.join(""))),
    },
    {
      type: "file",
      name: "contact.md",
      kind: "contact",
      route: "/contact",
      size: weigh(profile.email, profile.availability.detail),
    },
    {
      type: "file",
      name: "resume.pdf",
      kind: "resume",
      route: profile.resume,
      size: 84_213,
    },
    {
      type: "dir",
      name: "dev",
      children: [
        {
          type: "file",
          name: "now",
          kind: "now",
          route: "/dev/now",
          size: weigh(
            now.note,
            now.focus.map((f) => f.value),
            now.preferences,
            now.principles,
            now.favoriteTech.map((f) => f.note),
            now.experiments.map((e) => e.note),
          ),
        },
      ],
    },
  ],
};

/** Flat index backing the command palette and terminal completion. */
export const searchIndex: IndexEntry[] = [
  ...modules.map<IndexEntry>((m) => ({
    id: `module:${m.id}`,
    type: "module",
    title: m.label,
    subtitle: m.description,
    route: m.route,
    keywords: [m.file, m.code.toLowerCase(), ...m.keywords],
  })),
  ...projects.map<IndexEntry>((p) => ({
    id: `project:${p.slug}`,
    type: "project",
    title: p.name,
    subtitle: p.description,
    route: `/projects/${p.slug}`,
    keywords: [p.slug, p.year, p.status, p.role, ...p.technologies],
  })),
];

/**
 * Counts the boot sequence reports. Derived, so the boot screen is describing
 * the actual site rather than performing a loading animation.
 */
export const systemStats = {
  projects: projects.length,
  stackDomains: stack.length,
  stackItems: stackItemCount,
  timelineEntries: timeline.length,
  timelineSpan: `${timeline[timeline.length - 1]?.from ?? ""} → ${
    timeline[0]?.to === "present" ? "now" : (timeline[0]?.to ?? "")
  }`,
  modules: modules.length,
  files: countFiles(filesystem),
};

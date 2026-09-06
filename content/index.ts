import { contributionYears, githubProjects, recentActivity, streaks } from "./github.generated";
import { modules } from "./modules";
import { now } from "./now";
import { profile } from "./profile";
import { stack, stackItemCount } from "./stack";
import { timeline } from "./timeline";
import type { IndexEntry, Project, VDir, VNode } from "./types";

export * from "./types";
export { modules, moduleByRoute, moduleById } from "./modules";
export { now } from "./now";
export { profile } from "./profile";
export { stack, stackItemCount } from "./stack";
export { timeline } from "./timeline";
export {
  activityStats,
  contributionYears,
  githubProfile,
  recentActivity,
  streaks,
} from "./github.generated";

/**
 * Every project on the site — real GitHub repositories, synced at build
 * time by `scripts/sync-github.ts`. There is no hand-written fallback list:
 * once real data exists, showing anything else would be showing something
 * false. See content/featured.ts to control which repos headline the site,
 * and content/project-stories.ts to give one a real narrative.
 */
export const projects: Project[] = githubProjects;

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * The recruiter/quick-view page's skill chips — derived from the same honest
 * ratings `skills.md` shows in full, not a separate curated list that could
 * drift from them. Level 5s first, then 4s, capped at ten so it reads in one
 * glance instead of restating the whole page.
 */
export const topSkills = stack
  .flatMap((group) => group.items)
  .filter((item) => item.level >= 4)
  .sort((a, b) => b.level - a.level)
  .slice(0, 10)
  .map((item) => item.name);

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
      type: "dir",
      name: "activity",
      children: [
        {
          type: "file",
          name: "contributions",
          kind: "activity",
          ref: "contributions",
          route: "/activity",
          size: weigh(
            contributionYears.map((y) => `${y.year}:${y.total}`),
            streaks ? `${streaks.current}:${streaks.longest}` : "",
          ),
        },
        {
          type: "file",
          name: "timeline",
          kind: "activity",
          ref: "timeline",
          route: "/activity/timeline",
          size: weigh(recentActivity.map((a) => a.title)),
        },
        {
          type: "file",
          name: "insights",
          kind: "activity",
          ref: "insights",
          route: "/activity/insights",
          size: weigh(projects.flatMap((p) => p.github?.languages ?? [])),
        },
      ],
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

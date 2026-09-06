import type { OSModule } from "./types";

/**
 * The module registry. Order here is the order in the rail and the tab
 * cycle. Adding a module means adding an entry plus a matching route.
 */
export const modules: OSModule[] = [
  {
    id: "readme",
    code: "RE",
    label: "readme",
    file: "readme.md",
    route: "/",
    description: "Who I am and what I build",
    keywords: ["home", "about", "intro", "bio", "start"],
  },
  {
    id: "projects",
    code: "PR",
    label: "projects",
    file: "projects/",
    route: "/projects",
    description: "Selected work, with the parts that went wrong",
    keywords: ["work", "case study", "portfolio", "builds", "shipped"],
  },
  {
    id: "stack",
    code: "SK",
    label: "skills",
    file: "skills.md",
    route: "/stack",
    description: "Tools, honestly rated",
    keywords: ["stack", "tech", "tools", "languages", "proficiency"],
  },
  {
    id: "timeline",
    code: "XP",
    label: "experience",
    file: "timeline.log",
    route: "/timeline",
    description: "Where I've worked and what changed",
    keywords: ["timeline", "history", "cv", "career", "jobs", "log"],
  },
  {
    id: "activity",
    code: "AC",
    label: "activity",
    file: "activity/",
    route: "/activity",
    description: "Real GitHub contribution activity — heatmap, streaks, recent commits",
    keywords: [
      "contributions",
      "insights",
      "heatmap",
      "streak",
      "commits",
      "pull requests",
      "issues",
      "github activity",
    ],
  },
  {
    id: "contact",
    code: "CT",
    label: "contact",
    file: "contact.md",
    route: "/contact",
    description: "Email, socials, availability",
    keywords: ["email", "hire", "reach", "get in touch", "available"],
  },
  {
    id: "now",
    code: "NW",
    label: "now",
    file: "dev/now",
    route: "/dev/now",
    description: "What I'm building, learning, and open to — right now",
    keywords: ["now page", "currently", "status", "focus", "building", "learning", "today"],
  },
];

export const moduleByRoute = new Map(modules.map((m) => [m.route, m]));
export const moduleById = new Map(modules.map((m) => [m.id, m]));

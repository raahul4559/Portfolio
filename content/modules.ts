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
    file: "stack.md",
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
    id: "contact",
    code: "CT",
    label: "contact",
    file: "contact.md",
    route: "/contact",
    description: "Email, socials, availability",
    keywords: ["email", "hire", "reach", "get in touch", "available"],
  },
];

export const moduleByRoute = new Map(modules.map((m) => [m.route, m]));
export const moduleById = new Map(modules.map((m) => [m.id, m]));

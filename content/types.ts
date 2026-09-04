/**
 * The type contract for the entire OS.
 *
 * Every surface — rail, tabs, command palette, terminal filesystem, routes,
 * and OG images — is derived from objects shaped by these interfaces. Adding
 * a project means adding one `Project`; it then appears everywhere at once.
 */

export type ModuleId = "readme" | "projects" | "stack" | "timeline" | "contact";

export interface OSModule {
  id: ModuleId;
  /** Two-letter code shown in the collapsed rail. */
  code: string;
  /** Lowercase label used in the rail and palette. */
  label: string;
  /** Filename shown in the tab strip — this is the "document" metaphor. */
  file: string;
  route: string;
  /** One-line description used in the palette and page metadata. */
  description: string;
  /** Extra terms the palette should match on. */
  keywords: string[];
}

export type ProjectStatus = "live" | "archived" | "wip" | "internal";

/**
 * Deliberately shaped to be printed almost verbatim as the file's own source
 * — the project *is* this object; the UI never invents content the object
 * doesn't have. Chrome-only facts (slug, year, status, featured) live outside
 * it because a real config object wouldn't describe its own filename or the
 * curation logic that lists it.
 */
export interface Project {
  slug: string;
  year: string;
  status: ProjectStatus;
  /** Featured projects surface in the README's "selected work". Keep to 3. */
  featured: boolean;

  name: string;
  /** One or two sentences. Doubles as the list-row blurb and OG description. */
  description: string;
  problem: string;
  /** Ordered steps — how the problem was actually approached. */
  solution: string[];
  role: string;
  technologies: string[];
  /** What the thing does, from a user's seat — not how it was built. */
  features: string[];
  /** Concrete technical obstacles, not generic "it was hard." */
  challenges: string[];
  /** Outcomes with numbers where there are real numbers to give. */
  results: string[];
  /** Image paths. Empty is fine and renders an honest placeholder — never faked. */
  screenshots: string[];
  links: {
    live?: string;
    github?: string;
  };
  /** Optional honesty note — what you'd do differently. Recruiters notice. */
  retro?: string;
}

export interface StackItem {
  name: string;
  /** 1–5, rendered as five blocks. Be honest; 5 means you'd teach it. */
  level: 1 | 2 | 3 | 4 | 5;
  years: string;
  note: string;
}

export interface StackGroup {
  id: string;
  label: string;
  blurb: string;
  items: StackItem[];
}

export type TimelineKind = "work" | "education" | "project" | "milestone";

export interface TimelineEntry {
  id: string;
  from: string;
  /** "present" renders as a live marker. */
  to: string;
  org: string;
  role: string;
  kind: TimelineKind;
  location?: string;
  bullets: string[];
  stack?: string[];
}

export interface Social {
  label: string;
  handle: string;
  href: string;
}

export interface Profile {
  /** Shell username — appears in the terminal prompt as `handle@rahul.os`. */
  handle: string;
  /** Hostname — the OS wordmark. */
  host: string;
  version: string;
  name: string;
  role: string;
  /** The single sentence that positions you. Make it specific. */
  positioning: string;
  bio: string[];
  location: string;
  /** IANA zone — drives the live clock and the availability indicator. */
  timezone: string;
  timezoneLabel: string;
  experience: string;
  availability: {
    state: "open" | "selective" | "closed";
    label: string;
    detail: string;
    responseTime: string;
  };
  email: string;
  resume: string;
  socials: Social[];
  currently: string[];
}

/* ── Virtual filesystem, derived from the content above ─────────────── */

export type VFileKind =
  | "readme"
  | "project"
  | "stack"
  | "timeline"
  | "contact"
  | "resume";

export interface VFile {
  type: "file";
  name: string;
  kind: VFileKind;
  /** Slug for `kind: "project"`; unused otherwise. */
  ref?: string;
  /** Bytes — fabricated but stable, so `ls -l` looks right. */
  size: number;
  route?: string;
}

export interface VDir {
  type: "dir";
  name: string;
  children: VNode[];
}

export type VNode = VFile | VDir;

/* ── Search / palette index ─────────────────────────────────────────── */

export interface IndexEntry {
  id: string;
  type: "module" | "project";
  title: string;
  subtitle: string;
  route: string;
  keywords: string[];
}

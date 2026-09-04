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

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  /** One line, shown on row hover in the projects table. */
  tagline: string;
  year: string;
  role: string;
  status: ProjectStatus;
  /** Featured projects surface in the README's "selected work". Keep to 3. */
  featured: boolean;
  stack: string[];
  /** One or two sentences. Used in listings and OG descriptions. */
  summary: string;
  context: string;
  problem: string;
  approach: string[];
  outcome: string;
  metrics: Metric[];
  links: ProjectLink[];
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

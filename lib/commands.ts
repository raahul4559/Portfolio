import {
  filesystem,
  getProject,
  modules,
  now,
  profile,
  projects,
  stack,
  systemStats,
  timeline,
} from "@/content";
import type { VDir, VNode } from "@/content/types";
import {
  displayName,
  formatSize,
  listDir,
  resolveNode,
  resolvePath,
  stripExt,
} from "./fs";
import type { Theme } from "./theme";

export type Tone = "text" | "muted" | "faint" | "ok" | "warn" | "err" | "accent";

export interface Span {
  text: string;
  tone?: Tone;
}

/**
 * Terminal output is structured, not a string of pre-formatted text. That lets
 * `cat` return a real card and `ls` return a real grid, while keeping the
 * command layer free of any JSX.
 */
export type Block =
  | { type: "echo"; cwd: string; input: string }
  | { type: "lines"; lines: Span[] }
  | { type: "grid"; items: Span[] }
  | { type: "kv"; rows: { k: string; v: string; tone?: Tone }[] }
  | {
      type: "card";
      title: string;
      subtitle: string;
      rows: { k: string; v: string }[];
      body: string;
      route: string;
    }
  | { type: "sysinfo"; rows: { k: string; v: string }[] };

export interface CommandContext {
  cwd: string;
  setCwd: (path: string) => void;
  navigate: (route: string) => void;
  setTheme: (theme: Theme) => void;
  clear: () => void;
  close: () => void;
  history: string[];
}

interface CommandSpec {
  name: string;
  usage: string;
  summary: string;
  /** Real and executable, but left out of `help` and tab-completion. */
  hidden?: boolean;
  run: (args: string[], ctx: CommandContext) => Block[];
}

/**
 * The name in the prompt. Deliberately not `profile.handle` — this is a
 * guest shell on *my* machine, not a recording of my own session, so the
 * visitor is who's logged in. `whoami` still resolves to me, because it's my
 * OS answering, not the visitor's own identity.
 */
export const SHELL_USER = "visitor";

/** Old names keep working; only the canonical name shows up in `help`. */
const ALIASES: Record<string, string> = {
  stack: "skills",
  timeline: "experience",
};

const text = (value: string, tone: Tone = "text"): Block => ({
  type: "lines",
  lines: [{ text: value, tone }],
});

const lines = (values: Span[]): Block => ({ type: "lines", lines: values });

const error = (value: string): Block => text(value, "err");

/** The `/dev/now` focus table, plus availability read live from `profile` so
 *  the terminal and the page can never quietly disagree with each other. */
function nowRows(): { k: string; v: string }[] {
  return [
    ...now.focus.map((f) => ({ k: f.label.toLowerCase(), v: f.value })),
    { k: "open to", v: profile.availability.label },
  ];
}

/** `open` accepts anything a human might reasonably type at it. */
function resolveTarget(target: string): string | null {
  const q = target.toLowerCase().replace(/\/$/, "");

  const mod = modules.find(
    (m) =>
      m.id === q ||
      m.label === q ||
      m.code.toLowerCase() === q ||
      m.file === q ||
      stripExt(m.file) === q,
  );
  if (mod) return mod.route;

  const project = projects.find(
    (p) => p.slug === q || p.name.toLowerCase() === q || stripExt(q) === p.slug,
  );
  if (project) return `/projects/${project.slug}`;

  const node = resolveNode(resolvePath("~", target));
  if (node?.type === "file" && node.route) return node.route;

  return null;
}

/** Display order for `help`'s primary block — independent of definition order. */
const PRIMARY_HELP_ORDER = [
  "help",
  "whoami",
  "now",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
  "github",
  "resume",
  "recruiter",
  "clear",
  "date",
  "status",
];

const COMMANDS: CommandSpec[] = [
  {
    name: "help",
    usage: "help",
    summary: "Show this help",
    run: () => {
      const byName = new Map(COMMANDS.map((c) => [c.name, c]));
      const primary = PRIMARY_HELP_ORDER.map((name) => byName.get(name)).filter(
        (c): c is CommandSpec => Boolean(c),
      );
      const filesystem = COMMANDS.filter(
        (c) => !c.hidden && !PRIMARY_HELP_ORDER.includes(c.name),
      );

      return [
        text("Available commands:", "muted"),
        { type: "kv", rows: primary.map((c) => ({ k: c.name, v: c.summary })) },
        lines([{ text: "" }, { text: "Filesystem", tone: "faint" }]),
        { type: "kv", rows: filesystem.map((c) => ({ k: c.usage, v: c.summary })) },
        lines([
          { text: "" },
          {
            text: "Keyboard: ⌘K palette · ` terminal · ? shortcuts",
            tone: "faint",
          },
          { text: "There are a few more commands than this. Good luck.", tone: "faint" },
        ]),
      ];
    },
  },

  {
    name: "ls",
    usage: "ls [-l] [path]",
    summary: "List directory contents",
    run: (args, ctx) => {
      const long = args.includes("-l");
      const target = args.find((a) => !a.startsWith("-"));
      const path = resolvePath(ctx.cwd, target);
      const node = resolveNode(path);

      if (!node) return [error(`ls: ${target ?? path}: no such file or directory`)];
      if (node.type === "file") {
        return [{ type: "grid", items: [{ text: node.name }] }];
      }

      const children = listDir(node);
      if (long) {
        return [
          {
            type: "kv",
            rows: children.map((child) => ({
              k: displayName(child),
              v:
                child.type === "dir"
                  ? `${child.children.length} items`
                  : formatSize(child.size),
            })),
          },
        ];
      }

      return [
        {
          type: "grid",
          items: children.map((child) => ({
            text: displayName(child),
            tone: child.type === "dir" ? ("accent" as const) : ("text" as const),
          })),
        },
      ];
    },
  },

  {
    name: "cd",
    usage: "cd [path]",
    summary: "Change directory",
    run: (args, ctx) => {
      const path = resolvePath(ctx.cwd, args[0]);
      const node = resolveNode(path);
      if (!node) return [error(`cd: ${args[0]}: no such file or directory`)];
      if (node.type === "file") return [error(`cd: ${args[0]}: not a directory`)];
      ctx.setCwd(path);
      return [];
    },
  },

  {
    name: "pwd",
    usage: "pwd",
    summary: "Print working directory",
    run: (_args, ctx) => [text(ctx.cwd, "muted")],
  },

  {
    name: "cat",
    usage: "cat <file>",
    summary: "Read a document",
    run: (args, ctx) => {
      if (!args[0]) return [error("cat: missing operand")];
      const node = resolveNode(resolvePath(ctx.cwd, args[0]));
      if (!node) return [error(`cat: ${args[0]}: no such file or directory`)];
      if (node.type === "dir") return [error(`cat: ${args[0]}: is a directory`)];
      return renderFile(node.kind, node.ref);
    },
  },

  {
    name: "open",
    usage: "open <module|project>",
    summary: "Open a document in the pane",
    run: (args, ctx) => {
      if (!args[0]) return [error("open: missing operand")];
      const route = resolveTarget(args[0]);
      if (!route) return [error(`open: ${args[0]}: unknown target`)];
      ctx.navigate(route);
      return [text(`opening ${route}`, "faint")];
    },
  },

  {
    name: "whoami",
    usage: "whoami",
    summary: "Who you're talking to",
    run: () => [
      lines([
        { text: profile.name },
        { text: profile.role, tone: "muted" },
        { text: "" },
        { text: profile.positioning, tone: "muted" },
      ]),
      {
        type: "kv",
        rows: [
          { k: "location", v: `${profile.location} · ${profile.timezoneLabel}` },
          { k: "experience", v: profile.experience },
          { k: "status", v: profile.availability.label },
          { k: "email", v: profile.email },
        ],
      },
    ],
  },

  {
    name: "now",
    usage: "now",
    summary: "What I'm doing right now",
    run: () => [
      { type: "kv", rows: nowRows() },
      text(`updated ${now.updated} — open dev/now for the rest`, "faint"),
    ],
  },

  {
    name: "about",
    usage: "about",
    summary: "Learn about me",
    run: (_args, ctx) => {
      ctx.navigate("/");
      return [text("opening ~/readme.md", "faint")];
    },
  },

  {
    name: "projects",
    usage: "projects",
    summary: "Explore my projects",
    run: () => [
      {
        type: "kv",
        rows: projects.map((p) => ({
          k: p.slug,
          v: `${p.year}  ${p.description}`,
        })),
      },
      text("cat projects/<name> for the full source", "faint"),
    ],
  },

  {
    name: "skills",
    usage: "skills",
    summary: "View my technical skills",
    run: () => [
      {
        type: "kv",
        rows: stack.map((group) => ({
          k: group.label.toLowerCase(),
          v: group.items.map((i) => i.name).join(", "),
        })),
      },
      text("open skills for ratings and notes", "faint"),
    ],
  },

  {
    name: "experience",
    usage: "experience",
    summary: "View my experience",
    run: () => [
      {
        type: "kv",
        rows: timeline.map((entry) => ({
          k: `${entry.from}–${entry.to === "present" ? "now" : entry.to}`,
          v: `${entry.role} · ${entry.org}`,
        })),
      },
      text("open experience for the full timeline", "faint"),
    ],
  },

  {
    name: "contact",
    usage: "contact",
    summary: "Get in touch",
    run: () => [
      {
        type: "kv",
        rows: [
          { k: "email", v: profile.email },
          ...profile.socials.map((s) => ({ k: s.label, v: s.href })),
          { k: "status", v: profile.availability.label },
          { k: "replies", v: profile.availability.responseTime },
        ],
      },
    ],
  },

  {
    name: "github",
    usage: "github",
    summary: "Open GitHub",
    run: (_args, ctx) => {
      const gh = profile.socials.find((s) => s.label === "github");
      if (!gh) return [error("github: no link configured")];
      ctx.navigate(gh.href);
      return [text(`opening ${gh.href}`, "faint")];
    },
  },

  {
    name: "resume",
    usage: "resume",
    summary: "View my resume",
    run: (_args, ctx) => {
      ctx.navigate(profile.resume);
      return [text(`opening ${profile.resume}`, "faint")];
    },
  },

  {
    name: "recruiter",
    usage: "recruiter",
    summary: "Fast summary — top projects, experience, contact",
    run: (_args, ctx) => {
      ctx.navigate("/recruiter");
      return [text("opening /recruiter — the 30-second version", "faint")];
    },
  },

  {
    name: "date",
    usage: "date",
    summary: "Current date and time",
    run: () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: profile.timezone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(now);
      return [text(`${formatted} ${profile.timezoneLabel}`, "muted")];
    },
  },

  {
    name: "status",
    usage: "status",
    summary: "Availability and system status",
    run: () => [
      {
        type: "kv",
        rows: [
          { k: "availability", v: profile.availability.label },
          { k: "responds in", v: profile.availability.responseTime },
          { k: "location", v: `${profile.location} · ${profile.timezoneLabel}` },
          { k: "shell", v: "os-sh — online" },
        ],
      },
    ],
  },

  {
    name: "theme",
    usage: "theme [ink|paper]",
    summary: "Switch the palette",
    run: (args) => {
      const requested = args[0];
      if (!requested) return [text("usage: theme ink | theme paper", "faint")];
      if (requested !== "ink" && requested !== "paper") {
        return [error(`theme: ${requested}: expected 'ink' or 'paper'`)];
      }
      return [{ type: "lines", lines: [{ text: `theme → ${requested}`, tone: "faint" }] }];
    },
  },

  {
    name: "history",
    usage: "history",
    summary: "Show this session's commands",
    run: (_args, ctx) =>
      ctx.history.length
        ? [
            {
              type: "kv",
              rows: ctx.history.map((entry, i) => ({
                k: String(i + 1).padStart(3, " "),
                v: entry,
              })),
            },
          ]
        : [text("no history yet", "faint")],
  },

  {
    name: "neofetch",
    usage: "neofetch",
    summary: "System summary",
    run: () => [
      {
        type: "sysinfo",
        rows: [
          { k: "host", v: `${profile.host} v${profile.version}` },
          { k: "user", v: SHELL_USER },
          { k: "role", v: profile.role },
          { k: "uptime", v: profile.experience },
          { k: "modules", v: String(systemStats.modules) },
          { k: "projects", v: String(systemStats.projects) },
          { k: "tools", v: `${systemStats.stackItems} in ${systemStats.stackDomains} domains` },
          { k: "history", v: `${systemStats.timelineEntries} entries · ${systemStats.timelineSpan}` },
          { k: "shell", v: "os-sh" },
          { k: "location", v: profile.location },
        ],
      },
    ],
  },

  {
    name: "clear",
    usage: "clear",
    summary: "Clear terminal",
    run: (_args, ctx) => {
      ctx.clear();
      return [];
    },
  },

  {
    name: "echo",
    usage: "echo <text>",
    summary: "Print text",
    run: (args) => [text(args.join(" "), "muted")],
  },

  {
    name: "sudo",
    usage: "sudo <command>",
    summary: "Elevate privileges",
    run: (args) => {
      if (args.join(" ") === "hire-me") {
        return [
          text("Checking candidate...", "muted"),
          lines([
            { text: "" },
            dotLine("Skills"),
            dotLine("Experience"),
            dotLine("Projects"),
            dotLine("Coffee"),
            { text: "" },
            { text: "Result: Highly recommended.", tone: "ok" },
          ]),
        ];
      }

      return [
        lines([
          { text: `${SHELL_USER} is not in the sudoers file.`, tone: "err" },
          { text: "This incident has been reported.", tone: "faint" },
          { text: "" },
          { text: "(It hasn't. There's no server. Try 'help'.)", tone: "faint" },
        ]),
      ];
    },
  },

  {
    name: "matrix",
    usage: "matrix",
    summary: "???",
    hidden: true,
    run: () => [
      lines([
        { text: "Entering developer mode...", tone: "accent" },
        { text: "Wake up, visitor. The build passed.", tone: "faint" },
      ]),
    ],
  },

  {
    name: "coffee",
    usage: "coffee",
    summary: "???",
    hidden: true,
    run: () => [
      lines([
        { text: "☕ brewing...", tone: "muted" },
        { text: "Productivity restored.", tone: "faint" },
      ]),
    ],
  },

  {
    name: "exit",
    usage: "exit",
    summary: "Close the terminal",
    run: (_args, ctx) => {
      ctx.close();
      return [];
    },
  },
];

/** Tab-completion and typo-suggestion candidates — hidden commands opt out. */
export const COMMAND_NAMES = COMMANDS.filter((c) => !c.hidden).map((c) => c.name);

/** `Label ............. ✓` — the same dot-leader the boot sequence uses. */
function dotLine(label: string, width = 22): Span {
  const dots = ".".repeat(Math.max(3, width - label.length));
  return { text: `${label} ${dots} ✓`, tone: "text" };
}

/** Commands that take a path as their first argument, for tab completion. */
export const PATH_COMMANDS = new Set(["ls", "cd", "cat", "open"]);

function renderFile(kind: string, ref?: string): Block[] {
  switch (kind) {
    case "project": {
      const project = ref ? getProject(ref) : undefined;
      if (!project) return [error("cat: unreadable")];
      return [
        {
          type: "card",
          title: project.name,
          subtitle: project.role,
          rows: [
            { k: "year", v: project.year },
            { k: "status", v: project.status },
            { k: "technologies", v: project.technologies.join(" · ") },
          ],
          body: project.description,
          route: `/projects/${project.slug}`,
        },
        text(`open ${project.slug} for the full source`, "faint"),
      ];
    }

    case "readme":
      return [
        lines([
          { text: `# ${profile.name}` },
          { text: profile.role, tone: "muted" },
          { text: "" },
          ...profile.bio.map((paragraph) => ({
            text: paragraph,
            tone: "muted" as const,
          })),
        ]),
      ];

    case "stack":
      return [
        {
          type: "kv",
          rows: stack.flatMap((group) =>
            group.items.map((item) => ({
              k: item.name,
              v: `${"▮".repeat(item.level)}${"▯".repeat(5 - item.level)}  ${item.years}  ${item.note}`,
            })),
          ),
        },
      ];

    case "timeline":
      return [
        {
          type: "kv",
          rows: timeline.map((entry) => ({
            k: `${entry.from}–${entry.to === "present" ? "now" : entry.to}`,
            v: `${entry.role} · ${entry.org}`,
          })),
        },
      ];

    case "contact":
      return [
        {
          type: "kv",
          rows: [
            { k: "email", v: profile.email },
            ...profile.socials.map((s) => ({ k: s.label, v: s.handle })),
          ],
        },
      ];

    case "resume":
      return [text("resume.pdf is a binary file. Run 'resume' to open it.", "faint")];

    case "now":
      return [{ type: "kv", rows: nowRows() }];

    default:
      return [error("cat: unknown file type")];
  }
}

/**
 * Parses and dispatches one line. Returns the blocks to append; side effects
 * (navigation, theme, clearing) happen through the context.
 */
export function execute(input: string, ctx: CommandContext): Block[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  const [rawName, ...args] = trimmed.split(/\s+/);
  const name = ALIASES[rawName] ?? rawName;
  const command = COMMANDS.find((c) => c.name === name);

  if (!command) {
    const suggestion = COMMAND_NAMES.find((c) => c.startsWith(name[0] ?? ""));
    return [
      lines([
        { text: `${name}: command not found`, tone: "err" },
        {
          text: suggestion ? `did you mean '${suggestion}'? try 'help'` : "try 'help'",
          tone: "faint",
        },
      ]),
    ];
  }

  // `theme` needs the store, which the command layer deliberately can't see —
  // so the effect is applied here where the context is available.
  if (command.name === "theme" && (args[0] === "ink" || args[0] === "paper")) {
    ctx.setTheme(args[0]);
  }

  return command.run(args, ctx);
}

export function rootDir(): VDir {
  return filesystem;
}

export function isDirNode(node: VNode): node is VDir {
  return node.type === "dir";
}

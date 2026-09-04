import {
  filesystem,
  getProject,
  modules,
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
  run: (args: string[], ctx: CommandContext) => Block[];
}

const text = (value: string, tone: Tone = "text"): Block => ({
  type: "lines",
  lines: [{ text: value, tone }],
});

const lines = (values: Span[]): Block => ({ type: "lines", lines: values });

const error = (value: string): Block => text(value, "err");

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

const COMMANDS: CommandSpec[] = [
  {
    name: "help",
    usage: "help",
    summary: "List every command",
    run: () => [
      text("Available commands. Paths accept ~, .. and tab completion.", "faint"),
      {
        type: "kv",
        rows: COMMANDS.map((c) => ({ k: c.usage, v: c.summary })),
      },
      lines([
        { text: "" },
        { text: "Keyboard: ⌘K palette · ` terminal · ? shortcuts", tone: "faint" },
      ]),
    ],
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
    summary: "Short bio",
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
    name: "projects",
    usage: "projects",
    summary: "List projects with status",
    run: () => [
      {
        type: "kv",
        rows: projects.map((p) => ({
          k: p.slug,
          v: `${p.year}  ${p.description}`,
        })),
      },
      text("cat projects/<name> for the full write-up", "faint"),
    ],
  },

  {
    name: "stack",
    usage: "stack",
    summary: "Tools by domain",
    run: () => [
      {
        type: "kv",
        rows: stack.map((group) => ({
          k: group.label.toLowerCase(),
          v: group.items.map((i) => i.name).join(", "),
        })),
      },
      text("open stack for ratings and notes", "faint"),
    ],
  },

  {
    name: "contact",
    usage: "contact",
    summary: "How to reach me",
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
    name: "resume",
    usage: "resume",
    summary: "Open the resume PDF",
    run: (_args, ctx) => {
      ctx.navigate(profile.resume);
      return [text(`opening ${profile.resume}`, "faint")];
    },
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
          { k: "user", v: profile.handle },
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
    summary: "Clear the screen",
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
    run: () => [
      lines([
        { text: `${profile.handle} is not in the sudoers file.`, tone: "err" },
        { text: "This incident has been reported.", tone: "faint" },
        { text: "" },
        { text: "(It hasn't. There's no server. Try 'help'.)", tone: "faint" },
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

export const COMMAND_NAMES = COMMANDS.map((c) => c.name);

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

  const [name, ...args] = trimmed.split(/\s+/);
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

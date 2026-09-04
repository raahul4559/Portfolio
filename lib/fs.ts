import { filesystem } from "@/content";
import type { VDir, VNode } from "@/content/types";

/**
 * Path handling for the terminal's virtual filesystem.
 *
 * The tree lives in `content/index.ts` and is projected from site content, so
 * everything here is pure traversal — no fixtures, no hardcoded listings.
 *
 * Paths are displayed the way a shell would show them: `~`, `~/projects`.
 * Internally a path is just an array of segments below the root.
 */

export const ROOT = "~";

/** `"~/projects"` → `["projects"]` */
export function toSegments(path: string): string[] {
  return path
    .replace(/^~\/?/, "")
    .split("/")
    .filter(Boolean);
}

/** `["projects"]` → `"~/projects"` */
export function toPath(segments: string[]): string {
  return segments.length ? `${ROOT}/${segments.join("/")}` : ROOT;
}

/**
 * Resolves an argument against a working directory, honouring `~`, absolute
 * `/`, `.`, and `..`. Returns the normalised display path.
 */
export function resolvePath(cwd: string, arg?: string): string {
  if (!arg || arg === "~" || arg === "/") return ROOT;

  const startsAtRoot = arg.startsWith("~") || arg.startsWith("/");
  const base = startsAtRoot ? [] : toSegments(cwd);
  const parts = arg.replace(/^[~/]+/, "").split("/").filter(Boolean);

  const out = [...base];
  for (const part of parts) {
    if (part === ".") continue;
    if (part === "..") out.pop();
    else out.push(part);
  }
  return toPath(out);
}

function isDir(node: VNode): node is VDir {
  return node.type === "dir";
}

/**
 * Walks to the node at `path`. Matches files with or without their extension,
 * so both `cat projects/relay` and `cat projects/relay.md` work — a small
 * convenience that makes the shell feel forgiving rather than pedantic.
 */
export function resolveNode(path: string): VNode | null {
  let node: VNode = filesystem;

  for (const segment of toSegments(path)) {
    if (!isDir(node)) return null;
    const children: VNode[] = node.children;
    const next: VNode | undefined =
      children.find((c) => c.name === segment) ??
      children.find((c) => stripExt(c.name) === segment);
    if (!next) return null;
    node = next;
  }
  return node;
}

export function stripExt(name: string): string {
  return name.replace(/\.[^.]+$/, "");
}

/** Directories first, then files; alphabetical within each group. */
export function listDir(dir: VDir): VNode[] {
  return [...dir.children].sort((a, b) => {
    if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export function displayName(node: VNode): string {
  return node.type === "dir" ? `${node.name}/` : node.name;
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}K`;
  return `${(bytes / 1024 / 1024).toFixed(1)}M`;
}

/**
 * Tab-completion candidates for a partially typed path. Returns full argument
 * strings so the caller can substitute the token directly.
 */
export function completePath(cwd: string, token: string): string[] {
  const slash = token.lastIndexOf("/");
  const dirPart = slash === -1 ? "" : token.slice(0, slash + 1);
  const namePart = slash === -1 ? token : token.slice(slash + 1);

  const dirNode = resolveNode(resolvePath(cwd, dirPart || "."));
  if (!dirNode || !isDir(dirNode)) return [];

  return listDir(dirNode)
    .filter((c) => c.name.startsWith(namePart) || stripExt(c.name).startsWith(namePart))
    .map((c) => dirPart + (c.type === "dir" ? `${c.name}/` : c.name));
}

/** Longest string that all candidates start with — standard shell behaviour. */
export function commonPrefix(values: string[]): string {
  if (values.length === 0) return "";
  let prefix = values[0];
  for (const value of values.slice(1)) {
    while (!value.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}

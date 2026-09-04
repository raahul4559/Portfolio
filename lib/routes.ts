import { getProject, moduleByRoute, modules } from "@/content";

/**
 * Routes are the unit of navigation, but the UI talks about *documents*. This
 * maps one to the other so tabs, the status bar, and the document title can
 * all describe a route the same way without each re-deriving it.
 */
export interface RouteDescriptor {
  /** Filename shown in the tab strip: `readme.md`, `relay.ts`. */
  file: string;
  /** Human label used in the palette and page title. */
  label: string;
  /** Shell-style path shown in the status bar: `~/projects/relay.ts`. */
  path: string;
  /** Which rail module owns this route — drives the rail's active state. */
  moduleId: string;
}

const PROJECTS_ROUTE = "/projects";

export function describeRoute(route: string): RouteDescriptor {
  const mod = moduleByRoute.get(route);
  if (mod) {
    return {
      file: mod.file,
      label: mod.label,
      path: mod.route === "/" ? `~/${mod.file}` : `~/${mod.file}`,
      moduleId: mod.id,
    };
  }

  if (route.startsWith(`${PROJECTS_ROUTE}/`)) {
    const slug = route.slice(PROJECTS_ROUTE.length + 1);
    const project = getProject(slug);
    return {
      file: `${slug}.ts`,
      label: project?.name ?? slug,
      path: `~/projects/${slug}.ts`,
      moduleId: "projects",
    };
  }

  return { file: "not-found", label: "not found", path: "~/?", moduleId: "" };
}

/** True for routes the OS knows how to render as a document. */
export function isKnownRoute(route: string): boolean {
  if (moduleByRoute.has(route)) return true;
  if (!route.startsWith(`${PROJECTS_ROUTE}/`)) return false;
  return Boolean(getProject(route.slice(PROJECTS_ROUTE.length + 1)));
}

/** Rail order, used by the ⌘1–⌘9 shortcuts and the tab cycle. */
export const moduleRoutes = modules.map((m) => m.route);

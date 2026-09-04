"use client";

import Link from "next/link";

import { modules } from "@/content";
import { describeRoute } from "@/lib/routes";
import { useOS } from "@/lib/store";

/**
 * The rail is deliberately typographic — two-letter monospace codes rather
 * than another set of borrowed icons. Active state is a 2px accent edge, the
 * only place the accent appears in the chrome.
 */
export function ModuleRail({ activeRoute }: { activeRoute: string }) {
  const railOpen = useOS((s) => s.railOpen);
  const toggleRail = useOS((s) => s.toggleRail);
  const activeModule = describeRoute(activeRoute).moduleId;

  return (
    <nav
      aria-label="Modules"
      style={{ width: railOpen ? "var(--w-rail-open)" : "var(--w-rail)" }}
      className="hair-r hidden shrink-0 flex-col justify-between transition-[width] duration-200 ease-[var(--ease-os)] md:flex"
    >
      <ul className="flex flex-col py-2">
        {modules.map((mod) => {
          const active = mod.id === activeModule;
          return (
            <li key={mod.id}>
              <Link
                href={mod.route}
                aria-current={active ? "page" : undefined}
                title={railOpen ? undefined : `${mod.label} — ${mod.description}`}
                className={`group relative flex h-11 items-center gap-3 pl-3 transition-colors duration-150 ${
                  active
                    ? "text-text bg-accent-tint"
                    : "text-faint hover:text-text hover:bg-surface-2"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute top-1.5 bottom-1.5 left-0 w-0.5 transition-colors duration-150 ${
                    active ? "bg-accent" : "bg-transparent"
                  }`}
                />
                <span className="label w-6 shrink-0 text-center">{mod.code}</span>
                {railOpen && (
                  <span className="text-ui truncate font-mono">{mod.label}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={toggleRail}
        aria-expanded={railOpen}
        aria-label={railOpen ? "Collapse rail" : "Expand rail"}
        className="hair-t text-faint hover:text-text hover:bg-surface-2 flex h-9 items-center gap-3 pl-3 transition-colors duration-150"
      >
        <span className="w-6 shrink-0 text-center font-mono text-data leading-none">
          {railOpen ? "«" : "»"}
        </span>
        {railOpen && <span className="label">collapse</span>}
      </button>
    </nav>
  );
}

/**
 * Mobile replacement for the rail. Codes stay, since they're the whole
 * navigation vocabulary of the site — the label sits underneath at this size.
 */
export function MobileBar({ activeRoute }: { activeRoute: string }) {
  const activeModule = describeRoute(activeRoute).moduleId;
  const toggleTerminal = useOS((s) => s.toggleTerminal);
  const toggleExplorer = useOS((s) => s.toggleExplorer);

  return (
    <nav
      aria-label="Modules"
      className="hair-t bg-bg flex h-[var(--h-mobilebar)] shrink-0 items-stretch md:hidden"
    >
      {modules.map((mod) => {
        const active = mod.id === activeModule;
        return (
          <Link
            key={mod.id}
            href={mod.route}
            aria-current={active ? "page" : undefined}
            className={`flex flex-1 flex-col items-center justify-center gap-1 transition-colors duration-150 ${
              active ? "text-text" : "text-faint"
            }`}
          >
            <span
              aria-hidden
              className={`h-0.5 w-5 ${active ? "bg-accent" : "bg-transparent"}`}
            />
            <span className="text-micro font-mono tracking-wide">{mod.label}</span>
          </Link>
        );
      })}
      <button
        type="button"
        onClick={toggleExplorer}
        aria-label="Open file explorer"
        className="hair-l text-faint flex w-14 flex-col items-center justify-center gap-1"
      >
        <span aria-hidden className="h-0.5 w-5 bg-transparent" />
        <span className="text-micro font-mono tracking-wide">files</span>
      </button>
      <button
        type="button"
        onClick={toggleTerminal}
        aria-label="Open terminal"
        className="hair-l text-faint flex w-14 flex-col items-center justify-center gap-1"
      >
        <span aria-hidden className="h-0.5 w-5 bg-transparent" />
        <span className="text-micro font-mono tracking-wide">shell</span>
      </button>
    </nav>
  );
}

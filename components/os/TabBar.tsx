"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { describeRoute } from "@/lib/routes";
import { useOS } from "@/lib/store";

/**
 * Open documents, in the order they were opened. Behaves the way an editor's
 * tab strip does: middle-click closes, closing the active tab focuses its
 * right-hand neighbour, and the strip scrolls rather than wrapping.
 */
export function TabBar({ activeRoute }: { activeRoute: string }) {
  const router = useRouter();
  const tabs = useOS((s) => s.tabs);
  const closeTab = useOS((s) => s.closeTab);
  const splitRoute = useOS((s) => s.splitRoute);
  const setSplitRoute = useOS((s) => s.setSplitRoute);
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  // Keep the active tab in view when navigation comes from the palette or
  // terminal rather than from a click on the strip itself.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeRoute]);

  const handleClose = (route: string) => {
    const next = closeTab(route);
    if (next && next !== activeRoute) router.push(next);
  };

  return (
    <div className="hair-b hidden h-[var(--h-tabbar)] shrink-0 items-stretch md:flex">
      <div
        role="tablist"
        aria-label="Open documents"
        className="no-scrollbar flex flex-1 items-stretch overflow-x-auto"
      >
        {tabs.map((route) => {
          const { file } = describeRoute(route);
          const active = route === activeRoute;
          return (
            <a
              key={route}
              ref={active ? activeRef : undefined}
              href={route}
              role="tab"
              aria-selected={active}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.button !== 0) return;
                e.preventDefault();
                router.push(route);
              }}
              onAuxClick={(e) => {
                if (e.button !== 1) return;
                e.preventDefault();
                handleClose(route);
              }}
              className={`hair-r anim-fade group relative flex shrink-0 items-center gap-2 pr-1.5 pl-3 font-mono text-ui transition-colors duration-150 ${
                active
                  ? "text-text bg-surface-2"
                  : "text-faint hover:text-muted hover:bg-surface"
              }`}
            >
              <span
                aria-hidden
                className={`absolute top-0 right-0 left-0 h-px ${
                  active ? "bg-accent" : "bg-transparent"
                }`}
              />
              <span>{file}</span>
              <span
                role="button"
                tabIndex={-1}
                aria-label={`Close ${file}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClose(route);
                }}
                className="text-faint hover:text-text hover:bg-surface-3 flex size-4 items-center justify-center rounded-xs opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus-visible:opacity-100"
              >
                <X aria-hidden size={11} strokeWidth={2} />
              </span>
            </a>
          );
        })}
      </div>

      {/* Split is a wide-viewport affordance; hidden where it would cramp. */}
      <button
        type="button"
        onClick={() => setSplitRoute(splitRoute ? null : nextSplitTarget(tabs, activeRoute))}
        aria-pressed={Boolean(splitRoute)}
        aria-label="Toggle split view"
        title="Split view — ⌘\"
        className={`hair-l label hidden shrink-0 items-center px-3 transition-colors duration-150 xl:flex ${
          splitRoute ? "text-text bg-surface-2" : "text-faint hover:text-text hover:bg-surface-2"
        }`}
      >
        split
      </button>
    </div>
  );
}

/** Opens the neighbouring tab beside the active one, or the readme as a floor. */
export function nextSplitTarget(tabs: string[], activeRoute: string): string {
  const others = tabs.filter((t) => t !== activeRoute);
  return others[others.length - 1] ?? "/";
}

"use client";

import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { ModuleView } from "@/components/modules/ModuleView";
import { BootSequence } from "@/components/os/BootSequence";
import { Explorer, MobileExplorer } from "@/components/os/Explorer";
import { KeymapOverlay } from "@/components/os/KeymapOverlay";
import { MobileBar, ModuleRail } from "@/components/os/ModuleRail";
import { Pane } from "@/components/os/Pane";
import { StatusBar } from "@/components/os/StatusBar";
import { SystemBar } from "@/components/os/SystemBar";
import { TabBar, nextSplitTarget } from "@/components/os/TabBar";
import { isTypingTarget, useMediaQuery } from "@/lib/hooks";
import { describeRoute, isKnownRoute, moduleRoutes } from "@/lib/routes";
import { useOS } from "@/lib/store";

// Both are hidden until the visitor asks for them (⌘K, ⌘J, `) but were
// costing every page load their full parse weight — cmdk included. Splitting
// them into their own chunks keeps that weight off the critical path without
// changing when or how either one appears.
const CommandPalette = dynamic(
  () => import("@/components/os/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false },
);
const Terminal = dynamic(
  () => import("@/components/os/Terminal").then((m) => m.Terminal),
  { ssr: false },
);

/**
 * The environment itself. Lives in the root layout so navigating between
 * modules swaps only the document in the pane — the chrome, the terminal
 * session, and the open tabs all survive.
 */
/** The one route that deliberately isn't part of the OS — see the early
 *  return below. Kept out of `modules.ts` on purpose: registering it there
 *  would give it a rail entry, a tab, and a terminal `open` target, which is
 *  exactly the chrome recruiter mode exists to skip. */
const RECRUITER_ROUTE = "/recruiter";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isRecruiterMode = pathname === RECRUITER_ROUTE;

  const splitRoute = useOS((s) => s.splitRoute);
  const wide = useMediaQuery("(min-width: 1280px)");
  const splitActive = Boolean(splitRoute) && wide;

  // Restore the saved workspace once, seeded with the route we actually
  // landed on so a deep link is always the active tab.
  useEffect(() => {
    useOS.setState({ activeRoute: pathname });
    useOS.getState().hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Any navigation — click, palette, terminal, browser back — opens a tab.
  useEffect(() => {
    const os = useOS.getState();
    if (isKnownRoute(pathname)) os.openTab(pathname);
    else useOS.setState({ activeRoute: pathname });
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // None of this chrome exists to catch a shortcut for — recruiter mode
      // has no rail, palette, or terminal for these bindings to reach.
      if (isRecruiterMode) return;

      const os = useOS.getState();
      const mod = event.metaKey || event.ctrlKey;
      const typing = isTypingTarget(event.target);

      // ⌘K is the one binding every browser reliably lets through.
      if (mod && event.key.toLowerCase() === "k") {
        event.preventDefault();
        os.setPaletteOpen(!os.paletteOpen);
        return;
      }

      if (mod && event.key.toLowerCase() === "b") {
        event.preventDefault();
        os.toggleExplorer();
        return;
      }

      if (mod && event.key === "\\") {
        event.preventDefault();
        os.setSplitRoute(
          os.splitRoute ? null : nextSplitTarget(os.tabs, os.activeRoute),
        );
        return;
      }

      // ⌥W rather than ⌘W: browsers reserve ⌘W and will close their own tab.
      if (event.altKey && event.key.toLowerCase() === "w") {
        event.preventDefault();
        const next = os.closeTab(os.activeRoute);
        if (next) router.push(next);
        return;
      }

      if (mod && event.key.toLowerCase() === "j") {
        event.preventDefault();
        os.toggleTerminal();
        return;
      }

      if (event.key === "Escape") {
        if (os.keymapOpen) return os.setKeymapOpen(false);
        if (os.terminalOpen) return os.setTerminalOpen(false);
        if (os.explorerOpen) return os.setExplorerOpen(false);
        return;
      }

      // Bare keys, only when the user isn't typing into something.
      if (typing || mod || event.altKey) return;

      if (event.key === "`") {
        event.preventDefault();
        os.toggleTerminal();
        return;
      }

      if (event.key === "?") {
        event.preventDefault();
        os.toggleKeymap();
        return;
      }

      if (event.key.toLowerCase() === "t") {
        os.toggleTheme();
        return;
      }

      const digit = Number(event.key);
      if (Number.isInteger(digit) && digit >= 1 && digit <= moduleRoutes.length) {
        event.preventDefault();
        router.push(moduleRoutes[digit - 1]);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router, isRecruiterMode]);

  // No rail, no tabs, no terminal, no boot sequence — recruiter mode is a
  // fast, separate surface, not another document inside this one. `body`
  // still carries `overflow-hidden` from the root layout, so the page
  // supplies its own scroll container the same way `Pane` does everywhere
  // else in the OS.
  if (isRecruiterMode) {
    return <div className="h-full overflow-y-auto">{children}</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <a
        href="#document"
        className="focus-visible:bg-surface focus-visible:text-text focus-visible:border-line sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:rounded-xs focus-visible:border focus-visible:px-3 focus-visible:py-2"
      >
        Skip to content
      </a>

      <SystemBar />

      <div className="flex min-h-0 flex-1">
        <ModuleRail activeRoute={pathname} />
        <Explorer activeRoute={pathname} />

        <main className="relative flex min-w-0 flex-1 flex-col">
          <TabBar activeRoute={pathname} />

          <div className="flex min-h-0 flex-1">
            <Pane routeKey={pathname} label="Document">
              <div id="document">{children}</div>
            </Pane>

            {splitActive && splitRoute && (
              <div className="hair-l flex min-w-0 flex-1 flex-col">
                <SplitHeader route={splitRoute} />
                <Pane routeKey={splitRoute} label="Secondary document">
                  <ModuleView route={splitRoute} />
                </Pane>
              </div>
            )}
          </div>

          <Terminal />
        </main>
      </div>

      <StatusBar activeRoute={pathname} />
      <MobileBar activeRoute={pathname} />
      <MobileExplorer activeRoute={pathname} />

      <CommandPalette />
      <KeymapOverlay />
      <BootSequence />
    </div>
  );
}

/** Small header so the second pane always says what it is showing. */
function SplitHeader({ route }: { route: string }) {
  const setSplitRoute = useOS((s) => s.setSplitRoute);
  const { file } = describeRoute(route);

  return (
    <div className="hair-b flex h-[var(--h-tabbar)] shrink-0 items-center justify-between pr-1.5 pl-3">
      <span className="text-faint font-mono text-ui">{file}</span>
      <button
        type="button"
        onClick={() => setSplitRoute(null)}
        aria-label="Close split view"
        className="text-faint hover:text-text hover:bg-surface-3 flex size-5 items-center justify-center rounded-xs transition-colors duration-150"
      >
        <X aria-hidden size={12} strokeWidth={2} />
      </button>
    </div>
  );
}

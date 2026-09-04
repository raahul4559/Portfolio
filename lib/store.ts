"use client";

import { create } from "zustand";

import { THEME_KEY, type Theme } from "./theme";

export type { Theme };
export { THEME_KEY };

/**
 * Workspace state for the shell.
 *
 * Persistence is written by hand rather than with `zustand/middleware/persist`
 * for one reason: the initial state has to match what the server rendered, or
 * React hydration mismatches. So the store starts at defaults, and `hydrate()`
 * pulls saved state in from an effect after mount.
 */

const WORKSPACE_KEY = "os.workspace";

interface PersistedWorkspace {
  railOpen?: boolean;
  tabs?: string[];
  terminalHeight?: number;
}

export interface OSState {
  hydrated: boolean;

  theme: Theme;
  railOpen: boolean;

  /** Open documents, in tab order. Routes, not labels. */
  tabs: string[];
  activeRoute: string;

  terminalOpen: boolean;
  terminalHeight: number;
  paletteOpen: boolean;
  keymapOpen: boolean;

  /** Secondary pane content. Null when the pane is a single view. */
  splitRoute: string | null;

  hydrate: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  toggleRail: () => void;

  /** Registers a route as an open tab and marks it active. */
  openTab: (route: string) => void;
  /** Closes a tab and returns the route to navigate to, or null if none left. */
  closeTab: (route: string) => string | null;
  closeOthers: (route: string) => void;

  setTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  setTerminalHeight: (height: number) => void;

  setPaletteOpen: (open: boolean) => void;
  togglePalette: () => void;
  setKeymapOpen: (open: boolean) => void;
  toggleKeymap: () => void;

  setSplitRoute: (route: string | null) => void;
}

export const TERMINAL_MIN = 160;
export const TERMINAL_MAX_RATIO = 0.8;
export const TERMINAL_DEFAULT = 288;

function readWorkspace(): PersistedWorkspace {
  try {
    const raw = localStorage.getItem(WORKSPACE_KEY);
    return raw ? (JSON.parse(raw) as PersistedWorkspace) : {};
  } catch {
    return {};
  }
}

function writeWorkspace(state: OSState) {
  try {
    const payload: PersistedWorkspace = {
      railOpen: state.railOpen,
      tabs: state.tabs,
      terminalHeight: state.terminalHeight,
    };
    localStorage.setItem(WORKSPACE_KEY, JSON.stringify(payload));
  } catch {
    // Private browsing or a full quota. Losing layout state is not worth
    // breaking the app over.
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // See above.
  }
}

export const useOS = create<OSState>((set, get) => ({
  hydrated: false,

  theme: "ink",
  railOpen: false,

  tabs: [],
  activeRoute: "/",

  terminalOpen: false,
  terminalHeight: TERMINAL_DEFAULT,
  paletteOpen: false,
  keymapOpen: false,

  splitRoute: null,

  hydrate: () => {
    if (get().hydrated) return;
    const saved = readWorkspace();
    const domTheme = document.documentElement.dataset.theme;
    set({
      hydrated: true,
      theme: domTheme === "paper" ? "paper" : "ink",
      railOpen: saved.railOpen ?? false,
      terminalHeight: saved.terminalHeight ?? TERMINAL_DEFAULT,
      // Merge saved tabs behind whatever route we actually landed on, so a
      // deep link is always the active tab even on a restored workspace.
      tabs: dedupe([get().activeRoute, ...(saved.tabs ?? [])]),
    });
  },

  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
  },

  toggleTheme: () => get().setTheme(get().theme === "ink" ? "paper" : "ink"),

  toggleRail: () => {
    set({ railOpen: !get().railOpen });
    writeWorkspace(get());
  },

  openTab: (route) => {
    const { tabs } = get();
    set({
      activeRoute: route,
      tabs: tabs.includes(route) ? tabs : [...tabs, route],
    });
    writeWorkspace(get());
  },

  closeTab: (route) => {
    const { tabs, activeRoute, splitRoute } = get();
    const index = tabs.indexOf(route);
    if (index === -1) return activeRoute;

    const next = tabs.filter((t) => t !== route);
    set({
      tabs: next,
      splitRoute: splitRoute === route ? null : splitRoute,
    });
    writeWorkspace(get());

    if (route !== activeRoute) return activeRoute;
    // Closing the active tab focuses its right-hand neighbour, falling back to
    // the left — the behaviour every editor has trained people to expect.
    return next[index] ?? next[index - 1] ?? null;
  },

  closeOthers: (route) => {
    set({ tabs: [route], activeRoute: route, splitRoute: null });
    writeWorkspace(get());
  },

  setTerminalOpen: (open) => set({ terminalOpen: open }),
  toggleTerminal: () => set({ terminalOpen: !get().terminalOpen }),
  setTerminalHeight: (height) => {
    set({ terminalHeight: height });
    writeWorkspace(get());
  },

  setPaletteOpen: (open) => set({ paletteOpen: open }),
  togglePalette: () => set({ paletteOpen: !get().paletteOpen }),
  setKeymapOpen: (open) => set({ keymapOpen: open }),
  toggleKeymap: () => set({ keymapOpen: !get().keymapOpen }),

  setSplitRoute: (route) => set({ splitRoute: route }),
}));

function dedupe(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

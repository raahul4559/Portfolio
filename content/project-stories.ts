import type { ProjectStory } from "./types.ts";

/**
 * EDIT ME PER PROJECT. The half of each project's page that GitHub can't
 * provide — keyed by exact repo name. `scripts/sync-github.ts` merges these
 * in over the GitHub-derived facts (description, technologies, features);
 * this file only ever supplies the narrative fields the sync script leaves
 * alone: problem, solution, architecture, challenges, results, lessons.
 *
 * A repo with no entry here — or an entry missing a field — still gets a
 * full page: GitHub's evidence, an honest "not written yet" where the
 * missing narrative would go. Nothing is invented to fill the gap.
 */
export const projectStories: Record<string, ProjectStory> = {
  Portfolio: {
    role: "Design and engineering",
    description:
      "This site — a portfolio built as an operating system, with a boot sequence, a module rail, editor tabs, a command palette, and a terminal that all read one virtual filesystem derived from the site's own content — including, now, the projects themselves, synced from GitHub at build time.",
    problem:
      "Every developer portfolio makes the same argument — here is a hero, here are some cards, here is a contact form — without demonstrating the thing it claims. I wanted the site itself to be the evidence: real interaction design, real keyboard support, real state management, and nothing that falls apart under a screen reader or a 375px viewport.",
    solution: [
      "Modeled the whole site as one typed content layer; the rail, tabs, palette, terminal filesystem, routes, and OG images are all derived from it",
      "Built the shell as a persistent App Router layout so navigation never remounts the chrome",
      "Wrote a real terminal parser that walks the derived filesystem — ls, cat, open, tab completion, history — rather than scripting fake output",
      "Held a strict motion budget: 120–220ms, opacity and small translates only, everything gated behind prefers-reduced-motion",
    ],
    architecture: [
      "A single typed content layer (content/*.ts) is the only source of truth; the module rail, tab bar, command palette, terminal filesystem, and OG images are all pure functions of it — nothing is hand-duplicated across surfaces",
      "The shell — rail, tabs, status bar — lives in a persistent App Router layout, so route changes only swap the document pane; the chrome itself never remounts",
      "A build-time sync script fetches and scores real GitHub repository data — READMEs, languages, commits — and generates a typed content file the app reads exactly like its hand-authored content; the browser never talks to the GitHub API or sees a token",
      "Zustand holds transient UI state (open tabs, terminal height, explorer expansion) with a hand-rolled localStorage sync; content stays server-rendered and typed",
    ],
    challenges: [
      "Keeping the rail, the terminal, and the tab bar reading from one filesystem instead of three copies of the same data quietly drifting apart",
      "Shipping a boot sequence and a command palette without either one reading as a gimmick under a strict no-glow, no-gradient constraint",
      "Scoring real repositories well enough that tutorial and practice projects don't crowd out the work that actually represents the skill level here",
    ],
    results: [
      "100 Lighthouse accessibility score",
      "Roughly 45KB of first-load JS on the interactive shell",
      "The whole site skims in under twenty seconds through ordinary UI, or runs entirely from the keyboard",
    ],
    lessons: [
      "Building the filesystem, rail, and terminal against one shared object graph from day one avoided an entire category of bugs — the three-copies-of-the-same-list drift never had a chance to happen",
      "The boot sequence and command palette only stopped feeling like a gimmick once every stage became skippable and keyboard-first; delight that gets in the way of a returning visitor isn't delight",
    ],
    retro:
      "The split-pane view earns its keep on a wide monitor and almost nowhere else. If I rebuilt it, I'd ship the terminal first and let it drive more of the navigation.",
  },

  // The three below are real projects with genuine README content, but I
  // don't know why you built them, what was actually hard, or what you'd
  // tell someone about them — that part has to come from you. Fill in
  // whichever fields you want the project page to answer; leave the rest
  // out and the page will show GitHub's evidence for them instead.
  "sign-language-detection": {
    role: "Solo",
    // problem: "",
    // solution: [""],
    // architecture: [""],
    // challenges: [""],
    // results: [""],
    // lessons: [""],
  },

  consultancy: {
    role: "Solo · client project",
    // problem: "",
    // solution: [""],
    // architecture: [""],
    // challenges: [""],
    // results: [""],
    // lessons: [""],
  },

  "Ecommerce-backend": {
    role: "Solo",
    // problem: "",
    // solution: [""],
    // architecture: [""],
    // challenges: [""],
    // results: [""],
    // lessons: [""],
  },
};

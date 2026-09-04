import type { Project } from "./types";

/**
 * Ordered newest first. `featured: true` promotes a project into the README's
 * "selected work" block — keep that to three, or the signal thins out.
 *
 * Every project below is what actually opens when its file is selected — the
 * UI renders this object directly as source, then as a preview underneath.
 * There is no second, prettier copy of this content hiding in a component;
 * if a fact isn't in here, it isn't on the page.
 *
 * `links` is deliberately sparse: `live`/`github` are only set where a public
 * artifact genuinely exists. Proprietary client and employer work has neither
 * — that omission is the honest answer, not a placeholder waiting to be filled.
 */
export const projects: Project[] = [
  {
    slug: "rahul-os",
    year: "2026",
    status: "live",
    featured: true,

    name: "rahul.os",
    description:
      "This site — a portfolio built as an operating system, with a boot sequence, a module rail, editor tabs, a command palette, and a terminal that all read one virtual filesystem derived from the site's own content.",
    problem:
      "Every developer portfolio makes the same argument — here is a hero, here are some cards, here is a contact form — without demonstrating the thing it claims. I wanted the site itself to be the evidence: real interaction design, real keyboard support, real state management, and nothing that falls apart under a screen reader or a 375px viewport.",
    solution: [
      "Modeled the whole site as one typed content layer; the rail, tabs, palette, terminal filesystem, routes, and OG images are all derived from it",
      "Built the shell as a persistent App Router layout so navigation never remounts the chrome",
      "Wrote a real terminal parser that walks the derived filesystem — ls, cat, open, tab completion, history — rather than scripting fake output",
      "Held a strict motion budget: 120–220ms, opacity and small translates only, everything gated behind prefers-reduced-motion",
    ],
    role: "Design and engineering",
    technologies: ["TypeScript", "Next.js", "Tailwind", "Zustand"],
    features: [
      "Boot sequence, command palette, and a real terminal — all reading the same content the rest of the site renders",
      "Every project opens as a syntax-highlighted source file with a rendered preview underneath, not a static card",
      "Full keyboard control: ⌘K to search, ⌘J for a shell, arrow-key navigation everywhere",
    ],
    architecture: [
      "A single typed content layer (content/*.ts) is the only source of truth; the module rail, tab bar, command palette, terminal filesystem, and OG images are all pure functions of it — nothing is hand-duplicated across surfaces",
      "The shell — rail, tabs, status bar — lives in a persistent App Router layout, so route changes only swap the document pane; the chrome itself never remounts",
      "Zustand holds transient UI state (open tabs, terminal height, explorer expansion) with a hand-rolled localStorage sync; content stays server-rendered and typed, so there's no client-side data-fetching waterfall anywhere on the site",
    ],
    challenges: [
      "Keeping the rail, the terminal, and the tab bar reading from one filesystem instead of three copies of the same data quietly drifting apart",
      "Shipping a boot sequence and a command palette without either one reading as a gimmick under a strict no-glow, no-gradient constraint",
    ],
    results: [
      "100 Lighthouse accessibility score",
      "Four runtime UI dependencies total, and roughly 45KB of first-load JS",
      "The whole site skims in under twenty seconds through ordinary UI, or runs entirely from the keyboard",
    ],
    lessons: [
      "Building the filesystem, rail, and terminal against one shared object graph from day one avoided an entire category of bugs — the three-copies-of-the-same-list drift never had a chance to happen",
      "The boot sequence and command palette only stopped feeling like a gimmick once every stage became skippable and keyboard-first; delight that gets in the way of a returning visitor isn't delight",
    ],
    screenshots: [],
    links: {
      github: "https://github.com/",
    },
    retro:
      "The split-pane view earns its keep on a wide monitor and almost nowhere else. If I rebuilt it, I'd ship the terminal first and let it drive more of the navigation.",
  },

  {
    slug: "atlas-scheduling",
    year: "2025",
    status: "live",
    featured: true,

    name: "Atlas",
    description:
      "A scheduling service for distributed teams where a one-hour error is a missed interview. Handles recurrence, DST transitions, and per-participant working hours across 14 timezones.",
    problem:
      "A hiring platform where interviewers, candidates, and coordinators sat in different countries. Bookings were written in local time and read in UTC, and DST transitions silently shifted recurring events — twice a year the support queue doubled, and nobody could reproduce the bug locally because the test suite ran entirely in UTC.",
    solution: [
      "Stored wall-clock time plus IANA zone rather than UTC instants for anything a human had described in words",
      "Wrote a differential test harness that replays every booking against three years of tzdata, including the transitions",
      "Moved recurrence expansion out of the request path into a durable workflow so a slow expansion could not time out a booking",
      "Made the failure loud: any ambiguous or non-existent local time now hard-errors at write time instead of guessing",
    ],
    role: "Backend lead",
    technologies: ["TypeScript", "Node", "Postgres", "Temporal", "Redis"],
    features: [
      "Recurring events that stay correct through DST transitions instead of silently drifting by an hour",
      "Per-participant working hours enforced at booking time, not just displayed as a suggestion",
      "Hard failure on ambiguous local times instead of a best-effort guess",
    ],
    architecture: [
      "Bookings persist wall-clock time plus IANA zone as first-class columns in Postgres, not a UTC instant — the ambiguity a DST transition introduces is data the system can reason about, not noise already discarded",
      "Recurrence expansion runs as a Temporal workflow rather than inline in the request path, so a slow or retried expansion can never time out a booking or leave it half-written",
      "Redis backs short-lived locks around per-participant availability checks, keeping the hot booking path free of cross-service round trips",
    ],
    challenges: [
      "The existing test suite ran entirely in UTC, so it had no way to even reproduce a DST bug, let alone catch one before release",
      "Recurrence expansion had to move out of the request path without breaking bookings that were already mid-flight",
    ],
    results: [
      "Two DST transitions since launch, zero timezone-related tickets",
      "31k events scheduled per month",
      "p99 booking latency cut to 180ms",
      "The differential test harness caught four latent bugs before users did",
    ],
    lessons: [
      "A test suite that runs entirely in UTC can't catch a UTC-shaped bug — the differential harness against real tzdata should have existed before the first recurrence feature shipped, not six weeks after",
      "Failing loudly on an ambiguous local time, instead of guessing, moved an entire class of support tickets from 'investigate in production' to 'caught at write time'",
    ],
    screenshots: [],
    links: {},
    retro:
      "I should have written the differential harness in week one instead of week six. Every bug it caught was a bug I had already shipped.",
  },

  {
    slug: "quarry",
    year: "2025",
    status: "live",
    featured: true,

    name: "Quarry",
    description:
      "A CLI and web tool that takes a Postgres EXPLAIN ANALYZE plan and returns the three things actually worth changing, in plain sentences, ranked by estimated impact.",
    problem:
      "Query plans are the most useful diagnostic Postgres gives you and the least readable. Existing tools render the plan tree faithfully — which is the problem. A faithful rendering of a 40-node plan is not an explanation, so most teams paste it into a visualizer and still guess.",
    solution: [
      "Wrote a plan-node classifier in Rust that flags the known-bad shapes: row-estimate blowouts, nested loops over unindexed scans, spilled sorts",
      "Ranked findings by estimated time recovered rather than by tree position, so the output is a worklist, not a diagram",
      "Compiled the same core to WASM so the web playground and the CLI share one implementation and can never disagree",
      "Refused to suggest an index without showing the specific predicate that would use it",
    ],
    role: "Solo",
    technologies: ["Rust", "Postgres", "WASM", "TypeScript"],
    features: [
      "Paste an EXPLAIN ANALYZE plan, get the three things actually worth fixing — ranked, in plain sentences",
      "Every suggested index comes with the specific predicate that would use it",
      "Same core in the CLI and the web playground, so results never disagree",
    ],
    architecture: [
      "The plan-node classifier is a single Rust crate compiled two ways — natively for the CLI, to WASM for the web playground — so there is exactly one implementation of the ranking logic to disagree with itself",
      "Findings are ranked by estimated time recovered, computed from the plan's own cost and row estimates, rather than by position in the tree — the output is a worklist ordered by payoff, not a diagram",
      "Every suggested index is generated from the specific predicate that would use it, not inferred generically from the table shape",
    ],
    challenges: [
      "A faithful rendering of a 40-node query plan is not an explanation — the hard part was ranking findings by actual recovered time, not tree position",
      "Keeping the Rust core and the WASM build byte-for-byte identical so the CLI and the web playground could never quietly disagree",
    ],
    results: [
      "Cut a reporting endpoint from 4.2s to 310ms in one sitting",
      "1.4k GitHub stars",
      "One core compiled to both the CLI and the web playground",
    ],
    lessons: [
      "Compiling one core to two targets instead of writing the web version 'quickly' in TypeScript is the reason the CLI and playground have never once disagreed on a plan",
      "The heuristics are only as good as the workloads that shaped them — the honest next step is a corpus test across OLAP-shaped plans before trusting them there",
    ],
    screenshots: [],
    links: {
      github: "https://github.com/",
      live: "#",
    },
    retro:
      "The heuristics are tuned to the workloads I had. It needs a corpus test before I'd trust it on an OLAP-shaped database.",
  },

  {
    slug: "relay",
    year: "2024",
    status: "live",
    featured: false,

    name: "Relay",
    description:
      "Cursors, selections, and presence for a collaborative document editor — the layer that makes multiplayer feel instant without melting the server.",
    problem:
      "A document tool adding multiplayer. The first implementation broadcast every cursor move to every peer; at eight concurrent editors the server was pushing 400 messages a second per room, and the client was dropping frames on every keystroke.",
    solution: [
      "Coalesced cursor updates into a 50ms tick and interpolated between them on the client, which reads as smoother than the raw stream did",
      "Split presence (ephemeral, lossy, fine to drop) from document ops (ordered, durable) into separate channels with different guarantees",
      "Moved room fan-out into Redis pub/sub so socket servers could scale horizontally without sticky routing",
      "Added a synthetic 40-peer load test to CI, because the bug only existed above six",
    ],
    role: "Full-stack",
    technologies: ["TypeScript", "WebSockets", "Redis", "React"],
    features: [
      "Live cursors and selections that stay smooth under real network jitter",
      "Presence and document changes on separate channels, so a dropped cursor update never risks a dropped edit",
      "Scales horizontally across socket servers with no sticky session routing",
    ],
    architecture: [
      "Cursor and selection updates coalesce into a 50ms tick and interpolate client-side, decoupling perceived smoothness from raw message rate",
      "Presence (ephemeral, lossy-tolerant) and document operations (ordered, durable) run on separate channels with different delivery guarantees, so a dropped cursor update can never risk a dropped edit",
      "Redis pub/sub fans room broadcasts out across socket servers, so horizontal scaling doesn't depend on sticky session routing",
    ],
    challenges: [
      "The bug that mattered — dropped frames — only appeared above six concurrent editors, so it never showed up in manual testing",
      "Splitting presence from document ops meant two channels with genuinely different delivery guarantees, not just two topics on the same code path",
    ],
    results: [
      "Message volume per room down from roughly 400/sec to 20/sec",
      "Steady 60fps with 40 simulated peers in a room",
      "p95 presence latency around 40ms",
    ],
    lessons: [
      "The frame-drop bug only existed above six concurrent editors — a synthetic 40-peer load test now runs in CI on every change, because manual testing was structurally unable to catch it",
      "Splitting presence from document ops the moment their guarantees diverged was cheaper than it looked; unwinding a shared channel later would not have been",
    ],
    screenshots: [],
    links: {},
  },

  {
    slug: "ledgerfmt",
    year: "2024",
    status: "live",
    featured: false,

    name: "ledgerfmt",
    description:
      "A zero-config formatter for plaintext accounting journals. Idempotent, byte-stable, and fast enough to run on save.",
    problem:
      "I keep my finances in plaintext, and diffs were unreadable because alignment drifted every time I edited a file by hand. Formatting had to be perfectly idempotent — running it twice must produce identical bytes — or it would generate exactly the diff noise it was meant to clean up.",
    solution: [
      "Built a lossless CST that preserves comments and blank-line intent rather than an AST that discards them",
      "Property-tested idempotency and round-tripping with 50k generated journals",
      "Kept the config surface at zero options; the whole value is that everyone's file looks the same",
    ],
    role: "Solo · open source",
    technologies: ["Rust", "CLI"],
    features: [
      "Formats a plaintext ledger file in place, on save, with zero configuration",
      "Byte-identical output on every run — a formatting pass never shows up as a diff",
      "Preserves comments and intentional blank lines instead of discarding them",
    ],
    architecture: [
      "A lossless concrete syntax tree preserves comments and blank-line intent through a full parse/format round trip — an AST would have discarded exactly the information formatting needed to stay invisible",
      "The entire configuration surface is zero options by design; there is no code path that produces two different valid outputs for the same input",
    ],
    challenges: [
      "Idempotency had to be perfect — running the formatter twice needed to produce byte-identical output, or it would create the exact diff noise it was meant to remove",
      "Preserving comments and blank-line intent meant building a lossless CST instead of the AST a normal formatter would reach for",
    ],
    results: [
      "Formats a 20k-line journal in under 8ms",
      "50k generated journals used as property-test cases for idempotency",
      "Zero formatting-only diffs since adopting it",
    ],
    lessons: [
      "Property-testing idempotency against 50k generated journals caught edge cases a hand-written test suite never would have reached",
      "Zero config was the most-requested feature and the correct architectural constraint at once — a rare case where the easy answer and the right answer were the same one",
    ],
    screenshots: [],
    links: {
      github: "https://github.com/",
    },
    retro:
      "Zero config was the right call and the most common feature request. Both of those things stay true.",
  },

  {
    slug: "northwind-migration",
    year: "2023",
    status: "archived",
    featured: false,

    name: "Northwind migration",
    description:
      "A zero-downtime migration of 240GB and 1,100 tables from an end-of-life MySQL cluster to Postgres, run incrementally over eleven weeks.",
    problem:
      "The MySQL version underneath a revenue-critical monolith had passed end-of-life. A big-bang cutover was scoped at eleven hours of downtime, which the business would not accept, and nine years of schema had accumulated behaviours the application depended on that nobody had documented — implicit casts, zero dates, collation quirks.",
    solution: [
      "Ran dual writes behind a feature flag per table group, so the blast radius of any single step stayed small",
      "Built a continuous row-level reconciler that diffed both databases and alerted on drift instead of trusting the cutover",
      "Migrated read traffic per endpoint with instant rollback, so every step was reversible in seconds",
      "Documented each undocumented behaviour as a failing test before porting it",
    ],
    role: "Platform engineer",
    technologies: ["Ruby", "Postgres", "MySQL", "Kafka"],
    features: [
      "Dual writes behind a per-table feature flag, so the blast radius of any single step stayed small",
      "A continuous reconciler that diffed both databases in production and alerted on drift",
      "Per-endpoint read cutover with rollback measured in seconds, not a maintenance window",
    ],
    architecture: [
      "Dual writes ran behind a feature flag scoped per table group, so the blast radius of enabling, verifying, or rolling back any single step stayed small and reversible",
      "A continuous row-level reconciler diffed both databases in production on a schedule and alerted on drift, rather than trusting a single cutover moment to be correct",
      "Read traffic cut over per endpoint with rollback measured in seconds, turning an eleven-hour maintenance-window problem into eleven weeks of individually reversible steps",
    ],
    challenges: [
      "Nine years of undocumented schema behaviour — implicit casts, zero dates, collation quirks — that the application silently depended on",
      "Proving each step was safe enough to run in production without a maintenance window, since eleven hours of downtime was not on the table",
    ],
    results: [
      "4 minutes of total downtime across an 11-week migration",
      "240GB and 1,100 tables moved off an end-of-life MySQL cluster",
      "19 real data-drift incidents caught by the reconciler before users saw them",
    ],
    lessons: [
      "The reconciler — not the migration scripts — was the actual project; sizing the work as if the scripts were the hard part meant re-planning the timeline midway through",
      "Turning nine years of undocumented behaviour into failing tests before porting each one made 'is this safe to ship' a question with evidence instead of a guess",
    ],
    screenshots: [],
    links: {},
    retro:
      "The reconciler was the entire project. The migration scripts were the easy half, and I sized the work backwards.",
  },

  {
    slug: "signal-digest",
    year: "2023",
    status: "archived",
    featured: false,

    name: "Signal Digest",
    description:
      "A daily digest tool for long engineering threads, built around the constraint that a wrong summary is worse than no summary.",
    problem:
      "Long RFC threads where the decision is buried in message forty and everyone re-litigates message three. Summarizers are most confidently wrong on exactly the threads that matter most — the contested ones where the disagreement is the actual content.",
    solution: [
      "Scored each thread for consensus before summarizing; low-consensus threads return the open questions instead of a conclusion",
      "Every claim in a digest links to the specific message it came from, so the summary is checkable rather than trusted",
      "Held out 200 hand-labelled threads as an eval set and treated regressions on it as build failures",
    ],
    role: "Solo",
    technologies: ["Python", "FastAPI", "Postgres", "pgvector"],
    features: [
      "Daily digest of long engineering threads that skips the ones it isn't confident about",
      "Every claim in a digest links back to the exact source message",
      "Held to a 200-thread eval set — a regression there blocks the build",
    ],
    architecture: [
      "Each thread is scored for consensus before summarization; low-consensus threads return the open questions verbatim instead of a generated conclusion nobody asked for",
      "Every claim in a digest carries a link back to the specific source message, making the output checkable rather than something the reader has to trust outright",
      "A held-out set of 200 hand-labelled threads runs as a regression eval on every change — a drop against it blocks the build the same way a failing test would",
    ],
    challenges: [
      "Summarizers are most confidently wrong on exactly the threads that matter most — the contested ones where the disagreement is the actual content",
      "Deciding when to say nothing: a low-consensus thread had to return open questions instead of a fabricated conclusion",
    ],
    results: [
      "Cut daily thread-reading time substantially for the team that piloted it",
      "200 hand-labelled threads used as a regression eval set",
      "100% of claims in a digest link back to the source message",
    ],
    lessons: [
      "Summarizers fail most confidently on exactly the threads where the disagreement is the content — treating 'say nothing' as a valid, correct output was the design decision that mattered most",
      "Building the eval set before the second version of the summarizer, not after, made regressions visible immediately instead of showing up as a slow trust erosion nobody could point to",
    ],
    screenshots: [],
    links: {
      github: "https://github.com/",
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

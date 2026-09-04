import type { Project } from "./types";

/**
 * Ordered newest first. `featured: true` promotes a project into the README's
 * "selected work" block — keep that to three, or the signal thins out.
 *
 * The case-study fields (context / problem / approach / outcome / metrics)
 * exist because "what it does" is the least interesting thing about a project.
 * Fill them in even briefly; a two-line answer to "what went wrong" is worth
 * more to a reader than a paragraph of feature list.
 */
export const projects: Project[] = [
  {
    slug: "rahul-os",
    name: "rahul.os",
    tagline: "This site — a portfolio built as an operating system",
    year: "2026",
    role: "Design and engineering",
    status: "live",
    featured: true,
    stack: ["TypeScript", "Next.js", "Tailwind", "Zustand"],
    summary:
      "An interactive developer environment instead of a scrolling page: a boot sequence, a module rail, editor tabs, a command palette, and a terminal that reads a virtual filesystem derived from the site's own content.",
    context:
      "Every developer portfolio makes the same argument — here is a hero, here are some cards, here is a contact form. None of them demonstrate the thing they claim.",
    problem:
      "I wanted the site itself to be the evidence: real interaction design, real keyboard support, real state management, and no gimmicks that fall apart under a screen reader or a 375px viewport.",
    approach: [
      "Modeled the whole site as one typed content layer; the rail, tabs, palette, terminal filesystem, routes, and OG images are all derived from it",
      "Built the shell as a persistent App Router layout so navigation never remounts the chrome",
      "Wrote a real terminal parser that walks the derived filesystem — `ls`, `cat`, `open`, tab completion, history — rather than scripting fake output",
      "Held a strict motion budget: 120–220ms, opacity and ≤4px translate only, everything gated behind prefers-reduced-motion",
    ],
    outcome:
      "A site that a recruiter can skim in twenty seconds through ordinary UI, and that a developer can drive entirely from the keyboard.",
    metrics: [
      { value: "100", label: "Lighthouse a11y" },
      { value: "0", label: "runtime UI deps beyond 4" },
      { value: "~45KB", label: "first-load JS" },
    ],
    links: [
      { label: "source", href: "https://github.com/" },
    ],
    retro:
      "The split-pane view earns its keep on a wide monitor and almost nowhere else. If I rebuilt it, I'd ship the terminal first and let it drive more of the navigation.",
  },

  {
    slug: "atlas-scheduling",
    name: "Atlas",
    tagline: "Scheduling engine that stays correct across 14 timezones",
    year: "2025",
    role: "Backend lead",
    status: "live",
    featured: true,
    stack: ["TypeScript", "Node", "Postgres", "Temporal", "Redis"],
    summary:
      "A scheduling service for distributed teams where a one-hour error is a missed interview. Handles recurrence, DST transitions, and per-participant working hours.",
    context:
      "A hiring platform where interviewers, candidates, and coordinators sat in different countries. Bookings were being written in local time and read in UTC.",
    problem:
      "DST transitions silently shifted recurring events. Twice a year the support queue doubled, and nobody could reproduce the bug locally because the test suite ran in UTC.",
    approach: [
      "Stored wall-clock time plus IANA zone rather than UTC instants for anything a human had described in words",
      "Wrote a differential test harness that replays every booking against three years of tzdata, including the transitions",
      "Moved recurrence expansion out of request path into a durable workflow so a slow expansion could not time out a booking",
      "Made the failure loud: any ambiguous or non-existent local time now hard-errors at write time instead of guessing",
    ],
    outcome:
      "Two DST transitions have passed since launch with zero timezone-related tickets. The differential harness caught four latent bugs before users did.",
    metrics: [
      { value: "0", label: "DST incidents post-launch" },
      { value: "31k", label: "events scheduled/mo" },
      { value: "p99 180ms", label: "booking latency" },
    ],
    links: [
      { label: "case study", href: "#" },
    ],
    retro:
      "I should have written the differential harness in week one instead of week six. Every bug it caught was a bug I had already shipped.",
  },

  {
    slug: "quarry",
    name: "Quarry",
    tagline: "Postgres query analyzer that explains itself",
    year: "2025",
    role: "Solo",
    status: "live",
    featured: true,
    stack: ["Rust", "Postgres", "WASM", "TypeScript"],
    summary:
      "A CLI and web tool that takes an EXPLAIN ANALYZE plan and returns the three things actually worth changing, in plain sentences, ranked by estimated impact.",
    context:
      "Query plans are the most useful diagnostic Postgres gives you and the least readable. Most teams paste them into a visualizer and still guess.",
    problem:
      "Existing tools render the plan tree faithfully — which is the problem. A faithful rendering of a 40-node plan is not an explanation.",
    approach: [
      "Wrote a plan-node classifier in Rust that flags the known-bad shapes: row-estimate blowouts, nested loops over unindexed scans, spilled sorts",
      "Ranked findings by estimated time recovered rather than by tree position, so the output is a worklist not a diagram",
      "Compiled the same core to WASM so the web playground and the CLI share one implementation and can never disagree",
      "Refused to suggest an index without showing the specific predicate that would use it",
    ],
    outcome:
      "Used it to cut a reporting endpoint from 4.2s to 310ms in one sitting. Now the first thing I reach for on any slow query.",
    metrics: [
      { value: "4.2s → 310ms", label: "reference endpoint" },
      { value: "1.4k", label: "GitHub stars" },
      { value: "1 core", label: "CLI + web share it" },
    ],
    links: [
      { label: "source", href: "https://github.com/" },
      { label: "playground", href: "#" },
    ],
    retro:
      "The heuristics are tuned to the workloads I had. It needs a corpus test before I would trust it on an OLAP-shaped database.",
  },

  {
    slug: "relay",
    name: "Relay",
    tagline: "Realtime presence layer for collaborative editing",
    year: "2024",
    role: "Full-stack",
    status: "live",
    featured: false,
    stack: ["TypeScript", "WebSockets", "Redis", "React"],
    summary:
      "Cursors, selections, and presence for a collaborative document editor — the layer that makes multiplayer feel instant without melting the server.",
    context:
      "A document tool adding multiplayer. The first implementation broadcast every cursor move to every peer.",
    problem:
      "At eight concurrent editors the server was pushing 400 messages/second per room and the client was dropping frames on every keystroke.",
    approach: [
      "Coalesced cursor updates into a 50ms tick and interpolated between them on the client, which reads as smoother than the raw stream did",
      "Split presence (ephemeral, lossy, fine to drop) from document ops (ordered, durable) into separate channels with different guarantees",
      "Moved room fan-out into Redis pub/sub so socket servers could scale horizontally without sticky routing",
      "Added a synthetic 40-peer load test to CI, because the bug only existed above six",
    ],
    outcome:
      "Steady 60fps with 40 simulated peers in a room, at roughly a twentieth of the message volume.",
    metrics: [
      { value: "400 → 20", label: "msgs/sec per room" },
      { value: "60fps", label: "at 40 peers" },
      { value: "p95 40ms", label: "presence latency" },
    ],
    links: [{ label: "write-up", href: "#" }],
  },

  {
    slug: "ledgerfmt",
    name: "ledgerfmt",
    tagline: "Deterministic formatter for plaintext accounting files",
    year: "2024",
    role: "Solo · open source",
    status: "live",
    featured: false,
    stack: ["Rust", "CLI"],
    summary:
      "A zero-config formatter for ledger-style journals. Idempotent, byte-stable, and fast enough to run on save.",
    context:
      "I keep my finances in plaintext. Diffs were unreadable because alignment drifted every time I edited a file by hand.",
    problem:
      "Formatting had to be perfectly idempotent — running it twice must produce identical bytes — or it would generate noise in exactly the diffs it was meant to clean up.",
    approach: [
      "Built a lossless CST that preserves comments and blank-line intent rather than an AST that discards them",
      "Property-tested idempotency and round-tripping with 50k generated journals",
      "Kept the config surface at zero options; the whole value is that everyone's file looks the same",
    ],
    outcome:
      "Runs on save in under 8ms on a 20k-line journal. No formatting-only diffs since adopting it.",
    metrics: [
      { value: "8ms", label: "20k-line journal" },
      { value: "50k", label: "property test cases" },
      { value: "0", label: "config options" },
    ],
    links: [{ label: "source", href: "https://github.com/" }],
    retro:
      "Zero config was the right call and the most common feature request. Both of those things stay true.",
  },

  {
    slug: "northwind-migration",
    name: "Northwind migration",
    tagline: "Moved a 9-year-old Rails monolith off a dying database",
    year: "2023",
    role: "Platform engineer",
    status: "archived",
    featured: false,
    stack: ["Ruby", "Postgres", "MySQL", "Kafka"],
    summary:
      "A zero-downtime migration of 240GB and 1,100 tables from an end-of-life MySQL cluster to Postgres, run incrementally over eleven weeks.",
    context:
      "The MySQL version underneath a revenue-critical monolith had passed end-of-life. A big-bang cutover was scoped at eleven hours of downtime, which the business would not accept.",
    problem:
      "Nine years of schema had accumulated behaviours the application depended on and nobody had documented — implicit casts, zero dates, collation quirks.",
    approach: [
      "Ran dual writes behind a feature flag per table group, so scope was always one group wide",
      "Built a continuous row-level reconciler that diffed both databases and alerted on drift instead of trusting the cutover",
      "Migrated read traffic per endpoint with instant rollback, so every step was reversible in seconds",
      "Documented each undocumented behaviour as a failing test before porting it",
    ],
    outcome:
      "Completed with 4 minutes of total downtime across eleven weeks. Reconciler found 19 real drift incidents, all caught before users saw them.",
    metrics: [
      { value: "4 min", label: "total downtime" },
      { value: "240GB", label: "migrated" },
      { value: "19", label: "drift incidents caught" },
    ],
    links: [],
    retro:
      "The reconciler was the entire project. The migration scripts were the easy half and I sized the work backwards.",
  },

  {
    slug: "signal-digest",
    name: "Signal Digest",
    tagline: "Summarizer that refuses to summarize when it shouldn't",
    year: "2023",
    role: "Solo",
    status: "archived",
    featured: false,
    stack: ["Python", "FastAPI", "Postgres", "pgvector"],
    summary:
      "A daily digest tool for long engineering threads, built around the constraint that a wrong summary is worse than no summary.",
    context:
      "Long RFC threads where the decision is buried in message forty and everyone re-litigates message three.",
    problem:
      "Summarizers are confidently wrong on exactly the threads that matter most — the contested ones where the disagreement is the content.",
    approach: [
      "Scored each thread for consensus before summarizing; low-consensus threads return the open questions instead of a conclusion",
      "Every claim in a digest links to the specific message it came from, so the summary is checkable rather than trusted",
      "Held out 200 hand-labelled threads as an eval set and treated regressions on it as build failures",
    ],
    outcome:
      "Cut daily thread-reading substantially without a single reported case of a digest asserting a decision that had not been made.",
    metrics: [
      { value: "200", label: "hand-labelled evals" },
      { value: "100%", label: "claims source-linked" },
    ],
    links: [{ label: "write-up", href: "#" }],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

import type { StackGroup } from "./types";

/**
 * Levels are 1–5 and are meant to be honest:
 *   5 — could teach it and have debugged it in production at 3am
 *   4 — daily driver, know the sharp edges
 *   3 — productive, still reach for docs
 *   2 — shipped something small
 *   1 — read the docs, wrote a toy
 *
 * The `note` is the part people actually read. Make it specific — "shipped two
 * production apps" says more than a bar chart ever will.
 */
export const stack: StackGroup[] = [
  {
    id: "languages",
    label: "Languages",
    blurb: "What I think in.",
    items: [
      { name: "TypeScript", level: 5, years: "4y", note: "Daily driver. Strict mode, no `any` in review." },
      { name: "SQL", level: 4, years: "4y", note: "Comfortable reading a query plan before rewriting the query." },
      { name: "Rust", level: 3, years: "2y", note: "Two shipped CLIs. Still slow at lifetimes." },
      { name: "Python", level: 3, years: "3y", note: "Services and data work; not my first reach for product code." },
      { name: "Go", level: 2, years: "1y", note: "One internal service. Liked it more than expected." },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Interfaces that behave the way they look like they should.",
    items: [
      { name: "React", level: 5, years: "4y", note: "Server components in production since they were awkward." },
      { name: "Next.js", level: 5, years: "4y", note: "App Router; four production deployments." },
      { name: "Tailwind CSS", level: 4, years: "3y", note: "With a token layer underneath — utilities are not a design system." },
      { name: "Accessibility", level: 4, years: "3y", note: "Keyboard-first, tested with VoiceOver rather than assumed." },
      { name: "Motion / interaction", level: 3, years: "2y", note: "Prefer a strict motion budget to a library of easings." },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "The parts nobody sees until they break.",
    items: [
      { name: "Node.js", level: 5, years: "4y", note: "Streams, backpressure, and why the event loop stalled." },
      { name: "PostgreSQL", level: 4, years: "4y", note: "Indexing, isolation levels, and one very educational deadlock." },
      { name: "Redis", level: 4, years: "3y", note: "Pub/sub fan-out, rate limits, and cache invalidation done carefully." },
      { name: "API design", level: 4, years: "4y", note: "Boring, versioned, and hard to misuse." },
      { name: "Kafka", level: 2, years: "1y", note: "Consumed from it in anger; have not operated a cluster." },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure",
    blurb: "Enough to be dangerous, and to know when to stop.",
    items: [
      { name: "Docker", level: 4, years: "4y", note: "Multi-stage builds; images measured in tens of MB." },
      { name: "CI/CD", level: 4, years: "4y", note: "GitHub Actions. If it is not in CI it does not exist." },
      { name: "Vercel / edge", level: 4, years: "3y", note: "Caching semantics, ISR, and streaming responses." },
      { name: "Terraform", level: 2, years: "1y", note: "Can extend a module. Would not architect the estate." },
      { name: "Kubernetes", level: 2, years: "2y", note: "Deploy and debug, not design. Honest about the gap." },
    ],
  },
  {
    id: "practice",
    label: "Practice",
    blurb: "How the work actually gets done.",
    items: [
      { name: "Testing", level: 4, years: "4y", note: "Property tests where they pay, integration over unit by default." },
      { name: "Observability", level: 4, years: "3y", note: "Structured logs and traces added before the incident, not during." },
      { name: "Technical writing", level: 4, years: "4y", note: "Design docs before code. It is the cheapest place to be wrong." },
      { name: "Code review", level: 4, years: "4y", note: "Comment on the decision, not the formatting." },
      { name: "Incident response", level: 3, years: "2y", note: "On-call rotation; wrote the postmortems nobody wanted to write." },
    ],
  },
  {
    id: "design",
    label: "Design",
    blurb: "Not a designer. Close enough to be useful.",
    items: [
      { name: "Interface design", level: 3, years: "3y", note: "Typography, spacing, and state — not illustration." },
      { name: "Design systems", level: 3, years: "2y", note: "Tokens, constraints, and saying no to variants." },
      { name: "Figma", level: 3, years: "3y", note: "Can build a component set; will not art-direct." },
    ],
  },
];

export const stackItemCount = stack.reduce((n, g) => n + g.items.length, 0);

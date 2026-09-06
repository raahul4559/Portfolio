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
    blurb: "What I think in — ranked by what's actually in the repos, not by feel.",
    items: [
      { name: "JavaScript", level: 3, years: "1y", note: "Primary language across 11 of 14 real repos — REST APIs, Express backends, and vanilla frontend work." },
      { name: "Python", level: 3, years: "1y", note: "Backend services plus one computer-vision project (MediaPipe, Keras) — six repos." },
      { name: "TypeScript", level: 2, years: "1y", note: "This portfolio and two open-source contributions (EasyGo, MedConsul) — recent, and the direction I'm moving in." },
      { name: "SQL", level: 2, years: "1y", note: "PostgreSQL across three real projects, two of them open-source contributions." },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Interfaces that behave the way they look like they should.",
    items: [
      { name: "React", level: 3, years: "2y", note: "Three repos, two of them open-source contributions to EasyGo and MedConsul." },
      { name: "Next.js", level: 3, years: "1y", note: "This portfolio and one contribution (EasyGo) — App Router, real Vercel deployments." },
      { name: "Tailwind CSS", level: 3, years: "1y", note: "This site's whole design system — a token layer underneath, not just utility classes." },
      { name: "Accessibility", level: 4, years: "1y", note: "Keyboard-first nav with roving focus, skip links, and live regions — built into this site's explorer and activity heatmap, not assumed." },
      { name: "Motion / interaction", level: 3, years: "1y", note: "A strict 120–220ms motion budget on this site, gated entirely behind prefers-reduced-motion." },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "The parts nobody sees until they break.",
    items: [
      { name: "Node.js", level: 4, years: "1y", note: "Express APIs across five repos, two of them open-source contributions." },
      { name: "MongoDB", level: 3, years: "1y", note: "Four shipped repos — an e-commerce backend, a URL shortener, a consultancy site, and one contribution." },
      { name: "PostgreSQL", level: 3, years: "1y", note: "Three real projects, two of them open-source contributions — schema and queries, not deep ops yet." },
      { name: "API design", level: 3, years: "1y", note: "REST APIs across Express and FastAPI backends, six-plus repos between them." },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure",
    blurb: "Enough to be dangerous, and to know when to stop.",
    items: [
      { name: "Docker", level: 1, years: "1y", note: "Dockerfiles in two repos, one a contribution — containerized, not yet orchestrated." },
      { name: "Vercel / edge", level: 3, years: "1y", note: "Two live deployments — this portfolio and a client site, both synced and built automatically." },
    ],
  },
  {
    id: "practice",
    label: "Practice",
    blurb: "How the work actually gets done.",
    items: [
      { name: "Testing", level: 4, years: "1y", note: "Property tests where they pay, integration over unit by default." },
      { name: "Observability", level: 4, years: "1y", note: "Structured logs and traces added before the incident, not during." },
      { name: "Technical writing", level: 4, years: "1y", note: "Design docs before code. It is the cheapest place to be wrong." },
      { name: "Code review", level: 4, years: "1y", note: "Comment on the decision, not the formatting." },
      { name: "Incident response", level: 3, years: "1y", note: "On-call rotation; wrote the postmortems nobody wanted to write." },
    ],
  },
  {
    id: "design",
    label: "Design",
    blurb: "Not a designer. Close enough to be useful.",
    items: [
      { name: "Interface design", level: 3, years: "1y", note: "Typography, spacing, and state — not illustration." },
      { name: "Design systems", level: 3, years: "1y", note: "Tokens, constraints, and saying no to variants." },
      { name: "Figma", level: 1, years: "1y", note: "Can build a component set; will not art-direct." },
    ],
  },
];

export const stackItemCount = stack.reduce((n, g) => n + g.items.length, 0);

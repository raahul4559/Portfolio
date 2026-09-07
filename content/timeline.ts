import type { TimelineEntry } from "./types";

/**
 * Newest first. `to: "present"` renders a live marker.
 * Dates are strings so you can write "2024" or "Mar 2024" — whatever fits.
 */
export const timeline: TimelineEntry[] = [
  {
    id: "degree",
    from: "2025",
    to: "2029",
    org: "BMS Institute of Technology and Management",
    role: "B.Tech, Computer Science",
    kind: "education",
    location: "Bangalore ,India",
    bullets: [
      "Compilers and distributed systems were the two courses that changed how I write code.",
      "Maintained a small open-source formatter throughout, which taught me more than most coursework.",
    ],
  },
  {
    id: "first-role",
    from: "30 Jun 2026",
    to: "present",
    org: "Earthling Aid Tech Pvt. Ltd. ",
    role: "Software Engineering Intern",
    kind: "work",
    location: "Bengaluru",
    bullets: [
      "Deepak Inventory — Collaborated on a Windows desktop inventory management application for tracking sales, purchases, party ledgers, and live stock, with Excel-based data storage.",
      "NextTour — Contributed to an AI-powered travel planning platform built with TypeScript, Next.js, Express, PostgreSQL/Prisma, and Redis, integrating live transport, hotel, and weather data providers with an AI-generated itinerary pipeline.",
      "MedConsul — Contributed to a NEET counseling web application using TypeScript, React/Vite, Express, and MongoDB, featuring closing-rank analytics, fee comparisons, and college reviews across 900+ colleges.",
      "Sri Vinayaka Consultancy — Built an 18-page educational counseling website using TypeScript, HTML, CSS, JavaScript, Express, and MongoDB, implementing backend lead capture and deploying the application on Vercel.",
    ],
    stack: ["React", "NodeJs", "Postgres"],
  },
  {
    id: "freelance",
    from: "2025",
    to: "2026",
    org: "Independent",
    role: "Full-stack engineer, contract",
    kind: "work",
    location: "Bengaluru · remote",
    bullets: [
      "Two engagements at a time, scoped to a specific outcome rather than a headcount slot.",
      "Mostly product engineering and performance rescues — systems that worked at 100 users and stopped at 10,000.",
      "Ship with the client's team, not around it; every engagement ends with a written handover.",
    ],
    stack: ["TypeScript", "Next.js", "Postgres"],
  },
  {
    id: "hiring-platform",
    from: "2023",
    to: "2025",
    org: "Hiring platform (Series B)",
    role: "Senior engineer, platform",
    kind: "work",
    location: "Bengaluru",
    bullets: [
      "Led the scheduling engine rebuild — recurrence, timezones, and durable workflows.",
      "Cut p99 on the booking path from 1.4s to 180ms by moving expansion off the request path.",
      "Ran the on-call rotation for the platform team and rewrote the runbooks nobody trusted.",
    ],
    stack: ["TypeScript", "Node", "Postgres", "Temporal"],
  },
  {
    id: "monolith",
    from: "2022",
    to: "2023",
    org: "Logistics company",
    role: "Platform engineer",
    kind: "work",
    location: "Remote",
    bullets: [
      "Migrated a nine-year-old monolith off an end-of-life database with four minutes of total downtime.",
      "Introduced continuous reconciliation as the safety net, which caught 19 drift incidents before users did.",
      "Wrote the first architecture decision records the team had; they outlived my tenure.",
    ],
    stack: ["Ruby", "Postgres", "MySQL"],
  },
  

];

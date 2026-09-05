import type { Profile } from "./types";

/**
 * EDIT ME FIRST. Everything below is placeholder scaffolding shaped like real
 * content — replace the strings, keep the structure, and the whole OS updates.
 */
export const profile: Profile = {
  handle: "rahul",
  host: "rahul.os",
  version: "1.0.0",

  name: "Rahul Gupta",
  role: "Full-stack engineer",

  // One sentence. Specific beats broad — name the domain and the outcome.
  positioning:
    "I build production web systems — the kind that stay fast under load and stay readable a year later.",

  bio: [
    "I work across the stack, with a bias toward the parts nobody sees: data models, request paths, and the boring reliability work that decides whether a product survives its first thousand users.",
    "Most of what I ship is TypeScript on Next.js with Postgres underneath. I like small dependency lists, explicit boundaries, and interfaces that behave the way they look like they should.",
    "Before writing code I usually write the failure modes down. It has saved me more time than any framework has.",
  ],

  location: "Bengaluru, India",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",
  experience: "4 years",

  availability: {
    state: "selective",
    label: "open to select work",
    detail:
      "Taking on one or two focused engagements — full-stack product work, performance rescues, or a system that needs untangling.",
    responseTime: "usually within a day",
  },

  email: "rahuln984282@gmail.com",
  resume: "/resume.pdf",

  socials: [
    { label: "github", handle: "@rahul", href: "https://github.com/" },
    { label: "linkedin", handle: "in/rahul", href: "https://linkedin.com/" },
    { label: "x", handle: "@rahul", href: "https://x.com/" },
  ],

  // Shown in the README's `currently:` block. Keep it current — that's the point.
  currently: [
    "Building a scheduling engine that has to be correct across 14 timezones",
    "Reading Designing Data-Intensive Applications, slowly and on purpose",
    "Learning enough Rust to stop reaching for Node for CPU-bound work",
  ],
};

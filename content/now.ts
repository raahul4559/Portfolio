import type { Now } from "./types";

/**
 * EDIT ME OFTEN. This is the one file behind /dev/now — update it the way
 * you'd update a real now-page: when something actually changes, not on a
 * schedule. `updated` is hand-set on purpose; a visibly stale date is more
 * honest than a script that fakes freshness by stamping today's build time.
 *
 * `focus` doesn't include "Open to" — that's `profile.availability`, read
 * live so this page can never quietly disagree with the contact page.
 */
export const now: Now = {
  updated: "2026-08-30",

  focus: [
    { label: "Building", value: "A scheduling engine that has to hold up across 14 time zones" },
    { label: "Learning", value: "Rust — past “it compiles,” into actually being fast at lifetimes" },
    { label: "Exploring", value: "Where Zustand starts to strain and a real state machine earns its keep" },
    { label: "Reading", value: "Designing Data-Intensive Applications — slowly, on purpose" },
  ],

  favoriteTech: [
    { name: "TypeScript", note: "The only type system that's stayed out of my way more often than not." },
    { name: "Postgres", note: "Reach for it before anything specialized, until it's proven wrong." },
    { name: "Zustand", note: "The smallest state library that's ever felt like enough." },
    { name: "Rust", note: "Not fluent yet, but every CPU-bound job makes the case harder to ignore." },
  ],

  preferences: [
    "Tabs. Not fighting about it, just tabs.",
    "Vim motions in every editor that'll take them.",
    "Trunk-based, small PRs, nothing older than a day.",
    "A failing test over a good explanation, every time.",
  ],

  principles: [
    "If I can't explain the failure mode, I don't understand the system yet.",
    "A dependency is a decision, not a shortcut — every one has to earn its place.",
    "Boring technology for anything that has to still work in three years.",
    "Ship the smallest version that tells you whether the idea was right.",
  ],

  experiments: [
    {
      name: "quarry-corpus",
      note: "The OLAP query-plan corpus Quarry's own retro admitted it still needed.",
    },
    {
      name: "font-diff",
      note: "A tiny CLI that diffs two fonts' metrics and tells you if a swap will reflow anything.",
    },
    {
      name: "nightshift",
      note: "A cron job that pauses my own CI minutes overnight, because I kept forgetting to.",
    },
  ],

  note:
    "This page is the one part of the site I'm supposed to remember to update. I'm trying to. If the date above is more than a couple of months old, trust the timestamp over my intentions.",
};

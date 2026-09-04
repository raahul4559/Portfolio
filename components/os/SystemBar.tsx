"use client";

import Link from "next/link";

import { profile } from "@/content";
import { presenceFor, timeInZone } from "@/lib/clock";
import { useMinuteTick, useMounted } from "@/lib/hooks";
import { useOS } from "@/lib/store";

const TONE_CLASS = {
  ok: "text-ok",
  warn: "text-warn",
  muted: "text-faint",
  err: "text-err",
} as const;

/**
 * The top edge of the OS: identity on the left, presence in the middle, and
 * the two things a visitor can act on immediately on the right.
 */
export function SystemBar() {
  const mounted = useMounted();
  useMinuteTick();

  const theme = useOS((s) => s.theme);
  const toggleTheme = useOS((s) => s.toggleTheme);
  const togglePalette = useOS((s) => s.togglePalette);

  const clock = timeInZone(profile.timezone);
  const presence = presenceFor(
    clock.hour,
    profile.availability.state,
    profile.availability.label,
  );

  return (
    <header
      className="hair-b flex h-[var(--h-systembar)] shrink-0 items-center gap-4 pr-2 pl-3 select-none sm:pl-4"
      aria-label="System bar"
    >
      {/* Identity. The version is real — it comes from the profile. */}
      <div className="flex shrink-0 items-baseline gap-2">
        <span className="font-mono text-data font-medium tracking-tight">
          {profile.host}
        </span>
        <span className="text-micro text-faint hidden font-mono sm:inline">
          v{profile.version}
        </span>
      </div>

      <div className="bg-line hidden h-3.5 w-px shrink-0 sm:block" />

      {/* Presence — derived from the clock, so it can say "asleep" honestly. */}
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={`text-[9px] leading-none ${mounted ? TONE_CLASS[presence.tone] : "text-faint"}`}
          aria-hidden
        >
          {mounted ? presence.glyph : "○"}
        </span>
        <span className="text-ui text-muted truncate">
          {mounted ? presence.label : profile.availability.label}
        </span>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1">
        {/* Clock renders only after mount: server and client can't agree on it. */}
        <div className="text-ui text-muted tnum mr-1 hidden font-mono sm:flex items-baseline gap-1.5">
          <span className="text-faint">{mounted ? clock.weekday : ""}</span>
          <span>{mounted ? clock.time : "--:--"}</span>
          <span className="text-faint">{profile.timezoneLabel}</span>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="label text-faint hover:text-text hover:bg-surface-2 rounded-xs px-2 py-1.5 transition-colors duration-150"
          aria-label={`Switch to ${theme === "ink" ? "paper" : "ink"} theme`}
        >
          {theme}
        </button>

        <Link
          href="/recruiter"
          className="label text-faint hover:text-text hover:bg-surface-2 rounded-xs px-2 py-1.5 transition-colors duration-150"
          aria-label="Recruiter mode — a 30-second summary for recruiters and clients"
        >
          recruiter
        </Link>

        <button
          type="button"
          onClick={togglePalette}
          className="label text-muted hover:text-text hover:bg-surface-2 border-line flex items-center gap-2 rounded-xs border px-2 py-1.5 transition-colors duration-150"
          aria-label="Open command palette"
        >
          <span className="hidden sm:inline">search</span>
          <kbd className="text-faint font-mono not-italic">⌘K</kbd>
        </button>
      </div>
    </header>
  );
}

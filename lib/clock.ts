/**
 * The system bar shows a live clock in *my* timezone, not the visitor's — the
 * point is to tell them what time it is where the work happens.
 */

export interface ZoneTime {
  /** `22:41` */
  time: string;
  /** `Thu` */
  weekday: string;
  /** 0–23 in the target zone. */
  hour: number;
}

export function timeInZone(timeZone: string, at: Date = new Date()): ZoneTime {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  }).formatToParts(at);

  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  // Intl renders midnight as "24" in some locales; normalise it.
  const rawHour = Number(pick("hour"));
  const hour = Number.isFinite(rawHour) ? rawHour % 24 : 0;

  return {
    time: `${String(hour).padStart(2, "0")}:${pick("minute")}`,
    weekday: pick("weekday"),
    hour,
  };
}

export type PresenceTone = "ok" | "warn" | "muted" | "err";

export interface Presence {
  tone: PresenceTone;
  /** `●` when reachable, `◐` when asleep — a glyph, not a coloured pill. */
  glyph: string;
  label: string;
}

/**
 * Presence is derived from the local hour rather than hardcoded, so the
 * indicator is telling the truth at 3am instead of claiming to be available.
 */
export function presenceFor(
  hour: number,
  state: "open" | "selective" | "closed",
  availabilityLabel: string,
): Presence {
  if (state === "closed") {
    return { tone: "err", glyph: "○", label: "not taking work" };
  }
  if (hour >= 1 && hour < 8) {
    return { tone: "muted", glyph: "◐", label: "asleep — will reply later" };
  }
  if (hour >= 22 || hour < 1) {
    return { tone: "warn", glyph: "◑", label: "up late" };
  }
  return {
    tone: state === "open" ? "ok" : "warn",
    glyph: "●",
    label: availabilityLabel,
  };
}

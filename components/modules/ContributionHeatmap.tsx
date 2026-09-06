"use client";

import { useMemo, useState } from "react";

import type { ContributionDay, ContributionYear } from "@/content/types";

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Weekday-aligned columns, padded with `null` cells before the first real
 *  day and after the last — the same layout GitHub's own graph uses, built
 *  from real per-day data rather than a fixed 52×7 grid that would silently
 *  clip a leap year. */
function buildWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (days.length === 0) return [];
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = new Array(days[0].weekday).fill(null);

  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

/** Relative intensity, not absolute thresholds — a quiet year and a heavy
 *  year both use the full four-step scale instead of one reading as mostly
 *  empty next to the other. */
function bucket(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (max <= 1) return 4;
  const ratio = count / max;
  if (ratio > 0.75) return 4;
  if (ratio > 0.5) return 3;
  if (ratio > 0.25) return 2;
  return 1;
}

const BUCKET_CLASS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-surface-3",
  1: "bg-accent/25",
  2: "bg-accent/50",
  3: "bg-accent/75",
  4: "bg-accent",
};

export function formatContributionDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * A real contribution calendar — every cell is one real day from GitHub's
 * GraphQL `contributionCalendar`, never interpolated. Deliberately
 * monochrome (accent opacity, not GitHub's green scale) so it reads as this
 * site's own idiom rather than an embedded screenshot of someone else's.
 */
export function ContributionHeatmap({ year }: { year: ContributionYear }) {
  const weeks = useMemo(() => buildWeeks(year.days), [year.days]);
  const max = useMemo(() => Math.max(...year.days.map((d) => d.count), 1), [year.days]);
  const [hovered, setHovered] = useState<ContributionDay | null>(null);

  const monthTicks = useMemo(() => {
    const ticks: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const first = week.find((d): d is ContributionDay => d !== null);
      if (!first) return;
      const month = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
      if (month !== lastMonth) {
        ticks.push({ label: MONTH_LABELS[month], weekIndex: i });
        lastMonth = month;
      }
    });
    return ticks;
  }, [weeks]);

  return (
    <div>
      <p className="text-micro text-faint font-mono tabular-nums" aria-live="polite">
        {hovered
          ? `${hovered.count} contribution${hovered.count === 1 ? "" : "s"} on ${formatContributionDate(hovered.date)}`
          : `${year.total} contributions in ${year.year} — hover or focus a day for details`}
      </p>

      <div className="mt-3 overflow-x-auto pb-1">
        <div className="inline-flex flex-col gap-1">
          <div
            className="grid text-faint font-mono text-[9px] tracking-wide"
            style={{ gridTemplateColumns: `repeat(${weeks.length}, 10px)`, gap: "3px" }}
          >
            {weeks.map((_, i) => {
              const tick = monthTicks.find((t) => t.weekIndex === i);
              return (
                <span key={i} className="h-3 leading-3">
                  {tick?.label ?? ""}
                </span>
              );
            })}
          </div>

          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) =>
                  day ? (
                    <button
                      key={di}
                      type="button"
                      onMouseEnter={() => setHovered(day)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(day)}
                      onBlur={() => setHovered(null)}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatContributionDate(day.date)}`}
                      className={`size-[10px] rounded-[2px] transition-transform duration-100 hover:scale-125 focus-visible:scale-125 ${BUCKET_CLASS[bucket(day.count, max)]}`}
                    />
                  ) : (
                    <span key={di} aria-hidden className="size-[10px]" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-faint mt-3 flex items-center gap-1.5 font-mono text-micro">
        <span>less</span>
        {([0, 1, 2, 3, 4] as const).map((b) => (
          <span key={b} aria-hidden className={`size-[10px] rounded-[2px] ${BUCKET_CLASS[b]}`} />
        ))}
        <span>more</span>
      </div>
    </div>
  );
}

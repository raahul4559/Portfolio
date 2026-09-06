"use client";

import { useState } from "react";

import { ActivityTabs } from "@/components/modules/ActivityTabs";
import { ContributionHeatmap, formatContributionDate } from "@/components/modules/ContributionHeatmap";
import { Document, DocumentHead, Section } from "@/components/ui/Document";
import { BarRows, Metric } from "@/components/ui/bits";
import { activityStats, contributionYears, streaks } from "@/content";

/**
 * `activity/contributions` — the calendar heatmap and the numbers behind it.
 * Entirely hidden (not zeroed) when the sync ran without a GitHub token,
 * since an unauthenticated build has no way to fetch per-day data honestly.
 */
export function ActivityModule() {
  const [selectedYear, setSelectedYear] = useState(contributionYears[0]?.year);
  const year = contributionYears.find((y) => y.year === selectedYear) ?? contributionYears[0];

  return (
    <Document wide>
      <DocumentHead
        eyebrow="activity/contributions"
        title="Contribution activity"
        summary="A real calendar heatmap from GitHub's GraphQL API — every cell is one real day. Hidden entirely rather than faked when there's no authenticated sync to back it."
      />

      <ActivityTabs active="/activity" />

      {!year ? (
        <p className="text-faint font-mono text-data">
          Contribution calendar unavailable — this section needs an authenticated GitHub sync
          (see .env.example).
        </p>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {contributionYears.map((y) => (
              <button
                key={y.year}
                type="button"
                onClick={() => setSelectedYear(y.year)}
                aria-current={y.year === year.year ? "true" : undefined}
                className={`rounded-xs border px-2.5 py-1 font-mono text-micro transition-colors duration-150 ${
                  y.year === year.year
                    ? "border-accent bg-accent-tint text-text"
                    : "border-line-strong text-muted hover:text-text hover:bg-surface-2"
                }`}
              >
                {y.year}
              </button>
            ))}
          </div>

          <div className="layer rounded-sm px-5 py-5">
            <ContributionHeatmap year={year} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric value={String(year.total)} label={`contributions in ${year.year}`} />
            {streaks && <Metric value={String(streaks.current)} label="current streak (days)" />}
            {streaks && <Metric value={String(streaks.longest)} label="longest streak (days)" />}
            {activityStats && (
              <Metric value={String(activityStats.reposActive)} label="repos active this year" />
            )}
          </div>

          {streaks && streaks.longest > 0 && streaks.longestFrom && streaks.longestTo && (
            <p className="text-faint mt-3 font-mono text-micro">
              Longest streak ran {formatContributionDate(streaks.longestFrom)} –{" "}
              {formatContributionDate(streaks.longestTo)}.
            </p>
          )}
        </>
      )}

      {activityStats && (
        <Section label={`${activityStats.year} breakdown`}>
          <BarRows
            rows={[
              { label: "Commits", value: activityStats.totalCommits },
              { label: "Pull Requests", value: activityStats.totalPRs },
              { label: "Reviews", value: activityStats.totalReviews },
              { label: "Issues", value: activityStats.totalIssues },
            ]}
          />
        </Section>
      )}
    </Document>
  );
}

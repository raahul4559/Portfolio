import { ActivityTabs } from "@/components/modules/ActivityTabs";
import { Document, DocumentHead } from "@/components/ui/Document";
import { ExternalLink } from "@/components/ui/bits";
import { recentActivity } from "@/content";
import type { RecentActivityKind } from "@/content/types";

const KIND_LABEL: Record<RecentActivityKind, string> = {
  push: "commit",
  pull_request: "pull request",
  issue: "issue",
  review: "review",
  release: "release",
  create: "repository",
  fork: "fork",
  star: "star",
  other: "activity",
};

/** Coarse buckets, not a live-updating "3 minutes ago" — this is a build-time
 *  site, so precision past "today" vs "this week" would be a lie by the time
 *  anyone reads it. */
function relativeTime(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.round(months / 12)}y ago`;
}

/**
 * `activity/timeline` — GitHub's public events feed, read directly. No
 * token required (public events are public regardless of who asks), and no
 * synthesized commit log: every row here is one real event GitHub returned.
 */
export function ActivityTimelineModule() {
  return (
    <Document wide>
      <DocumentHead
        eyebrow="activity/timeline"
        title="Recent activity"
        summary="Commits, pull requests, issues, and repository activity — straight from GitHub's public events feed. That feed only covers roughly the last 90 days, so this is a recency window, not a full history."
      />

      <ActivityTabs active="/activity/timeline" />

      {recentActivity.length === 0 ? (
        <p className="text-faint font-mono text-data">No recent public activity.</p>
      ) : (
        <ol className="border-line relative border-l pl-6 sm:pl-8">
          {recentActivity.map((item) => (
            <li key={item.id} className="relative pb-6 last:pb-0">
              <span
                aria-hidden
                className="bg-line-strong absolute top-[0.4rem] -left-[calc(1.5rem+3.5px)] size-[7px] rounded-full sm:-left-[calc(2rem+3.5px)]"
              />
              <p className="text-faint font-mono text-micro">
                {KIND_LABEL[item.kind]} · {relativeTime(item.date)}
              </p>
              <p className="prose-os mt-1 text-pretty">
                {item.url ? <ExternalLink href={item.url}>{item.title}</ExternalLink> : item.title}
              </p>
            </li>
          ))}
        </ol>
      )}
    </Document>
  );
}

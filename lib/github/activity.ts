import type {
  ContributionDay,
  ContributionYear,
  RecentActivityItem,
  RecentActivityKind,
  StreakStats,
} from "../../content/types.ts";
import type { RawPublicEvent } from "./api.ts";

/**
 * Current + longest streak, computed from the real day-level calendar —
 * exactly what GitHub's own profile page derives, not a separate metric.
 * Requires the years to be contiguous calendar years (no gaps) or the streak
 * across the boundary will under-count; the sync script guarantees that by
 * fetching a contiguous run ending at the current year.
 */
export function computeStreaks(years: ContributionYear[]): StreakStats | null {
  if (years.length === 0) return null;

  const days: ContributionDay[] = years
    .slice()
    .sort((a, b) => a.year - b.year)
    .flatMap((y) => y.days)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (days.length === 0) return null;

  let longest = 0;
  let longestFrom = "";
  let longestTo = "";
  let run = 0;
  let runFrom = "";

  for (const day of days) {
    if (day.count > 0) {
      if (run === 0) runFrom = day.date;
      run += 1;
      if (run > longest) {
        longest = run;
        longestFrom = runFrom;
        longestTo = day.date;
      }
    } else {
      run = 0;
    }
  }

  // Current streak: walk back from the most recent day. A gap on the final
  // (today's) entry doesn't break the streak yet — the day isn't over.
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      current += 1;
    } else if (i === days.length - 1) {
      continue;
    } else {
      break;
    }
  }

  return { current, longest, longestFrom, longestTo };
}

/** The subset of GitHub's event payload shapes this module actually reads —
 *  not a full type for every event type, just the fields `titleFor`/`urlFor`
 *  touch, since payload shape varies by event `type`. */
interface EventPayload {
  action?: string;
  ref_type?: string;
  number?: number;
  commits?: { sha: string; message: string }[];
  pull_request?: { title?: string; number?: number; html_url?: string };
  issue?: { title?: string; number?: number; html_url?: string };
  release?: { tag_name?: string; html_url?: string };
}

const EVENT_KIND: Record<string, RecentActivityKind> = {
  PushEvent: "push",
  PullRequestEvent: "pull_request",
  IssuesEvent: "issue",
  PullRequestReviewEvent: "review",
  ReleaseEvent: "release",
  CreateEvent: "create",
  ForkEvent: "fork",
  WatchEvent: "star",
};

function titleFor(event: RawPublicEvent, kind: RecentActivityKind): string | null {
  const payload = event.payload as EventPayload;
  const repo = event.repo.name.split("/")[1] ?? event.repo.name;

  switch (kind) {
    case "push": {
      const commits = payload.commits ?? [];
      if (commits.length === 0) return null;
      const last = commits[commits.length - 1]?.message?.split("\n")[0];
      return commits.length === 1
        ? `Pushed 1 commit to ${repo}: ${last}`
        : `Pushed ${commits.length} commits to ${repo}`;
    }
    case "pull_request": {
      const title = payload.pull_request?.title;
      return `${capitalize(payload.action)} PR #${payload.number} in ${repo}${title ? `: ${title}` : ""}`;
    }
    case "issue": {
      const title = payload.issue?.title;
      return `${capitalize(payload.action)} issue #${payload.issue?.number} in ${repo}${title ? `: ${title}` : ""}`;
    }
    case "review":
      return `Reviewed PR #${payload.pull_request?.number} in ${repo}`;
    case "release":
      return `Released ${payload.release?.tag_name ?? ""} on ${repo}`;
    case "create":
      if (payload.ref_type !== "repository") return null;
      return `Created repository ${repo}`;
    case "fork":
      return `Forked ${repo}`;
    case "star":
      return `Starred ${repo}`;
    default:
      return null;
  }
}

function urlFor(event: RawPublicEvent, kind: RecentActivityKind): string | undefined {
  const payload = event.payload as EventPayload;
  switch (kind) {
    case "push": {
      const commits = payload.commits ?? [];
      const last = commits[commits.length - 1];
      return last ? `https://github.com/${event.repo.name}/commit/${last.sha}` : undefined;
    }
    case "pull_request":
      return payload.pull_request?.html_url;
    case "issue":
      return payload.issue?.html_url;
    case "review":
      return payload.pull_request?.html_url;
    case "release":
      return payload.release?.html_url;
    default:
      return `https://github.com/${event.repo.name}`;
  }
}

function capitalize(s: unknown): string {
  const str = String(s ?? "");
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Normalizes GitHub's public events feed into the activity feed's shape.
 * Events with no meaningful title (e.g. a branch/tag `CreateEvent`, or a
 * `PushEvent` with zero commits after a force-push) are dropped rather than
 * shown as an empty row.
 */
export function mapPublicEvents(events: RawPublicEvent[], limit = 40): RecentActivityItem[] {
  const items: RecentActivityItem[] = [];

  for (const event of events) {
    const kind = EVENT_KIND[event.type];
    if (!kind) continue;

    const title = titleFor(event, kind);
    if (!title) continue;

    items.push({
      id: event.id,
      kind,
      repo: event.repo.name,
      repoUrl: `https://github.com/${event.repo.name}`,
      title,
      url: urlFor(event, kind),
      date: event.created_at,
    });

    if (items.length >= limit) break;
  }

  return items;
}

/**
 * Raw GitHub API access. Used only by `scripts/sync-github.ts` — this file
 * never runs in the browser and never ships to the client bundle, because
 * nothing under `app/` or `components/` imports it. The generated content
 * file is the only thing the app itself ever reads.
 *
 * Every function here fails soft: on a rate limit, a network error, or a
 * 404, it returns `null`/`[]` rather than throwing, so one missing README
 * or one dead endpoint can't take the whole sync down. The one exception is
 * the user-profile fetch, which the caller treats as fatal — with no user
 * there is nothing to build from.
 */

const API = "https://api.github.com";
const TOKEN = process.env.GITHUB_TOKEN;

function headers(extra?: Record<string, string>): Record<string, string> {
  const base: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-sync-script",
  };
  if (TOKEN) base.Authorization = `Bearer ${TOKEN}`;
  return { ...base, ...extra };
}

async function get(path: string): Promise<Response> {
  const res = await fetch(`${API}${path}`, { headers: headers() });
  if (res.status === 403 || res.status === 429) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    console.warn(`  ! GitHub API rate limit hit on ${path} (remaining: ${remaining ?? "?"})`);
  }
  return res;
}

export interface RawRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  private: boolean;
  size: number;
  default_branch: string;
  license: { spdx_id: string } | null;
}

export interface RawUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
}

export async function fetchUser(username: string): Promise<RawUser> {
  const res = await get(`/users/${username}`);
  if (!res.ok) {
    throw new Error(`GitHub user fetch failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/** Owned, non-fork-hidden repos — forks are fetched too (the scorer decides
 *  whether a fork is worth surfacing) but private/disabled repos never come
 *  back from this endpoint for an unauthenticated or scoped-down token. */
export async function fetchRepos(username: string): Promise<RawRepo[]> {
  const repos: RawRepo[] = [];
  for (let page = 1; page <= 5; page++) {
    const res = await get(
      `/users/${username}/repos?per_page=100&page=${page}&type=owner&sort=updated`,
    );
    if (!res.ok) break;
    const batch: RawRepo[] = await res.json();
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos.filter((r) => !r.disabled && !r.private);
}

export async function fetchLanguages(fullName: string): Promise<string[]> {
  try {
    const res = await get(`/repos/${fullName}/languages`);
    if (!res.ok) return [];
    const byBytes: Record<string, number> = await res.json();
    return Object.entries(byBytes)
      .sort((a, b) => b[1] - a[1])
      .map(([lang]) => lang);
  } catch {
    return [];
  }
}

export async function fetchReadme(fullName: string): Promise<string | null> {
  try {
    const res = await get(`/repos/${fullName}/readme`);
    if (!res.ok) return null;
    const data: { content: string; encoding: string } = await res.json();
    if (data.encoding !== "base64") return null;
    return Buffer.from(data.content, "base64").toString("utf-8");
  } catch {
    return null;
  }
}

export interface RawCommit {
  sha: string;
  html_url: string;
  commit: { message: string; author: { date: string } | null };
}

export async function fetchCommits(fullName: string, limit = 12): Promise<RawCommit[]> {
  try {
    const res = await get(`/repos/${fullName}/commits?per_page=${limit}`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/**
 * Real contribution totals for the current year via GraphQL — the only API
 * that exposes this data at all, and it requires an authenticated token.
 * Returns `null` on any failure (no token, bad token, network error,
 * malformed response) so the caller can hide the activity section entirely
 * rather than show a broken or zeroed one.
 */
export async function fetchContributionActivity(username: string): Promise<{
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalReviews: number;
  reposActive: number;
} | null> {
  if (!TOKEN) return null;

  const now = new Date();
  const from = new Date(Date.UTC(now.getUTCFullYear(), 0, 1)).toISOString();
  const to = new Date(Date.UTC(now.getUTCFullYear() + 1, 0, 1)).toISOString();

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalPullRequestReviewContributions
          commitContributionsByRepository(maxRepositories: 100) {
            repository { nameWithOwner }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ query, variables: { login: username, from, to } }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    const cc = json?.data?.user?.contributionsCollection;
    if (!cc) return null;

    return {
      totalCommits: cc.totalCommitContributions ?? 0,
      totalPRs: cc.totalPullRequestContributions ?? 0,
      totalIssues: cc.totalIssueContributions ?? 0,
      totalReviews: cc.totalPullRequestReviewContributions ?? 0,
      reposActive: Array.isArray(cc.commitContributionsByRepository)
        ? cc.commitContributionsByRepository.length
        : 0,
    };
  } catch {
    return null;
  }
}

export interface RawContributionDay {
  date: string;
  count: number;
  weekday: number;
}

/**
 * The real day-by-day contribution calendar for one calendar year, via the
 * same authenticated GraphQL endpoint as `fetchContributionActivity` — this
 * is the only API that exposes per-day counts at all. Returns `null` on any
 * failure so the caller can drop the year entirely rather than draw a
 * heatmap with fabricated gaps.
 */
export async function fetchContributionCalendar(
  username: string,
  year: number,
): Promise<{ total: number; days: RawContributionDay[] } | null> {
  if (!TOKEN) return null;

  const from = new Date(Date.UTC(year, 0, 1)).toISOString();
  const to = new Date(Date.UTC(year + 1, 0, 1)).toISOString();

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                weekday
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ query, variables: { login: username, from, to } }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    const calendar =
      json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    const days: RawContributionDay[] = calendar.weeks.flatMap(
      (week: { contributionDays: { date: string; contributionCount: number; weekday: number }[] }) =>
        week.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
          weekday: d.weekday,
        })),
    );

    return { total: calendar.totalContributions ?? 0, days };
  } catch {
    return null;
  }
}

export interface RawPublicEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string; url: string };
  payload: Record<string, unknown>;
}

/**
 * GitHub's public events feed — no token required, since it only ever
 * returns activity that's already public. This is the source for the
 * commits/PRs/issues activity feed; GitHub caps this endpoint at the most
 * recent ~90 days / 300 events regardless of pagination, so it is a recency
 * window, not a full history.
 */
export async function fetchPublicEvents(username: string): Promise<RawPublicEvent[]> {
  const events: RawPublicEvent[] = [];
  for (let page = 1; page <= 3; page++) {
    try {
      const res = await get(`/users/${username}/events/public?per_page=100&page=${page}`);
      if (!res.ok) break;
      const batch: RawPublicEvent[] = await res.json();
      events.push(...batch);
      if (batch.length < 100) break;
    } catch {
      break;
    }
  }
  return events;
}

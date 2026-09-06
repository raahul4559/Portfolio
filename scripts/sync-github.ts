/**
 * Build-time GitHub sync. Run via `npm run sync:github`, or automatically
 * before every `npm run build`. Fetches real repository data, scores and
 * selects the strongest ones (or honors `content/featured.ts` if it's
 * non-empty), extracts a portfolio-shaped summary from each README, merges
 * in the hand-authored story from `content/project-stories.ts`, and writes
 * the result to `content/github.generated.ts` — a plain, typed, statically
 * importable file the app reads exactly like its other content.
 *
 * Runs entirely server-side, at build time, never in the browser: nothing
 * under app/ or components/ imports this script or lib/github/*, so a
 * GITHUB_TOKEN set here never reaches a client bundle.
 *
 * On any failure — no network, bad token, rate limit, GitHub down — this
 * logs a warning and leaves the existing generated file untouched rather
 * than failing the build. A portfolio with slightly stale project data
 * beats one that won't deploy.
 */
import { existsSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  fetchCommits,
  fetchCommitsByAuthor,
  fetchContributionActivity,
  fetchContributionCalendar,
  fetchContributorCommitCount,
  fetchLanguages,
  fetchPublicEvents,
  fetchReadme,
  fetchRepoByFullName,
  fetchRepos,
  fetchUser,
  type RawRepo,
} from "../lib/github/api.ts";
import { computeStreaks, mapPublicEvents } from "../lib/github/activity.ts";
import { extractTechnologies, parseReadme } from "../lib/github/readme.ts";
import { categorize, selectFeatured } from "../lib/github/score.ts";
import { contributionProjects } from "../content/contributions.ts";
import { featuredProjects } from "../content/featured.ts";
import { projectStories } from "../content/project-stories.ts";
import type {
  ActivityStats,
  ContributionYear,
  GitHubProfile,
  Project,
  ProjectStatus,
  RecentActivityItem,
  StreakStats,
} from "../content/types.ts";

/** How many calendar years back the heatmap's yearly nav goes, capped so a
 *  long-lived account doesn't turn one sync into dozens of GraphQL calls. */
const MAX_CALENDAR_YEARS = 4;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "../content/github.generated.ts");
const USERNAME = process.env.GITHUB_USERNAME || "raahul4559";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function deriveStatus(repo: RawRepo, override?: ProjectStatus): ProjectStatus {
  if (override) return override;
  return repo.archived ? "archived" : "live";
}

function isPlaceholderBio(bio: string | null): boolean {
  if (!bio) return true;
  return /tell us a little bit about yourself/i.test(bio.trim());
}

/** READMEs mostly link images with paths relative to the repo, not full
 *  URLs — resolve those against raw.githubusercontent.com so they actually
 *  render outside of GitHub's own UI. */
function resolveImageUrl(src: string, fullName: string, branch: string): string {
  if (/^https?:\/\//.test(src)) return src;
  const cleaned = src.replace(/^\.?\//, "");
  return `https://raw.githubusercontent.com/${fullName}/${branch}/${cleaned}`;
}

async function main() {
  console.log(`→ Syncing GitHub data for ${USERNAME}...`);
  if (!process.env.GITHUB_TOKEN) {
    console.log("  (no GITHUB_TOKEN — unauthenticated: 60 req/hr, no activity section)");
  }

  let user;
  try {
    user = await fetchUser(USERNAME);
  } catch (err) {
    console.warn(`  ! Could not fetch GitHub user "${USERNAME}": ${(err as Error).message}`);
    console.warn(
      existsSync(OUTPUT_PATH)
        ? "  ! Leaving the existing generated content untouched."
        : "  ! No prior generated content exists — the site will show an empty project list until this succeeds.",
    );
    return;
  }

  const repos = await fetchRepos(USERNAME);
  if (repos.length === 0) {
    console.warn("  ! No repositories returned — leaving existing generated content untouched.");
    return;
  }
  console.log(`  found ${repos.length} repositories`);

  const readmes = new Map<string, string | null>();
  const languages = new Map<string, string[]>();
  for (const repo of repos) {
    readmes.set(repo.full_name, await fetchReadme(repo.full_name));
    languages.set(repo.full_name, await fetchLanguages(repo.full_name));
  }

  const featuredRepos = selectFeatured(repos, readmes, featuredProjects);
  const featuredNames = new Set(featuredRepos.map((r) => r.name));
  console.log(
    `  featuring (${featuredProjects.length > 0 ? "manual" : "automatic"}): ${
      featuredRepos.map((r) => r.name).join(", ") || "(none met the quality floor)"
    }`,
  );

  const projects: Project[] = [];

  for (const repo of repos) {
    const readme = readmes.get(repo.full_name) ?? null;
    const repoLanguages = languages.get(repo.full_name) ?? (repo.language ? [repo.language] : []);
    const parsed = readme ? parseReadme(readme) : null;
    const story = projectStories[repo.name] ?? {};
    const isFeatured = featuredNames.has(repo.name);

    const technologies = extractTechnologies(`${repo.description ?? ""} ${readme ?? ""}`, repoLanguages);
    const commits = isFeatured ? await fetchCommits(repo.full_name, 12) : [];
    const license =
      repo.license && repo.license.spdx_id !== "NOASSERTION" ? repo.license.spdx_id : undefined;

    const screenshots = (parsed?.images ?? [])
      .map((src) => resolveImageUrl(src, repo.full_name, repo.default_branch))
      .filter((url) => !/shields\.io|badge/i.test(url))
      .slice(0, 4);

    projects.push({
      slug: slugify(repo.name),
      year: String(new Date(repo.created_at).getFullYear()),
      status: deriveStatus(repo, story.status),
      featured: isFeatured,

      name: repo.name,
      description:
        story.description ||
        repo.description ||
        parsed?.overview ||
        `A ${repoLanguages[0] ?? "code"} project.`,
      problem: story.problem ?? "",
      solution: story.solution ?? [],
      role: story.role ?? "Solo",
      technologies,
      features: parsed?.features ?? [],
      architecture: story.architecture ?? [],
      challenges: story.challenges ?? [],
      results: story.results ?? [],
      lessons: story.lessons ?? [],
      screenshots,
      links: {
        github: repo.html_url,
        live: story.live || repo.homepage || undefined,
      },
      retro: story.retro,

      github: {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        openIssues: repo.open_issues_count,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        topics: repo.topics,
        license,
        defaultBranch: repo.default_branch,
        isFork: repo.fork,
        isArchived: repo.archived,
        languages: repoLanguages,
        categories: categorize(repo, readme, repoLanguages),
        commits: commits.map((c) => ({
          sha: c.sha.slice(0, 7),
          message: c.commit.message.split("\n")[0],
          date: c.commit.author?.date ?? repo.updated_at,
          url: c.html_url,
        })),
      },
    });
  }

  // Repos you don't own but contributed to — fetched directly, since
  // `/users/{you}/repos` only ever lists your own. Real commit count comes
  // from GitHub's own contributor stats, not a claim.
  const usedSlugs = new Set(projects.map((p) => p.slug));
  for (const fullName of contributionProjects) {
    const owner = fullName.split("/")[0];
    const repo = await fetchRepoByFullName(fullName);
    if (!repo) {
      console.warn(`  ! Could not fetch contribution repo "${fullName}" — skipping.`);
      continue;
    }

    const readme = await fetchReadme(fullName);
    const repoLanguages = await fetchLanguages(fullName);
    const parsed = readme ? parseReadme(readme) : null;
    const story = projectStories[repo.name] ?? {};
    const isFeatured = featuredProjects.includes(repo.name);

    const technologies = extractTechnologies(`${repo.description ?? ""} ${readme ?? ""}`, repoLanguages);
    const commitCount = await fetchContributorCommitCount(fullName, USERNAME);
    const commits = await fetchCommitsByAuthor(fullName, USERNAME, 12);
    const license =
      repo.license && repo.license.spdx_id !== "NOASSERTION" ? repo.license.spdx_id : undefined;

    const screenshots = (parsed?.images ?? [])
      .map((src) => resolveImageUrl(src, fullName, repo.default_branch))
      .filter((url) => !/shields\.io|badge/i.test(url))
      .slice(0, 4);

    let slug = slugify(repo.name);
    if (usedSlugs.has(slug)) slug = slugify(`${owner}-${repo.name}`);
    usedSlugs.add(slug);

    const results = [...(story.results ?? [])];
    if (commitCount !== null) {
      results.unshift(`${commitCount} commit${commitCount === 1 ? "" : "s"} merged into ${fullName}`);
    }

    projects.push({
      slug,
      year: String(new Date(repo.created_at).getFullYear()),
      status: deriveStatus(repo, story.status),
      featured: isFeatured,

      name: repo.name,
      description:
        story.description ||
        repo.description ||
        parsed?.overview ||
        `A ${repoLanguages[0] ?? "code"} project.`,
      problem: story.problem ?? "",
      solution: story.solution ?? [],
      role: story.role ?? "Contributor",
      technologies,
      features: parsed?.features ?? [],
      architecture: story.architecture ?? [],
      challenges: story.challenges ?? [],
      results,
      lessons: story.lessons ?? [],
      screenshots,
      links: {
        github: repo.html_url,
        live: story.live || repo.homepage || undefined,
      },
      retro: story.retro,

      github: {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        openIssues: repo.open_issues_count,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        topics: repo.topics,
        license,
        defaultBranch: repo.default_branch,
        isFork: repo.fork,
        isArchived: repo.archived,
        languages: repoLanguages,
        categories: Array.from(new Set([...categorize(repo, readme, repoLanguages), "open-source" as const])),
        commits: commits.map((c) => ({
          sha: c.sha.slice(0, 7),
          message: c.commit.message.split("\n")[0],
          date: c.commit.author?.date ?? repo.updated_at,
          url: c.html_url,
        })),
        contributionOwner: owner,
      },
    });
    console.log(
      `  contribution: ${fullName} — ${commitCount ?? "unknown"} commits by ${USERNAME}`,
    );
  }

  // Featured first (manual order if set, else score order — selectFeatured
  // already returned them in the right order), then the rest by recency.
  const featuredOrder = new Map(featuredRepos.map((r, i) => [r.name, i]));
  projects.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.featured && b.featured) {
      return (featuredOrder.get(a.name) ?? 0) - (featuredOrder.get(b.name) ?? 0);
    }
    return new Date(b.github!.updatedAt).getTime() - new Date(a.github!.updatedAt).getTime();
  });

  const githubProfile: GitHubProfile = {
    login: user.login,
    name: user.name,
    avatarUrl: user.avatar_url,
    bio: isPlaceholderBio(user.bio) ? null : user.bio,
    location: user.location,
    blog: user.blog || null,
    htmlUrl: user.html_url,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
  };

  let activityStats: ActivityStats | null = null;
  const activity = await fetchContributionActivity(USERNAME);
  if (activity) {
    activityStats = { year: new Date().getFullYear(), ...activity };
    console.log(`  activity: ${activity.totalCommits} commits this year (via GraphQL)`);
  } else {
    console.log("  activity: unavailable — Developer Activity section will be hidden");
  }

  const currentYear = new Date().getUTCFullYear();
  const joinYear = new Date(user.created_at).getUTCFullYear();
  const yearsToFetch = Math.min(currentYear - joinYear + 1, MAX_CALENDAR_YEARS);

  const contributionYears: ContributionYear[] = [];
  for (let i = 0; i < yearsToFetch; i++) {
    const year = currentYear - i;
    const calendar = await fetchContributionCalendar(USERNAME, year);
    if (calendar) contributionYears.push({ year, total: calendar.total, days: calendar.days });
  }
  if (contributionYears.length > 0) {
    console.log(`  contribution calendar: ${contributionYears.length} year(s) via GraphQL`);
  } else {
    console.log("  contribution calendar: unavailable — heatmap will be hidden");
  }

  const streaks: StreakStats | null = computeStreaks(contributionYears);

  const publicEvents = await fetchPublicEvents(USERNAME);
  const recentActivity: RecentActivityItem[] = mapPublicEvents(publicEvents);
  console.log(`  recent activity: ${recentActivity.length} events from the public feed`);

  writeGeneratedFile({
    projects,
    githubProfile,
    activityStats,
    contributionYears,
    streaks,
    recentActivity,
  });
  console.log(`✓ Wrote ${projects.length} projects to content/github.generated.ts`);
}

function writeGeneratedFile(data: {
  projects: Project[];
  githubProfile: GitHubProfile;
  activityStats: ActivityStats | null;
  contributionYears: ContributionYear[];
  streaks: StreakStats | null;
  recentActivity: RecentActivityItem[];
}) {
  const banner = `/**
 * GENERATED FILE — do not edit by hand.
 *
 * Produced by \`scripts/sync-github.ts\` from ${USERNAME}'s real GitHub
 * repositories, merged with content/featured.ts (manual featured override)
 * and content/project-stories.ts (hand-authored narrative). Regenerate with
 * \`npm run sync:github\`, or just \`npm run build\` — it runs automatically.
 *
 * Last synced: ${new Date().toISOString()}
 */
import type {
  ActivityStats,
  ContributionYear,
  GitHubProfile,
  Project,
  RecentActivityItem,
  StreakStats,
} from "./types";

`;

  const body =
    `export const githubProjects: Project[] = ${JSON.stringify(data.projects, null, 2)};\n\n` +
    `export const githubProfile: GitHubProfile = ${JSON.stringify(data.githubProfile, null, 2)};\n\n` +
    `export const activityStats: ActivityStats | null = ${JSON.stringify(data.activityStats, null, 2)};\n\n` +
    `export const contributionYears: ContributionYear[] = ${JSON.stringify(data.contributionYears, null, 2)};\n\n` +
    `export const streaks: StreakStats | null = ${JSON.stringify(data.streaks, null, 2)};\n\n` +
    `export const recentActivity: RecentActivityItem[] = ${JSON.stringify(data.recentActivity, null, 2)};\n`;

  writeFileSync(OUTPUT_PATH, banner + body, "utf-8");
}

main().catch((err) => {
  console.error("  ! Sync script crashed:", err);
  console.warn("  ! Leaving existing generated content untouched — the build will continue.");
});

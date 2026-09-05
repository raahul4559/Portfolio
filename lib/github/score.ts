import type { ProjectCategory } from "../../content/types.ts";
import type { RawRepo } from "./api.ts";

/**
 * Repo-name and README-language patterns that read as a tutorial, exercise,
 * or boilerplate rather than a project someone set out to build. Generic on
 * purpose — this has to work for whatever repos show up next year, not just
 * the ones in front of it today.
 */
const PRACTICE_NAME_RE =
  /(^|[-_])(learning|basic|test|tutorial|demo|sample|boilerplate|template|practice|exercise|assignment|homework|starter|scratch|playground|sandbox|hello-?world)([-_]|$)/i;

const PRACTICE_README_RE =
  /\b(designed as a learning|learning exercise|practice project|just (for )?(learning|practice)|following a tutorial|course project|udemy|coursera)\b/i;

export function looksLikePractice(repo: RawRepo, readme: string | null): boolean {
  if (PRACTICE_NAME_RE.test(repo.name)) return true;
  if (readme && PRACTICE_README_RE.test(readme)) return true;
  if (!readme && !repo.description && repo.size < 20) return true;
  return false;
}

function recencyScore(updatedAt: string): number {
  const days = (Date.now() - new Date(updatedAt).getTime()) / 86_400_000;
  if (days < 30) return 15;
  if (days < 90) return 12;
  if (days < 180) return 8;
  if (days < 365) return 4;
  return 0;
}

function readmeScore(readme: string | null): number {
  if (!readme) return 0;
  const len = readme.length;
  const headings = (readme.match(/^#{1,3}\s/gm) ?? []).length;
  let score = 0;
  if (len > 200) score += 8;
  if (len > 800) score += 8;
  if (len > 2000) score += 6;
  score += Math.min(headings * 2, 10);
  return score;
}

/**
 * Weighted score across the criteria the user actually asked for: ownership
 * (not a fork), recent activity, README quality, completeness (description,
 * license, topics, homepage), and real-world signal (a live demo, stars).
 * Every weight here is a judgment call, not a formula from anywhere — tuned
 * to rank "real project with a real README" above "repo with a name and
 * nothing else," which is the actual problem this needs to solve.
 */
export function scoreRepo(repo: RawRepo, readme: string | null): number {
  let score = 0;

  if (repo.fork) score -= 25;
  if (repo.archived) score -= 10;
  if (repo.description) score += 8;
  if (repo.homepage) score += 20;
  if (repo.license) score += 4;
  if (repo.topics.length > 0) score += Math.min(repo.topics.length * 2, 8);

  score += Math.min(Math.log2(repo.stargazers_count + 1) * 6, 24);
  score += Math.min(Math.log2(repo.forks_count + 1) * 4, 12);
  score += Math.min(Math.log2(repo.size + 1) * 1.5, 12);

  score += recencyScore(repo.updated_at);
  score += readmeScore(readme);

  if (looksLikePractice(repo, readme)) score -= 30;

  return Math.round(score);
}

/** Manual list (from `content/featured.ts`) always wins, in the order
 *  given. Empty list falls back to ranking every non-fork repo and keeping
 *  whatever clears a quality floor, capped at 8 — never padded with weak
 *  repos just to hit a target count. */
export function selectFeatured(
  repos: RawRepo[],
  readmes: Map<string, string | null>,
  manual: string[],
): RawRepo[] {
  if (manual.length > 0) {
    return manual
      .map((name) => repos.find((r) => r.name === name))
      .filter((r): r is RawRepo => Boolean(r));
  }

  const QUALITY_FLOOR = 20;
  const MAX_FEATURED = 8;

  return repos
    .filter((r) => !r.fork)
    .map((repo) => ({ repo, score: scoreRepo(repo, readmes.get(repo.full_name) ?? null) }))
    .sort((a, b) => b.score - a.score)
    .filter((s) => s.score >= QUALITY_FLOOR)
    .slice(0, MAX_FEATURED)
    .map((s) => s.repo);
}

const AI_RE =
  /\b(machine learning|neural network|tensorflow|pytorch|keras|scikit-learn|mediapipe|nlp|computer vision|large language model|\bllm\b|opencv|classifier|inference|model\.h5|dataset)\b/i;
const MOBILE_RE = /\b(react-native|flutter|android|ios app|swiftui|expo)\b/i;
const WEB_LANGS = new Set(["JavaScript", "TypeScript", "HTML", "CSS", "Vue", "Svelte"]);
const MOBILE_LANGS = new Set(["Swift", "Kotlin", "Dart", "Objective-C"]);

/** A repo can carry more than one tag — inferred, never hand-set, so the
 *  filter bar stays honest about what's actually in each repository. */
export function categorize(
  repo: RawRepo,
  readme: string | null,
  languages: string[],
): ProjectCategory[] {
  const categories: ProjectCategory[] = [];
  const text = `${repo.description ?? ""} ${readme ?? ""} ${repo.topics.join(" ")}`.toLowerCase();

  if (AI_RE.test(text) || languages.includes("Jupyter Notebook")) categories.push("ai");
  if (MOBILE_RE.test(text) || languages.some((l) => MOBILE_LANGS.has(l))) categories.push("mobile");
  if (languages.some((l) => WEB_LANGS.has(l)) || repo.homepage) categories.push("web");
  if (!repo.fork && (repo.license !== null || repo.stargazers_count > 0)) {
    categories.push("open-source");
  }
  if (looksLikePractice(repo, readme)) categories.push("experiment");

  return categories.length > 0 ? categories : ["experiment"];
}

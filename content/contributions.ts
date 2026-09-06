/**
 * Repos you don't own but genuinely contributed to — read by
 * `scripts/sync-github.ts`, kept separate from `content/featured.ts` since
 * these need a different fetch path entirely (a repo under someone else's
 * account is invisible to `/users/{you}/repos`, so each one is looked up
 * directly by owner/repo).
 *
 * `"owner/repo"`, exactly as it appears in the GitHub URL. Each one gets its
 * own project page, tagged `role: "Contributor"` and category `open-source`,
 * with a real commit count pulled from GitHub's contributor stats — not
 * claimed, verified. Not featured by default; add the repo name to
 * `content/featured.ts` too if you want one to headline the site.
 */
export const contributionProjects: string[] = [
  "avinrique/deepak-inventory",
  "nitish-sah-js/EasyGo",
  "swarajsah143/MedConsul",
];

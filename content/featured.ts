/**
 * Manual override for which GitHub repositories headline the portfolio —
 * read by `scripts/sync-github.ts`, not by the app directly.
 *
 * Non-empty: these repos are featured, in this order, full stop — the
 * automatic quality ranking never runs. Empty: automatic mode, the sync
 * script scores every repo (README quality, real activity, whether the name
 * and content look like a tutorial/practice/boilerplate repo, and so on)
 * and features the strongest ~4–8.
 *
 * Repo names, exactly as they appear in the GitHub URL — case-sensitive.
 *
 * `Portfolio` is on this list on purpose: automatic scoring reads it low
 * right now because its actual GitHub README is still the unedited
 * `create-next-app` default, even though it's the most substantial thing
 * here. `content/project-stories.ts` carries the real story for it instead.
 * Worth writing that repo a real README regardless — GitHub visitors don't
 * see this site's version of it.
 */
export const featuredProjects: string[] = [
  "Portfolio",
  "sign-language-detection",
  "consultancy",
  "Ecommerce-backend",
];

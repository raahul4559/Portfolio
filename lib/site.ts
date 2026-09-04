/**
 * The one place the production URL lives — metadataBase, robots.ts, and
 * sitemap.ts all read this instead of each hardcoding their own copy of it.
 *
 * `NEXT_PUBLIC_SITE_URL` is the manual override for a custom domain.
 * `VERCEL_PROJECT_PRODUCTION_URL` is set automatically by Vercel and needs
 * no configuration at all on that platform. localhost is the dev fallback,
 * so nothing here ever prints a placeholder like `example.com`.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

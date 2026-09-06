import { ActivityTabs } from "@/components/modules/ActivityTabs";
import { Document, DocumentHead, Section } from "@/components/ui/Document";
import { BarRows, ChipRow, Metric } from "@/components/ui/bits";
import { githubProfile, projects } from "@/content";

/**
 * `activity/insights` — aggregates the same real `github` metadata the
 * projects index already reads (see `content/github.generated.ts`). Nothing
 * here is a separate, hand-curated number that could drift from the repos
 * themselves.
 */
export function ActivityInsightsModule() {
  const withGithub = projects.filter((p) => p.github);
  const totalStars = withGithub.reduce((n, p) => n + (p.github?.stars ?? 0), 0);
  const totalForks = withGithub.reduce((n, p) => n + (p.github?.forks ?? 0), 0);

  const languageCounts = new Map<string, number>();
  for (const p of withGithub) {
    const primary = p.github?.languages[0];
    if (primary) languageCounts.set(primary, (languageCounts.get(primary) ?? 0) + 1);
  }
  const languageRows = [...languageCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([label, value]) => ({ label, value }));

  const allLanguages = [...new Set(withGithub.flatMap((p) => p.github?.languages ?? []))].sort();

  const mostRecent = [...withGithub]
    .sort((a, b) => new Date(b.github!.updatedAt).getTime() - new Date(a.github!.updatedAt).getTime())
    .slice(0, 6);

  return (
    <Document wide>
      <DocumentHead
        eyebrow="activity/insights"
        title="Developer insights"
        summary="Aggregated from real repository metadata — primary languages by repo count, total stars and forks, and whichever repos actually saw a push most recently."
      />

      <ActivityTabs active="/activity/insights" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric value={String(githubProfile.publicRepos)} label="public repos" />
        <Metric value={String(totalStars)} label="total stars" />
        <Metric value={String(totalForks)} label="total forks" />
        <Metric value={String(githubProfile.followers)} label="followers" />
      </div>

      {languageRows.length > 0 && (
        <Section label="primary language" count={languageRows.length}>
          <p className="text-ui text-faint -mt-2 mb-5">
            Repos counted by their dominant language, not lines of code.
          </p>
          <BarRows rows={languageRows} />
        </Section>
      )}

      {allLanguages.length > 0 && (
        <Section label="all languages used" count={allLanguages.length}>
          <ChipRow items={allLanguages} />
        </Section>
      )}

      {mostRecent.length > 0 && (
        <Section label="recently active repositories" count={mostRecent.length}>
          <ul>
            {mostRecent.map((p) => (
              <li
                key={p.slug}
                className="hair-b flex items-baseline justify-between gap-4 py-3 last:border-b-0"
              >
                <div className="min-w-0">
                  <a
                    href={`/projects/${p.slug}`}
                    className="text-text hover:text-accent font-mono text-data transition-colors duration-150"
                  >
                    {p.name}
                  </a>
                  <p className="text-faint mt-0.5 truncate font-mono text-micro">
                    {p.description}
                  </p>
                </div>
                <span className="text-faint tnum shrink-0 font-mono text-micro">
                  {new Date(p.github!.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </Document>
  );
}

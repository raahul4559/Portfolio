import { Section } from "@/components/ui/Document";
import type { Project } from "@/content/types";

/**
 * The git activity/history section, framed as the CHANGELOG.md a real
 * repository would keep. When a project was synced from GitHub, this reads
 * its actual recent commits — real hashes, real messages, real dates. Only
 * a project with no GitHub commit data (or none at all) falls back to
 * rendering its `solution` steps as a synthesized log, in which case the
 * hash beside each entry is fabricated but stable — the same honest
 * convention the terminal's `ls -l` byte sizes already use (content/index.ts)
 * — never a claim about a real commit.
 */

/** Deterministic 7-char hex "hash" — a pure function of the message, so
 *  server and client always agree and nothing here depends on real git. */
function shortHash(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

function version(index: number, total: number): string {
  if (index === total - 1) return "v1.0.0";
  return `v0.${index + 1}.0`;
}

function formatDate(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}

interface Entry {
  hash: string;
  tag?: string;
  date?: string;
  message: string;
  url?: string;
}

export function ProjectChangelog({ project }: { project: Project }) {
  const realCommits = project.github?.commits ?? [];

  const entries: Entry[] =
    realCommits.length > 0
      ? realCommits.map((c) => ({
          hash: c.sha,
          date: formatDate(c.date),
          message: c.message,
          url: c.url,
        }))
      : [...project.solution]
          .map((message, i, arr) => ({
            hash: shortHash(`${project.slug}:${i}:${message}`),
            tag: version(i, arr.length),
            message,
          }))
          .reverse();

  return (
    <Section label="activity" count={entries.length ? `${entries.length} commits` : undefined}>
      {entries.length === 0 ? (
        <p className="border-line text-faint rounded-sm border border-dashed px-4 py-3 font-mono text-micro">
          No commit activity available for this repository yet.
        </p>
      ) : (
        <ol className="border-line relative space-y-6 border-l pl-6">
          {entries.map((entry, i) => (
            <li key={entry.hash} className="relative">
              <span
                aria-hidden
                className={`absolute top-[0.35rem] -left-[calc(1.5rem+3.5px)] size-[7px] rounded-full ${
                  i === 0 ? "bg-accent" : "bg-line-strong"
                }`}
              />
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                {entry.url ? (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-faint hover:text-accent tnum font-mono text-micro underline decoration-1 underline-offset-4 transition-colors duration-150"
                  >
                    {entry.hash}
                  </a>
                ) : (
                  <span className="text-faint tnum font-mono text-micro">{entry.hash}</span>
                )}
                {entry.tag && (
                  <span className="text-faint font-mono text-micro">{entry.tag}</span>
                )}
                {entry.date && (
                  <span className="text-faint tnum font-mono text-micro">{entry.date}</span>
                )}
                {i === 0 && (
                  <span className="text-accent font-mono text-micro">HEAD</span>
                )}
              </div>
              <p className="text-ui text-muted mt-1 text-pretty">{entry.message}</p>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}

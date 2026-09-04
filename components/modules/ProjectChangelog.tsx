import { Section } from "@/components/ui/Document";
import type { Project } from "@/content/types";

/**
 * The git activity/history section, framed as the CHANGELOG.md a real
 * repository would keep. Every message is the project's own `solution`
 * step — nothing is invented — read in the order it was actually built, so
 * the log tells the same story a `git log --reverse` would.
 *
 * The hash beside each entry is fabricated but stable — a stylistic device,
 * the same honest convention the terminal's `ls -l` byte sizes already use
 * (see content/index.ts) — never a claim about a real commit.
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

export function ProjectChangelog({ project }: { project: Project }) {
  const total = project.solution.length;
  // Newest first, the way a real CHANGELOG reads.
  const entries = project.solution
    .map((message, i) => ({
      message,
      hash: shortHash(`${project.slug}:${i}:${message}`),
      tag: version(i, total),
    }))
    .reverse();

  return (
    <Section label="activity" count={`${entries.length} commits`}>
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
              <span className="text-faint tnum font-mono text-micro">
                {entry.hash}
              </span>
              <span className="text-faint font-mono text-micro">
                {entry.tag}
              </span>
              {i === 0 && (
                <span className="text-accent font-mono text-micro">HEAD</span>
              )}
            </div>
            <p className="text-ui text-muted mt-1 text-pretty">{entry.message}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

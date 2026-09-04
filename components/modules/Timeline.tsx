import { Document, DocumentHead } from "@/components/ui/Document";
import { ChipRow } from "@/components/ui/bits";
import { timeline } from "@/content";
import type { TimelineKind } from "@/content/types";

const KIND_LABEL: Record<TimelineKind, string> = {
  work: "work",
  education: "education",
  project: "project",
  milestone: "milestone",
};

/**
 * Reads like a log: a mono date gutter, a hairline running down the page, and
 * a marker per entry. The only live marker is the current role.
 */
export function TimelineModule() {
  return (
    <Document>
      <DocumentHead
        eyebrow="timeline.log"
        title="Where I've worked"
        summary="Reverse chronological. The bullets are what changed because I was there, not what the job description said."
        aside={
          <span className="text-micro text-faint tnum font-mono">
            {timeline.length} entries
          </span>
        }
      />

      <ol className="border-line relative border-l pl-6 sm:pl-8">
        {timeline.map((entry) => {
          const present = entry.to === "present";
          return (
            <li key={entry.id} className="relative pb-12 last:pb-0">
              {/* Marker sits on the rule itself. Filled + accent only for now. */}
              <span
                aria-hidden
                className={`absolute top-[0.45rem] -left-[calc(1.5rem+3.5px)] size-[7px] rounded-full sm:-left-[calc(2rem+3.5px)] ${
                  present ? "bg-accent" : "bg-line-strong"
                }`}
              />

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-micro text-faint tnum font-mono">
                  {entry.from} — {present ? "now" : entry.to}
                </span>
                <span className="text-micro text-faint font-mono">
                  · {KIND_LABEL[entry.kind]}
                </span>
                {entry.location && (
                  <span className="text-micro text-faint hidden font-mono sm:inline">
                    · {entry.location}
                  </span>
                )}
              </div>

              <h2 className="text-h3 text-text mt-2 font-medium tracking-tight">
                {entry.role}
              </h2>
              <p className="text-ui text-muted mt-1 font-mono">{entry.org}</p>

              <ul className="mt-4 space-y-2.5">
                {entry.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 24)} className="flex gap-3">
                    <span
                      aria-hidden
                      className="text-faint mt-[0.5em] text-[8px] leading-none"
                    >
                      ▸
                    </span>
                    <p className="prose-os text-pretty">{bullet}</p>
                  </li>
                ))}
              </ul>

              {entry.stack && (
                <div className="mt-4">
                  <ChipRow items={entry.stack} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </Document>
  );
}

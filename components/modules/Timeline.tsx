"use client";

import { useState } from "react";

import { Document, DocumentHead } from "@/components/ui/Document";
import { ChipRow } from "@/components/ui/bits";
import { timeline } from "@/content";
import type { TimelineEntry, TimelineKind } from "@/content/types";

const KIND_LABEL: Record<TimelineKind, string> = {
  work: "work",
  education: "education",
  project: "project",
  milestone: "milestone",
};

/**
 * A git log, not a resume. The condensed list is the whole log at a glance —
 * `git log --oneline` — and selecting an entry is `git show <rev>`: the
 * detail renders in one panel below rather than every entry staying
 * permanently expanded, which is what actually made the old version hard to
 * scan once there were more than three jobs in it.
 */
export function TimelineModule() {
  const [selected, setSelected] = useState(timeline[0]?.id);
  const active = timeline.find((e) => e.id === selected) ?? timeline[0];

  return (
    <Document wide>
      <DocumentHead
        eyebrow="timeline.log"
        title="Where I've worked"
        summary="A git log, not a resume. Select an entry to see what actually changed because I was there."
        aside={
          <span className="text-micro text-faint tnum font-mono">
            {timeline.length} entries
          </span>
        }
      />

      <ol className="border-line relative mb-10 border-l pl-6 sm:pl-8">
        {timeline.map((entry) => {
          const present = entry.to === "present";
          const isActive = entry.id === active?.id;
          return (
            <li key={entry.id} className="relative">
              <span
                aria-hidden
                className={`absolute top-[0.6rem] -left-[calc(1.5rem+3.5px)] size-[7px] rounded-full transition-colors duration-150 sm:-left-[calc(2rem+3.5px)] ${
                  isActive ? "bg-accent" : present ? "bg-text" : "bg-line-strong"
                }`}
              />
              <button
                type="button"
                onClick={() => setSelected(entry.id)}
                aria-current={isActive ? "true" : undefined}
                className={`hover:bg-surface-2 -ml-3 flex w-[calc(100%+0.75rem)] flex-col gap-0.5 rounded-xs px-3 py-3 text-left transition-colors duration-150 ${
                  isActive ? "bg-accent-tint" : ""
                }`}
              >
                <span className="text-micro text-faint tnum font-mono">
                  {entry.from} ─── {present ? "Current" : entry.to}
                </span>
                <span
                  className={`text-ui font-medium tracking-tight ${isActive ? "text-text" : "text-muted"}`}
                >
                  {entry.role}
                </span>
                <span className="text-micro text-faint font-mono">
                  {entry.org}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {active && <TimelineDetail entry={active} />}
    </Document>
  );
}

function TimelineDetail({ entry }: { entry: TimelineEntry }) {
  const present = entry.to === "present";

  return (
    <div key={entry.id} className="layer anim-fade overflow-hidden rounded-sm">
      <div className="hair-b flex flex-wrap items-center gap-x-2.5 gap-y-1 px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="bg-line-strong size-[7px] rounded-full" />
          <span className="bg-line-strong size-[7px] rounded-full" />
          <span className="bg-line-strong size-[7px] rounded-full" />
        </span>
        <span className="text-faint font-mono text-micro">
          git show {entry.from}
          {present ? "..HEAD" : `..${entry.to}`}
        </span>
        <span className="text-faint font-mono text-micro">
          · {KIND_LABEL[entry.kind]}
        </span>
        {entry.location && (
          <span className="text-faint font-mono text-micro">
            · {entry.location}
          </span>
        )}
      </div>

      <div className="px-5 py-5 sm:px-6">
        <h2 className="text-h3 text-text font-medium tracking-tight">
          {entry.role}
        </h2>
        <p className="text-ui text-muted mt-1 font-mono">{entry.org}</p>

        <ul className="mt-5 space-y-2.5">
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
          <div className="mt-5">
            <ChipRow items={entry.stack} />
          </div>
        )}
      </div>
    </div>
  );
}

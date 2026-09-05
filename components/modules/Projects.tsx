"use client";

import { useMemo, useState } from "react";

import { ProjectRow } from "@/components/modules/ProjectRow";
import { Document, DocumentHead, Section } from "@/components/ui/Document";
import { projects } from "@/content";
import type { ProjectCategory } from "@/content/types";

type FilterId = "all" | "featured" | ProjectCategory;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI" },
  { id: "open-source", label: "Open Source" },
  { id: "experiment", label: "Experiments" },
];

/**
 * Defaults to "Featured," not "All" — the point of curating a featured set
 * is that a first-time visitor sees it first. Every real repository is
 * still here, one click away; nothing is hidden, just not first in line.
 */
export function ProjectsModule() {
  const [filter, setFilter] = useState<FilterId>("featured");

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "featured") return projects.filter((p) => p.featured);
    return projects.filter((p) => p.github?.categories.includes(filter));
  }, [filter]);

  return (
    <Document>
      <DocumentHead
        eyebrow="projects/"
        title="Selected work"
        summary="Synced from GitHub — real repositories, real commits, real READMEs turned into case studies. Each one opens as a source file, not a summary of it."
        aside={
          <span className="text-micro text-faint tnum font-mono">
            {projects.length} repositories
          </span>
        }
      />

      <div role="tablist" aria-label="Filter projects" className="mb-6 flex flex-wrap gap-1.5">
        {FILTERS.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={`label rounded-xs border px-2.5 py-1.5 transition-colors duration-150 ${
                active
                  ? "border-accent bg-accent-tint text-text"
                  : "border-line text-faint hover:text-text hover:bg-surface-2"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <Section label="index" count={filtered.length}>
        {filtered.length > 0 ? (
          <div>
            {filtered.map((project, i) => (
              <ProjectRow key={project.slug} project={project} n={i + 1} />
            ))}
          </div>
        ) : (
          <p className="text-faint py-10 text-center font-mono text-micro">
            No repositories match this filter yet.
          </p>
        )}
      </Section>
    </Document>
  );
}

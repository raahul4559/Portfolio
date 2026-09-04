import Link from "next/link";

import type { Project } from "@/content/types";
import { ChipRow, Ordinal, StatusChip } from "@/components/ui/bits";

/**
 * One project as a row. Shared by the README's selected work and the projects
 * index so the two can never describe the same project differently.
 *
 * The tagline stays visible rather than appearing on hover — a list you have
 * to hover to read is a list you can't scan.
 */
export function ProjectRow({ project, n }: { project: Project; n: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="hair-b group hover:bg-surface-2 -mx-3 grid grid-cols-[1.75rem_1fr_auto] items-start gap-x-3 gap-y-2 px-3 py-4 transition-colors duration-150 last:border-b-0 sm:gap-x-5"
    >
      <span className="pt-1">
        <Ordinal n={n} />
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-h3 text-text decoration-transparent group-hover:decoration-accent font-medium tracking-tight underline decoration-1 underline-offset-4 transition-colors duration-150">
            {project.name}
          </h3>
          <StatusChip status={project.status} />
        </div>

        <p className="text-ui text-muted mt-1.5 max-w-[54ch] text-pretty">
          {project.tagline}
        </p>

        <div className="mt-3">
          <ChipRow items={project.stack} />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <span className="text-micro text-faint tnum font-mono">{project.year}</span>
        <span
          aria-hidden
          className="text-faint group-hover:text-accent font-mono text-data leading-none transition-colors duration-150"
        >
          →
        </span>
      </div>
    </Link>
  );
}

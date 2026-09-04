import Link from "next/link";

import { ProjectCode } from "@/components/modules/ProjectCode";
import { Document, Section } from "@/components/ui/Document";
import { CtaButton, FrameBar, StatusChip } from "@/components/ui/bits";
import type { Project } from "@/content/types";

/**
 * A project is a file, not a card — this is the same rendered-document frame
 * used everywhere else code appears in the OS: a `read-only` mark, a real
 * filename, line numbers, syntax highlighting. `ProjectCode` prints the
 * actual `Project` object; nothing below the fold says anything the object
 * itself doesn't already say, except the two things a code string can't
 * do — show an image, or be a clickable link.
 */
export function ProjectDetail({ project }: { project: Project }) {
  return (
    <Document wide>
      <Link
        href="/projects"
        className="text-faint hover:text-text mb-8 inline-flex items-baseline gap-1.5 font-mono text-micro transition-colors duration-150"
      >
        <span aria-hidden>←</span>
        projects/
      </Link>

      <header className="anim-rise mb-8">
        <p className="label text-faint mb-3">
          projects/{project.slug}.ts
        </p>
        <h1 className="text-h1 sm:text-display text-text font-medium tracking-[-0.02em] text-balance">
          {project.name}
        </h1>
        <p className="text-ui text-faint mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono">
          <span>{project.role}</span>
          <span aria-hidden>·</span>
          <StatusChip status={project.status} />
          <span aria-hidden>·</span>
          <span className="tnum">{project.year}</span>
        </p>
      </header>

      <div className="layer overflow-hidden rounded-sm">
        <FrameBar filename={`${project.slug}.ts`} />
        <div className="overflow-x-auto px-5 py-4">
          <ProjectCode project={project} />
        </div>
      </div>

      <Section label="preview">
        <ScreenshotStrip screenshots={project.screenshots} name={project.name} />

        {(project.links.live || project.links.github) && (
          <div className="mt-5 flex flex-wrap gap-3">
            {project.links.live && (
              <CtaButton href={project.links.live} primary external>
                Live Demo
              </CtaButton>
            )}
            {project.links.github && (
              <CtaButton href={project.links.github} external>
                Source
              </CtaButton>
            )}
          </div>
        )}
      </Section>
    </Document>
  );
}

/**
 * Real screenshots slot in here the moment they exist — no filler renders
 * meanwhile. The empty state says so plainly instead of shipping a broken
 * `<img>` or a stock placeholder that pretends to be a product shot.
 *
 * Plain `<img>` on purpose: these are arbitrary-aspect-ratio shots the user
 * drops in later, and next/image's fixed pipeline buys nothing for content
 * that doesn't exist yet.
 */
function ScreenshotStrip({
  screenshots,
  name,
}: {
  screenshots: string[];
  name: string;
}) {
  if (screenshots.length === 0) {
    return (
      <div className="border-line text-faint flex h-40 items-center justify-center rounded-sm border border-dashed font-mono text-micro">
        no screenshots yet
      </div>
    );
  }

  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto">
      {screenshots.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`${name} — screenshot ${i + 1}`}
          className="border-line-strong h-40 w-auto shrink-0 rounded-sm border object-cover"
        />
      ))}
    </div>
  );
}

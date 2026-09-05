import { Section } from "@/components/ui/Document";
import type { Project } from "@/content/types";

/** A repo synced straight from GitHub with no entry yet in
 *  `content/project-stories.ts` — honest about the gap rather than
 *  inventing architecture notes GitHub's metadata can't actually supply. */
function NotWrittenYet({ what }: { what: string }) {
  return (
    <p className="border-line text-faint rounded-sm border border-dashed px-4 py-3 font-mono text-micro">
      Not written yet — {what} for this project hasn&apos;t been added to
      content/project-stories.ts.
    </p>
  );
}

/**
 * The engineering story, split out from README.md the way a real repository
 * separates "what it does" from "how it's built": the decisions that shaped
 * the system, what actually went wrong, and what carries forward from it.
 * This is the file that argues for engineering judgment, not the product.
 */
export function ProjectArchitecture({ project }: { project: Project }) {
  return (
    <div>
      <Section label="architecture">
        {project.architecture.length > 0 ? (
          <ul className="space-y-3">
            {project.architecture.map((point) => (
              <li key={point.slice(0, 24)} className="flex gap-3">
                <span
                  aria-hidden
                  className="text-faint mt-[0.5em] text-[8px] leading-none"
                >
                  ▸
                </span>
                <p className="prose-os text-pretty">{point}</p>
              </li>
            ))}
          </ul>
        ) : (
          <NotWrittenYet what="the architecture notes" />
        )}
      </Section>

      <Section label="challenges">
        {project.challenges.length > 0 ? (
          <ul className="space-y-3">
            {project.challenges.map((challenge) => (
              <li key={challenge.slice(0, 24)} className="flex gap-3">
                <span className="text-faint mt-[0.5em] text-[8px] leading-none" aria-hidden>
                  ▸
                </span>
                <p className="prose-os text-pretty">{challenge}</p>
              </li>
            ))}
          </ul>
        ) : (
          <NotWrittenYet what="the challenges" />
        )}
      </Section>

      <Section label="lessons learned">
        {project.lessons.length > 0 ? (
          <ul className="space-y-3">
            {project.lessons.map((lesson) => (
              <li key={lesson.slice(0, 24)} className="flex gap-3">
                <span className="text-faint mt-[0.5em] text-[8px] leading-none" aria-hidden>
                  ▸
                </span>
                <p className="prose-os text-pretty">{lesson}</p>
              </li>
            ))}
          </ul>
        ) : (
          <NotWrittenYet what="the lessons learned" />
        )}
      </Section>

      {project.retro && (
        <Section label="retro">
          <p className="prose-os text-pretty italic">{project.retro}</p>
        </Section>
      )}
    </div>
  );
}

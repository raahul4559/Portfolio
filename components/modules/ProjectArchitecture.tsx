import { Section } from "@/components/ui/Document";
import type { Project } from "@/content/types";

/**
 * The engineering story, split out from README.md the way a real repository
 * separates "what it does" from "how it's built": the decisions that shaped
 * the system, what actually went wrong, and what carries forward from it.
 * This is the file that argues for engineering judgment, not the product.
 */
export function ProjectArchitecture({ project }: { project: Project }) {
  return (
    <div>
      <Section label="architecture" count={project.architecture.length}>
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
      </Section>

      <Section label="challenges" count={project.challenges.length}>
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
      </Section>

      <Section label="lessons learned" count={project.lessons.length}>
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
      </Section>

      {project.retro && (
        <Section label="retro">
          <p className="prose-os text-pretty italic">{project.retro}</p>
        </Section>
      )}
    </div>
  );
}

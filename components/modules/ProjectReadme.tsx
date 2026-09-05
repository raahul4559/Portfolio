import { Section } from "@/components/ui/Document";
import { ChipRow, CtaButton } from "@/components/ui/bits";
import type { Project } from "@/content/types";

/**
 * The default file a repository opens to — the product story: what it is,
 * what problem it answers, how it was approached, what it does for a user,
 * and what came out of it. The engineering story (architecture, challenges,
 * lessons) lives in architecture.md instead, the same way a real README
 * defers implementation detail to its own doc.
 */
export function ProjectReadme({ project }: { project: Project }) {
  return (
    <div>
      {project.problem && (
        <Section label="problem">
          <p className="prose-os text-pretty">{project.problem}</p>
        </Section>
      )}

      {project.solution.length > 0 && (
        <Section label="solution">
          <ol className="space-y-2.5">
            {project.solution.map((step, i) => (
              <li key={step.slice(0, 24)} className="flex gap-3">
                <span className="text-faint tnum shrink-0 pt-[0.15em] font-mono text-micro">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="prose-os text-pretty">{step}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section label="features">
        {project.features.length > 0 ? (
          <ul className="space-y-2.5">
            {project.features.map((feature) => (
              <li key={feature.slice(0, 24)} className="flex gap-3">
                <span
                  aria-hidden
                  className="text-faint mt-[0.5em] text-[8px] leading-none"
                >
                  ▸
                </span>
                <p className="prose-os text-pretty">{feature}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-faint font-mono text-micro">
            No feature list found in the README.
          </p>
        )}
      </Section>

      {project.results.length > 0 && (
        <Section label="results" count={project.results.length}>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {project.results.map((result) => (
              <li
                key={result.slice(0, 24)}
                className="border-line rounded-xs border px-3 py-2.5"
              >
                <p className="text-ui text-muted text-pretty">{result}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section label="stack" count={project.technologies.length}>
        <ChipRow items={project.technologies} />
      </Section>

      <Section label="preview">
        <ScreenshotStrip screenshots={project.screenshots} name={project.name} />
      </Section>

      {(project.links.live || project.links.github) && (
        <div className="flex flex-wrap gap-3 pt-2">
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
    </div>
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

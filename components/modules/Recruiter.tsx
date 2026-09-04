import Link from "next/link";

import { ChipRow, CtaButton, StatusChip } from "@/components/ui/bits";
import { featuredProjects, profile, timeline, topSkills } from "@/content";

/**
 * The fast path. Same data as the interactive OS — `featuredProjects`,
 * `timeline`, `topSkills` are the exact same exports the rail-and-tabs
 * version reads from, so this page can never say something the rest of the
 * site doesn't already say. What's different is altitude: no exploring,
 * no terminal, nothing to figure out. One scroll, then a decision.
 *
 * Deliberately a server component — no theme toggle, no client state, as
 * little JS as the page can get away with. Speed is the feature here.
 */
export function RecruiterView() {
  const github = profile.socials.find((s) => s.label === "github");
  const workHistory = timeline.filter((t) => t.kind !== "education");
  const education = timeline.find((t) => t.kind === "education");

  return (
    <div className="mx-auto w-full max-w-[720px] px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-10 flex items-center justify-between gap-4">
        <span className="text-faint font-mono text-micro">{profile.host}</span>
        <Link
          href="/"
          className="text-faint hover:text-text font-mono text-micro underline decoration-1 underline-offset-4 transition-colors duration-150"
        >
          Explore the interactive site →
        </Link>
      </div>

      <header>
        <p className="label text-faint mb-3">quick view</p>
        <h1 className="text-h1 sm:text-display text-text font-medium tracking-[-0.02em] text-balance">
          {profile.name}
        </h1>
        <p className="text-h3 text-muted mt-1.5 font-mono font-normal">
          {profile.role}
        </p>
        <p className="text-body text-muted mt-4 max-w-[58ch] text-pretty">
          {profile.positioning}
        </p>
        <p className="text-ui text-faint mt-3 font-mono">
          {profile.availability.label} · {profile.location} · {profile.experience}{" "}
          experience
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <CtaButton href={profile.resume} primary external>
            Resume
          </CtaButton>
          <CtaButton href={`mailto:${profile.email}`} external>
            Contact
          </CtaButton>
          {github && (
            <CtaButton href={github.href} external>
              GitHub
            </CtaButton>
          )}
        </div>
      </header>

      <section className="mt-12">
        <h2 className="label text-muted hair-b mb-5 pb-2.5">strongest work</h2>
        <ul className="space-y-5">
          {featuredProjects.map((project) => (
            <li key={project.slug} className="hair-b pb-5 last:border-b-0 last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-h3 text-text decoration-transparent hover:decoration-accent font-medium tracking-tight underline decoration-1 underline-offset-4 transition-colors duration-150"
                >
                  {project.name}
                </Link>
                <StatusChip status={project.status} />
              </div>
              <p className="text-ui text-muted mt-1.5 max-w-[56ch] text-pretty">
                {project.description}
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-3">
                <ChipRow items={project.technologies} />
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-faint hover:text-accent font-mono text-micro underline decoration-1 underline-offset-4 transition-colors duration-150"
                  >
                    live ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="label text-muted hair-b mb-5 pb-2.5">experience</h2>
        <ul className="space-y-3">
          {workHistory.map((entry) => (
            <li key={entry.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <span className="text-text font-mono text-data">{entry.role}</span>
              <span className="text-faint font-mono text-micro">{entry.org}</span>
              <span className="text-faint tnum ml-auto font-mono text-micro">
                {entry.from}–{entry.to === "present" ? "now" : entry.to}
              </span>
            </li>
          ))}
        </ul>
        {education && (
          <p className="text-ui text-faint mt-3 font-mono">
            {education.role} — {education.org}
          </p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="label text-muted hair-b mb-5 pb-2.5">core skills</h2>
        <ChipRow items={topSkills} />
      </section>

      <footer className="hair-t mt-14 pt-6">
        <p className="text-ui text-faint">
          This is the fast version. The{" "}
          <Link
            href="/"
            className="text-muted hover:text-text decoration-line-strong hover:decoration-accent underline decoration-1 underline-offset-4 transition-colors duration-150"
          >
            interactive one
          </Link>{" "}
          has a terminal.
        </p>
      </footer>
    </div>
  );
}

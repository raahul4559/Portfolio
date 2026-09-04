import Link from "next/link";

import { ProjectRow } from "@/components/modules/ProjectRow";
import { Document, Section } from "@/components/ui/Document";
import { CtaButton, MetaList } from "@/components/ui/bits";
import { featuredProjects, profile, projects } from "@/content";
import { SHELL_USER } from "@/lib/commands";

export function ReadmeModule() {
  const github = profile.socials.find((s) => s.label === "github");

  return (
    <Document>
      <header className="anim-rise mb-10 sm:mb-14">
        <p className="label text-faint mb-4">readme.md</p>

        {/* Echoes the boot sequence's own shell — the desktop remembers
            where it came from instead of pretending the terminal never
            happened. You ran whoami; this machine answered for itself. */}
        <p className="font-mono text-data mb-6">
          <span className="text-accent">{SHELL_USER}</span>
          <span className="text-faint">@{profile.host}:~$</span>{" "}
          <span className="text-muted">whoami</span>
        </p>

        <h1 className="text-h1 sm:text-display text-text font-medium tracking-[-0.02em] text-balance">
          {profile.name}
        </h1>
        <p className="text-h3 text-muted mt-2 font-mono font-normal">
          {profile.role}
        </p>

        <p className="text-body text-muted mt-5 max-w-[62ch] text-pretty">
          {profile.positioning}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <CtaButton href="/projects" primary>
            View Projects
          </CtaButton>
          <CtaButton href="/timeline">Experience</CtaButton>
          <CtaButton href={profile.resume} external>
            Resume
          </CtaButton>
          <CtaButton href="/contact">Contact</CtaButton>
          {github && (
            <CtaButton href={github.href} external>
              GitHub
            </CtaButton>
          )}
        </div>

        <p className="text-ui text-faint mt-4 flex items-center gap-1.5">
          <span aria-hidden>→</span>
          Recruiting or hiring?{" "}
          <Link
            href="/recruiter"
            className="text-muted hover:text-text decoration-line-strong hover:decoration-accent underline decoration-1 underline-offset-4 transition-colors duration-150"
          >
            Try the 30-second version
          </Link>
          .
        </p>
      </header>

      <Section label="whoami">
        <MetaList
          items={[
            { key: "experience", value: profile.experience },
            { key: "location", value: `${profile.location} · ${profile.timezoneLabel}` },
            {
              key: "availability",
              value: (
                <span>
                  {profile.availability.label}
                  <span className="text-faint"> — {profile.availability.responseTime}</span>
                </span>
              ),
            },
            {
              key: "email",
              value: (
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-text decoration-line-strong hover:decoration-accent underline decoration-1 underline-offset-4 transition-colors duration-150"
                >
                  {profile.email}
                </a>
              ),
            },
          ]}
        />
      </Section>

      <Section label="about">
        <div className="prose-os space-y-4">
          {profile.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section label="selected work" count={`${featuredProjects.length} of ${projects.length}`}>
        <div>
          {featuredProjects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} n={i + 1} />
          ))}
        </div>

        <Link
          href="/projects"
          className="text-muted hover:text-text decoration-line-strong hover:decoration-accent mt-6 inline-flex items-baseline gap-1.5 font-mono text-data underline decoration-1 underline-offset-4 transition-colors duration-150"
        >
          all {projects.length} projects
          <span aria-hidden className="text-faint text-[10px]">
            →
          </span>
        </Link>
      </Section>

      <Section label="currently">
        <ul className="space-y-2.5">
          {profile.currently.map((item) => (
            <li key={item} className="text-body text-muted flex gap-3 text-pretty">
              <span aria-hidden className="text-faint mt-[0.45em] text-[8px] leading-none">
                ▸
              </span>
              <span className="max-w-[60ch]">{item}</span>
            </li>
          ))}
        </ul>
      </Section>
    </Document>
  );
}

import Link from "next/link";

import { ProjectRow } from "@/components/modules/ProjectRow";
import { Document, DocumentHead, Section } from "@/components/ui/Document";
import { MetaList } from "@/components/ui/bits";
import { featuredProjects, profile, projects } from "@/content";

export function ReadmeModule() {
  return (
    <Document>
      <DocumentHead
        eyebrow="readme.md"
        title={profile.name}
        summary={profile.positioning}
        aside={
          <span className="text-micro text-faint font-mono">
            {profile.location}
          </span>
        }
      />

      <Section label="whoami">
        <MetaList
          items={[
            { key: "role", value: profile.role },
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

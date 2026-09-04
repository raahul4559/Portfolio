import Link from "next/link";

import { Document, DocumentHead, Section } from "@/components/ui/Document";
import {
  ChipRow,
  ExternalLink,
  Metric,
  MetaList,
  StatusChip,
} from "@/components/ui/bits";
import type { Project } from "@/content/types";

/**
 * The case study. Ordered the way the work actually happened — context, then
 * the problem, then what was tried, then what came out of it — rather than as
 * a feature tour.
 */
export function ProjectDetail({ project }: { project: Project }) {
  return (
    <Document>
      <Link
        href="/projects"
        className="text-faint hover:text-text mb-8 inline-flex items-baseline gap-1.5 font-mono text-micro transition-colors duration-150"
      >
        <span aria-hidden>←</span>
        projects/
      </Link>

      <DocumentHead
        eyebrow={`projects/${project.slug}.md`}
        title={project.name}
        summary={project.summary}
        aside={<StatusChip status={project.status} />}
      />

      <Section label="metadata">
        <MetaList
          items={[
            { key: "year", value: project.year },
            { key: "role", value: project.role },
            { key: "stack", value: <ChipRow items={project.stack} /> },
          ]}
        />
      </Section>

      {project.metrics.length > 0 && (
        <Section label="outcome in numbers" count={project.metrics.length}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <Metric key={metric.label} {...metric} />
            ))}
          </div>
        </Section>
      )}

      <Section label="context">
        <p className="prose-os text-pretty">{project.context}</p>
      </Section>

      <Section label="problem">
        <p className="prose-os text-pretty">{project.problem}</p>
      </Section>

      <Section label="approach" count={project.approach.length}>
        <ol className="space-y-4">
          {project.approach.map((step, i) => (
            <li key={step.slice(0, 24)} className="flex gap-4">
              <span className="text-faint tnum shrink-0 pt-[0.3em] font-mono text-micro">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="prose-os text-pretty">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="result">
        <p className="prose-os text-pretty">{project.outcome}</p>
      </Section>

      {project.retro && (
        <Section label="what I'd do differently">
          {/* The accent edge is the one visual emphasis in a case study — it
              marks the paragraph most readers skip to. */}
          <blockquote className="border-accent border-l-2 pl-5">
            <p className="prose-os text-pretty">{project.retro}</p>
          </blockquote>
        </Section>
      )}

      {project.links.length > 0 && (
        <Section label="links">
          <ul className="space-y-3">
            {project.links.map((link) => (
              <li key={link.label}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </Document>
  );
}

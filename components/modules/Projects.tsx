import { ProjectRow } from "@/components/modules/ProjectRow";
import { Document, DocumentHead, Section } from "@/components/ui/Document";
import { projects } from "@/content";

export function ProjectsModule() {
  return (
    <Document>
      <DocumentHead
        eyebrow="projects/"
        title="Selected work"
        summary="Each of these has a write-up covering what the problem actually was, what I tried, and — where it applies — what I would do differently. The feature list is the least interesting part."
        aside={
          <span className="text-micro text-faint tnum font-mono">
            {projects.length} entries
          </span>
        }
      />

      <Section label="index" count={projects.length}>
        <div>
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} n={i + 1} />
          ))}
        </div>
      </Section>
    </Document>
  );
}

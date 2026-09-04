import { ProjectRow } from "@/components/modules/ProjectRow";
import { Document, DocumentHead, Section } from "@/components/ui/Document";
import { projects } from "@/content";

export function ProjectsModule() {
  return (
    <Document>
      <DocumentHead
        eyebrow="projects/"
        title="Selected work"
        summary="Each of these opens as a real source file — the object you're reading is the actual content, not a summary of it. Covers what the problem actually was, what I tried, and what came out of it."
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

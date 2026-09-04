import type { ReactNode } from "react";

import { CodeLines, Pn, Str } from "@/components/ui/code";
import type { Project } from "@/content/types";

/**
 * The stack, read as a real manifest instead of a chip row. Every key here
 * is a fact the `Project` object already states — `dependencies` is the
 * technology list, `scripts` points at the two commands that actually exist
 * (open the live build, open the source). Versions are intentionally
 * omitted rather than invented: "*" is the honest answer for a stack this
 * object doesn't pin.
 */
function buildLines(project: Project): ReactNode[] {
  const lines: ReactNode[] = [];
  const push = (node: ReactNode) => lines.push(node);
  const indent = (n: number, node: ReactNode) => (
    <span className={n === 1 ? "pl-4" : "pl-8"}>{node}</span>
  );

  push(<Pn>{"{"}</Pn>);
  push(indent(1, <><Str value="name" /><Pn>: </Pn><Str value={project.slug} /><Pn>,</Pn></>));
  push(indent(1, <><Str value="role" /><Pn>: </Pn><Str value={project.role} /><Pn>,</Pn></>));
  push(indent(1, <><Str value="status" /><Pn>: </Pn><Str value={project.status} /><Pn>,</Pn></>));
  push(indent(1, <><Str value="year" /><Pn>: </Pn><Str value={project.year} /><Pn>,</Pn></>));

  push(indent(1, <><Str value="dependencies" /><Pn>: {"{"}</Pn></>));
  project.technologies.forEach((tech, i) => {
    const last = i === project.technologies.length - 1;
    push(
      indent(
        2,
        <>
          <Str value={tech} />
          <Pn>: </Pn>
          <Str value="*" />
          <Pn>{last ? "" : ","}</Pn>
        </>,
      ),
    );
  });
  push(indent(1, <Pn>{"},"}</Pn>));

  push(indent(1, <><Str value="scripts" /><Pn>: {"{"}</Pn></>));
  push(
    indent(
      2,
      <>
        <Str value="demo" />
        <Pn>: </Pn>
        <Str value={project.links.live ?? "— not published"} />
        <Pn>,</Pn>
      </>,
    ),
  );
  push(
    indent(
      2,
      <>
        <Str value="source" />
        <Pn>: </Pn>
        <Str value={project.links.github ?? "— private"} />
      </>,
    ),
  );
  push(indent(1, <Pn>{"}"}</Pn>));

  push(<Pn>{"}"}</Pn>);

  return lines;
}

export function ProjectPackageJson({ project }: { project: Project }) {
  return <CodeLines lines={buildLines(project)} />;
}

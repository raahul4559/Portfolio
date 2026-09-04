import type { ReactNode } from "react";

import { CodeLines, Cm, Indent, Kw, Pn, Str, Ty, Var } from "@/components/ui/code";
import type { Project } from "@/content/types";

/**
 * Prints a `Project` as its own real TypeScript source — not a generic value
 * formatter, but a hand-laid-out rendering of this one known shape, because
 * that's what lets every field land in exactly the position a developer
 * would actually write it in (a long string breaking to its own line, an
 * empty `links` object still printing `{}` rather than disappearing).
 *
 * Building a flat line list first, then numbering by index, is what lets the
 * gutter stay correct no matter how long any one project's fields are —
 * nothing here is fixed-height.
 */

function buildLines(project: Project): ReactNode[] {
  const lines: ReactNode[] = [];
  const push = (node: ReactNode) => lines.push(node);

  const field = (key: string, value: string) =>
    push(
      <Indent depth={1}>
        <Var>{key}</Var>
        <Pn>: </Pn>
        <Str value={value} />
        <Pn>,</Pn>
      </Indent>,
    );

  const wrappedField = (key: string, value: string) => {
    push(
      <Indent depth={1}>
        <Var>{key}</Var>
        <Pn>:</Pn>
      </Indent>,
    );
    push(
      <Indent depth={2}>
        <Str value={value} />
        <Pn>,</Pn>
      </Indent>,
    );
  };

  const arrayField = (key: string, items: string[]) => {
    push(
      <Indent depth={1}>
        <Var>{key}</Var>
        <Pn>: [</Pn>
      </Indent>,
    );
    items.forEach((item) =>
      push(
        <Indent depth={2}>
          <Str value={item} />
          <Pn>,</Pn>
        </Indent>,
      ),
    );
    push(
      <Indent depth={1}>
        <Pn>],</Pn>
      </Indent>,
    );
  };

  push(
    <>
      <Kw>const</Kw> <Var>project</Var>
      <Pn>: </Pn>
      <Ty>Project</Ty> <Pn>{"= {"}</Pn>
    </>,
  );

  field("name", project.name);
  wrappedField("description", project.description);
  wrappedField("problem", project.problem);
  arrayField("solution", project.solution);
  field("role", project.role);
  arrayField("technologies", project.technologies);
  arrayField("features", project.features);
  arrayField("challenges", project.challenges);
  arrayField("results", project.results);

  const { live, github } = project.links;
  if (!live && !github) {
    push(
      <Indent depth={1}>
        <Var>links</Var>
        <Pn>: {"{},"}</Pn>
      </Indent>,
    );
  } else {
    push(
      <Indent depth={1}>
        <Var>links</Var>
        <Pn>: {"{"}</Pn>
      </Indent>,
    );
    if (live)
      push(
        <Indent depth={2}>
          <Var>live</Var>
          <Pn>: </Pn>
          <Str value={live} />
          <Pn>,</Pn>
        </Indent>,
      );
    if (github)
      push(
        <Indent depth={2}>
          <Var>github</Var>
          <Pn>: </Pn>
          <Str value={github} />
          <Pn>,</Pn>
        </Indent>,
      );
    push(
      <Indent depth={1}>
        <Pn>{"},"}</Pn>
      </Indent>,
    );
  }

  push(<Pn>{"};"}</Pn>);

  if (project.retro) {
    push(<Cm>{`// retro — ${project.retro}`}</Cm>);
  }

  return lines;
}

export function ProjectCode({ project }: { project: Project }) {
  return <CodeLines lines={buildLines(project)} />;
}

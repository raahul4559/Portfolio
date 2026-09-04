import type { ReactNode } from "react";

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

function Kw({ children }: { children: ReactNode }) {
  return <span className="text-syn-keyword">{children}</span>;
}
function Ty({ children }: { children: ReactNode }) {
  return <span className="text-syn-type">{children}</span>;
}
function Var({ children }: { children: ReactNode }) {
  return <span className="text-syn-variable">{children}</span>;
}
function Pn({ children }: { children: ReactNode }) {
  return <span className="text-syn-punct">{children}</span>;
}
function Cm({ children }: { children: ReactNode }) {
  return <span className="text-syn-comment italic">{children}</span>;
}
/** Quotes and colors a string value; only escapes the quote it introduces. */
function Str({ value }: { value: string }) {
  return (
    <span className="text-syn-string">
      &quot;{value.replaceAll('"', '\\"')}&quot;
    </span>
  );
}

function Indent({ depth, children }: { depth: 1 | 2; children: ReactNode }) {
  return <span className={depth === 1 ? "pl-4" : "pl-8"}>{children}</span>;
}

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
  const lines = buildLines(project);

  return (
    <code className="block">
      {lines.map((line, i) => (
        <div key={i} className="flex items-start">
          <span className="ln text-faint select-none tnum w-7 shrink-0 pr-2 text-right">
            {i + 1}
          </span>
          <span className="min-w-0 flex-1 break-words whitespace-pre-wrap">
            {line}
          </span>
        </div>
      ))}
    </code>
  );
}

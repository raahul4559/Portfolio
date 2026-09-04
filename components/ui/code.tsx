import type { ReactNode } from "react";

/**
 * Shared syntax-color primitives — one formula (see globals.css --syn-*
 * tokens), reused by every surface that renders real data as source code
 * (`src/project.ts`, `package.json`) so two "files" never invent two
 * different colorings for the same kind of token.
 */

export function Kw({ children }: { children: ReactNode }) {
  return <span className="text-syn-keyword">{children}</span>;
}
export function Ty({ children }: { children: ReactNode }) {
  return <span className="text-syn-type">{children}</span>;
}
export function Var({ children }: { children: ReactNode }) {
  return <span className="text-syn-variable">{children}</span>;
}
export function Pn({ children }: { children: ReactNode }) {
  return <span className="text-syn-punct">{children}</span>;
}
export function Cm({ children }: { children: ReactNode }) {
  return <span className="text-syn-comment italic">{children}</span>;
}
/** Quotes and colors a string value; only escapes the quote it introduces. */
export function Str({ value }: { value: string }) {
  return (
    <span className="text-syn-string">
      &quot;{value.replaceAll('"', '\\"')}&quot;
    </span>
  );
}

export function Indent({ depth, children }: { depth: 1 | 2; children: ReactNode }) {
  return <span className={depth === 1 ? "pl-4" : "pl-8"}>{children}</span>;
}

/** Numbered-line wrapper shared by every rendered-source view. */
export function CodeLines({ lines }: { lines: ReactNode[] }) {
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

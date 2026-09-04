import type { ReactNode } from "react";

/**
 * Every module renders inside one of these. Fixed measure, generous top
 * space, and a consistent rhythm — the modules differ in content, never in
 * their frame.
 */
export function Document({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <article
      className={`mx-auto w-full px-5 pt-10 pb-24 sm:px-8 sm:pt-14 lg:px-12 ${
        wide ? "max-w-[1100px]" : "max-w-[820px]"
      }`}
    >
      {children}
    </article>
  );
}

/**
 * The document's opening block: an eyebrow in chrome voice, a heading in the
 * UI face, and an optional one-line summary.
 */
export function DocumentHead({
  eyebrow,
  title,
  summary,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  summary?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="anim-rise mb-10 sm:mb-14">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <p className="label text-faint">{eyebrow}</p>
        {aside}
      </div>
      <h1 className="text-h1 sm:text-display text-text font-medium tracking-[-0.02em] text-balance">
        {title}
      </h1>
      {summary && (
        <p className="text-body text-muted mt-5 max-w-[62ch] text-pretty">
          {summary}
        </p>
      )}
    </header>
  );
}

/** A labelled section with a hairline rule — the site's only section divider. */
export function Section({
  label,
  count,
  children,
  className = "",
}: {
  label: string;
  count?: string | number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mt-14 first:mt-0 ${className}`}>
      <div className="hair-b mb-6 flex items-baseline justify-between gap-4 pb-2.5">
        <h2 className="label text-muted">{label}</h2>
        {count !== undefined && (
          <span className="label text-faint tnum">{count}</span>
        )}
      </div>
      {children}
    </section>
  );
}

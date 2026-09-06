import Link from "next/link";
import type { ReactNode } from "react";

import type { ProjectStatus } from "@/content/types";

/**
 * Status is one of the few places the semantic colours are allowed out — it is
 * state, not decoration. The glyph carries the meaning so the chip still reads
 * without colour.
 */
const STATUS: Record<ProjectStatus, { label: string; glyph: string; tone: string }> = {
  live: { label: "live", glyph: "●", tone: "text-ok" },
  wip: { label: "in progress", glyph: "◐", tone: "text-warn" },
  archived: { label: "archived", glyph: "○", tone: "text-faint" },
  internal: { label: "internal", glyph: "◍", tone: "text-muted" },
};

export function StatusChip({ status }: { status: ProjectStatus }) {
  const s = STATUS[status];
  return (
    <span className="text-micro text-muted inline-flex items-center gap-1.5 font-mono">
      <span className={`text-[8px] leading-none ${s.tone}`} aria-hidden>
        {s.glyph}
      </span>
      {s.label}
    </span>
  );
}

/** Stack tokens. Bordered, not filled — they're metadata, not buttons. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="border-line text-micro text-muted inline-flex items-center rounded-xs border px-1.5 py-0.5 font-mono whitespace-nowrap">
      {children}
    </span>
  );
}

export function ChipRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
    </div>
  );
}

/**
 * Proficiency as five blocks. Monochrome on purpose — a coloured bar implies a
 * precision this measurement does not have.
 */
export function LevelBlocks({ level }: { level: number }) {
  return (
    <span
      className="inline-flex items-center gap-[3px]"
      role="img"
      aria-label={`${level} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden
          className={`h-2.5 w-[3px] ${i <= level ? "bg-text" : "bg-surface-3"}`}
        />
      ))}
    </span>
  );
}

/** Mono `key: value` rows — the site's default way of stating facts. */
export function MetaList({
  items,
}: {
  items: { key: string; value: ReactNode }[];
}) {
  return (
    <dl className="font-mono text-data">
      {items.map(({ key, value }) => (
        <div
          key={key}
          className="hair-b flex flex-col gap-0.5 py-2.5 last:border-b-0 sm:flex-row sm:gap-6"
        >
          <dt className="text-faint w-32 shrink-0">{key}</dt>
          <dd className="text-muted min-w-0">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A single headline number with its unit underneath. */
export function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-line rounded-xs border px-3 py-3">
      <p className="text-h3 text-text tnum font-mono tracking-tight">{value}</p>
      <p className="text-micro text-faint mt-1.5 font-mono">{label}</p>
    </div>
  );
}

/** Outbound link with a trailing mark. Underline appears on hover only. */
export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="text-muted hover:text-text decoration-line-strong hover:decoration-accent inline-flex items-baseline gap-1 font-mono text-data underline decoration-1 underline-offset-4 transition-colors duration-150"
    >
      {children}
      <span aria-hidden className="text-faint text-[10px]">
        {external ? "↗" : "→"}
      </span>
    </a>
  );
}

/**
 * The bracket-style action button — `[ Label ]`. Used for the README hero's
 * highest-intent destinations and for a project's Live/Source links — the
 * two places a plain text link isn't assertive enough to be the obvious next
 * click. `external` opens in a new tab rather than navigating the workspace;
 * everything else stays a real Next.js route.
 */
export function CtaButton({
  href,
  children,
  primary = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
  external?: boolean;
}) {
  const className = `inline-flex items-center gap-1 rounded-xs border px-4 py-2.5 font-mono text-data transition-colors duration-150 ${
    primary
      ? "border-accent bg-accent-tint text-text hover:bg-accent hover:text-bg"
      : "border-line-strong text-muted hover:text-text hover:bg-surface-2 hover:border-faint"
  }`;

  const inner = (
    <>
      <span aria-hidden className="opacity-60">
        [
      </span>
      {children}
      <span aria-hidden className="opacity-60">
        ]
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

/**
 * Frame header for a rendered document (`ProjectCode`, a `git show` card).
 * Real editors mark generated/derived views read-only rather than dressing
 * the frame in decorative window controls — that's the fact this states.
 * One shared header keeps every "this is a rendered file" surface in the OS
 * speaking the same voice instead of hand-rolling window chrome per usage.
 */
export function FrameBar({
  filename,
  meta,
}: {
  filename: string;
  meta?: ReactNode;
}) {
  return (
    <div className="hair-b flex flex-wrap items-center gap-x-2.5 gap-y-1.5 px-4 py-2.5">
      <Chip>ro</Chip>
      <span className="text-faint font-mono text-micro">{filename}</span>
      {meta}
    </div>
  );
}

/**
 * Monochrome unicode-block bars — the site's one chart idiom, used for any
 * "a few real numbers, compared" moment (developer activity, language mix,
 * contribution breakdown). Deliberately not a colored chart: four rough
 * buckets of real activity don't have the precision a color scale implies.
 */
export function BarRows({
  rows,
  width = 24,
}: {
  rows: { label: string; value: number }[];
  width?: number;
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);

  return (
    <dl className="space-y-2.5 font-mono text-data">
      {rows.map((row) => {
        const filled = Math.round((row.value / max) * width);
        return (
          <div key={row.label} className="flex items-center gap-3">
            <dt className="text-muted w-28 shrink-0 truncate">{row.label}</dt>
            <dd aria-hidden className="flex-1 leading-none tracking-tighter">
              <span className="text-text">{"█".repeat(filled)}</span>
              <span className="text-line-strong">{"░".repeat(width - filled)}</span>
            </dd>
            <dd className="text-faint tnum w-8 shrink-0 text-right text-micro">{row.value}</dd>
          </div>
        );
      })}
    </dl>
  );
}

/** Numbered index used down the left edge of lists. */
export function Ordinal({ n }: { n: number }) {
  return (
    <span className="text-faint tnum font-mono text-micro">
      {String(n).padStart(2, "0")}
    </span>
  );
}

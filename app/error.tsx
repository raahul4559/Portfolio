"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Document } from "@/components/ui/Document";

/**
 * Catches a render/data error anywhere below the root layout — the shell
 * chrome around this (rail, tabs, status bar) stays mounted and usable,
 * since only the document pane threw. Framed as the OS's own crash report
 * rather than a generic Next.js error page, so it never breaks character.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Document>
      <div className="anim-rise">
        <p className="label text-err mb-4">process exited — signal 11</p>
        <h1 className="text-h1 text-text font-medium tracking-tight">
          This document crashed
        </h1>
        <p className="text-body text-muted mt-5 max-w-[54ch]">
          Something in this pane threw while rendering. The rest of the
          system is unaffected — the rail, tabs, and terminal all still work.
        </p>

        {process.env.NODE_ENV === "development" && (
          <pre className="border-err/40 text-err mt-6 max-w-[62ch] overflow-x-auto rounded-sm border bg-[color-mix(in_srgb,var(--err)_8%,transparent)] p-4 font-mono text-micro whitespace-pre-wrap">
            {error.message}
            {error.digest && `\n\ndigest: ${error.digest}`}
          </pre>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="border-accent bg-accent-tint text-text hover:bg-accent hover:text-bg inline-flex items-center gap-1 rounded-xs border px-4 py-2.5 font-mono text-data transition-colors duration-150"
          >
            <span aria-hidden className="opacity-60">
              [
            </span>
            Try again
            <span aria-hidden className="opacity-60">
              ]
            </span>
          </button>
          <Link
            href="/"
            className="border-line-strong text-muted hover:text-text hover:bg-surface-2 hover:border-faint inline-flex items-center gap-1 rounded-xs border px-4 py-2.5 font-mono text-data transition-colors duration-150"
          >
            <span aria-hidden className="opacity-60">
              [
            </span>
            Back to readme
            <span aria-hidden className="opacity-60">
              ]
            </span>
          </Link>
        </div>
      </div>
    </Document>
  );
}

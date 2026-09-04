import Link from "next/link";

import { Document } from "@/components/ui/Document";
import { modules } from "@/content";

/**
 * Framed as a shell error rather than a marketing 404 — it belongs to the same
 * environment, and it hands back a way to keep moving.
 */
export default function NotFound() {
  return (
    <Document>
      <div className="anim-rise">
        <p className="label text-faint mb-4">error</p>
        <h1 className="text-h1 text-text font-medium tracking-tight">
          No such file or directory
        </h1>
        <p className="text-body text-muted mt-5 max-w-[54ch]">
          That path isn&apos;t part of this system. Press{" "}
          <kbd className="border-line text-data rounded-xs border px-1.5 py-0.5 font-mono">
            ⌘K
          </kbd>{" "}
          to search, or pick a module below.
        </p>

        <ul className="mt-10">
          {modules.map((mod) => (
            <li key={mod.id}>
              <Link
                href={mod.route}
                className="hair-b group hover:bg-surface-2 -mx-3 flex items-baseline gap-4 px-3 py-3.5 transition-colors duration-150"
              >
                <span className="label text-faint w-7 shrink-0">{mod.code}</span>
                <span className="text-data text-text font-mono">{mod.file}</span>
                <span className="text-ui text-faint ml-auto hidden truncate sm:block">
                  {mod.description}
                </span>
                <span
                  aria-hidden
                  className="text-faint group-hover:text-accent font-mono text-data transition-colors duration-150"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Document>
  );
}

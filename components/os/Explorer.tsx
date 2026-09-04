"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { filesystem } from "@/content";
import type { VDir, VNode } from "@/content/types";
import { navigateOrOpen } from "@/lib/dom";
import { listDir } from "@/lib/fs";
import { useMediaQuery } from "@/lib/hooks";
import { useOS } from "@/lib/store";

/**
 * A real file tree over the same virtual filesystem the terminal already
 * walks with `ls`/`cat` — this is a second view of that one source, not a
 * separate hand-written list that could drift out of sync with it.
 */

interface Row {
  node: VNode;
  path: string;
  depth: number;
}

function flatten(
  dir: VDir,
  parentPath: string,
  depth: number,
  expanded: Set<string>,
): Row[] {
  const rows: Row[] = [];
  for (const child of listDir(dir)) {
    const path = `${parentPath}/${child.name}`;
    rows.push({ node: child, path, depth });
    if (child.type === "dir" && expanded.has(path)) {
      rows.push(...flatten(child, path, depth + 1, expanded));
    }
  }
  return rows;
}

/** `atlas-scheduling.ts` → `TS` — the same muted badge convention as the
 *  rest of the site, not a colored icon set. */
function extBadge(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(dot + 1).toUpperCase() : "";
}

function ExplorerTree({
  activeRoute,
  onNavigate,
}: {
  activeRoute: string;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const expandedDirs = useOS((s) => s.expandedDirs);
  const toggleDir = useOS((s) => s.toggleDir);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const expanded = new Set(expandedDirs);
  const rows = flatten(filesystem, "~", 0, expanded);

  const open = (row: Row) => {
    if (row.node.type === "dir") {
      toggleDir(row.path);
      return;
    }
    if (row.node.route) {
      navigateOrOpen(router.push, row.node.route);
      onNavigate?.();
    }
  };

  const focusRow = (index: number) => {
    const buttons =
      containerRef.current?.querySelectorAll<HTMLButtonElement>("[data-row]");
    buttons?.[Math.max(0, Math.min((buttons?.length ?? 1) - 1, index))]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const row = rows[index];

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusRow(index + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusRow(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusRow(0);
        break;
      case "End":
        event.preventDefault();
        focusRow(rows.length - 1);
        break;
      case "ArrowRight":
        if (row.node.type === "dir") {
          event.preventDefault();
          if (!expanded.has(row.path)) toggleDir(row.path);
          else focusRow(index + 1);
        }
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (row.node.type === "dir" && expanded.has(row.path)) {
          toggleDir(row.path);
        } else {
          for (let i = index - 1; i >= 0; i--) {
            if (rows[i].depth < row.depth) {
              focusRow(i);
              break;
            }
          }
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        open(row);
        break;
    }
  };

  return (
    <div ref={containerRef} role="tree" aria-label="Files" className="py-1.5">
      {rows.map((row, i) => {
        const isDir = row.node.type === "dir";
        const isExpanded = isDir && expanded.has(row.path);
        const isActive =
          row.node.type === "file" && row.node.route === activeRoute;
        const badge = !isDir ? extBadge(row.node.name) : "";

        return (
          <button
            key={row.path}
            type="button"
            data-row
            role="treeitem"
            aria-expanded={isDir ? isExpanded : undefined}
            aria-selected={isActive}
            onClick={() => open(row)}
            onKeyDown={(e) => onKeyDown(e, i)}
            style={{ paddingLeft: `${12 + row.depth * 16}px` }}
            className={`group hover:bg-surface-2 anim-fade relative flex w-full items-center gap-2 py-1.5 pr-3 text-left transition-colors duration-150 ${
              isActive ? "bg-accent-tint text-text" : "text-muted"
            }`}
          >
            {isActive && (
              <span
                aria-hidden
                className="bg-accent absolute top-1 bottom-1 left-0 w-0.5"
              />
            )}
            {isDir ? (
              <span
                aria-hidden
                className={`text-faint block w-[13px] shrink-0 text-center font-mono text-[10px] leading-none transition-transform duration-150 ${
                  isExpanded ? "rotate-90" : ""
                }`}
              >
                ▸
              </span>
            ) : (
              <span aria-hidden className="w-[13px] shrink-0" />
            )}
            <span className="min-w-0 flex-1 truncate font-mono text-ui">
              {row.node.name}
              {isDir && "/"}
            </span>
            {badge && (
              <span className="text-faint shrink-0 font-mono text-[9px] tracking-wide">
                {badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Desktop: a side panel that slides its width open, same treatment as the
 *  Activity Bar's own expand/collapse — one motion vocabulary, not two. */
export function Explorer({ activeRoute }: { activeRoute: string }) {
  const open = useOS((s) => s.explorerOpen);
  const setOpen = useOS((s) => s.setExplorerOpen);

  return (
    <nav
      aria-label="Explorer"
      aria-hidden={!open}
      inert={!open}
      style={{ width: open ? "var(--w-explorer)" : "0px" }}
      className="hair-r hidden shrink-0 flex-col overflow-hidden transition-[width] duration-200 ease-[var(--ease-os)] md:flex"
    >
      <div
        style={{ width: "var(--w-explorer)" }}
        className="hair-b flex h-9 shrink-0 items-center justify-between pr-2 pl-3"
      >
        <span className="label text-faint">explorer</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close explorer"
          className="text-faint hover:text-text hover:bg-surface-2 flex size-6 items-center justify-center rounded-xs transition-colors duration-150"
        >
          <X aria-hidden size={13} strokeWidth={2} />
        </button>
      </div>
      <div style={{ width: "var(--w-explorer)" }} className="min-h-0 flex-1 overflow-y-auto">
        <ExplorerTree activeRoute={activeRoute} />
      </div>
    </nav>
  );
}

/** Mobile: a full-screen sheet — a 240px panel would be unusable at that
 *  width, so it gets the whole screen instead of a squeezed copy. */
export function MobileExplorer({ activeRoute }: { activeRoute: string }) {
  const open = useOS((s) => s.explorerOpen);
  const setOpen = useOS((s) => s.setExplorerOpen);
  const ref = useRef<HTMLDialogElement | null>(null);
  // Desktop and mobile share one `explorerOpen` flag, but a <dialog> opened
  // via showModal() enters the top layer regardless of its own CSS display —
  // its ::backdrop still eats clicks across the entire viewport even while
  // `md:hidden` makes the dialog itself invisible. Only ever call showModal()
  // when we're actually on a narrow viewport.
  const isMobile = !useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && isMobile && !dialog.open) dialog.showModal();
    if ((!open || !isMobile) && dialog.open) dialog.close();
  }, [open, isMobile]);

  return (
    <dialog
      ref={ref}
      onClose={() => setOpen(false)}
      onClick={(e) => {
        if (e.target === ref.current) setOpen(false);
      }}
      aria-label="Explorer"
      className="bg-bg fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none rounded-none p-0 md:hidden"
    >
      <div className="hair-b flex h-[var(--h-systembar)] shrink-0 items-center justify-between px-4">
        <span className="label text-faint">explorer</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close explorer"
          className="text-faint hover:text-text hover:bg-surface-2 flex size-7 items-center justify-center rounded-xs transition-colors duration-150"
        >
          <X aria-hidden size={16} strokeWidth={2} />
        </button>
      </div>
      <div className="h-[calc(100dvh-var(--h-systembar))] overflow-y-auto overscroll-contain">
        <ExplorerTree
          activeRoute={activeRoute}
          onNavigate={() => setOpen(false)}
        />
      </div>
    </dialog>
  );
}

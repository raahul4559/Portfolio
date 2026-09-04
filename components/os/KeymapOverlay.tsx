"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

import { modules } from "@/content";
import { useOS } from "@/lib/store";

interface Binding {
  keys: string[];
  action: string;
}

const GROUPS: { label: string; bindings: Binding[] }[] = [
  {
    label: "navigation",
    bindings: [
      { keys: ["1", "–", String(modules.length)], action: "Jump to module" },
      { keys: ["⌘", "K"], action: "Command palette" },
      { keys: ["⌘", "B"], action: "Toggle file explorer" },
      { keys: ["⌥", "W"], action: "Close current tab" },
      { keys: ["⌘", "\\"], action: "Toggle split view" },
    ],
  },
  {
    label: "shell",
    bindings: [
      { keys: ["`"], action: "Toggle terminal" },
      { keys: ["Tab"], action: "Complete command or path" },
      { keys: ["↑", "↓"], action: "Command history" },
      { keys: ["Ctrl", "L"], action: "Clear terminal" },
      { keys: ["Ctrl", "C"], action: "Cancel line" },
    ],
  },
  {
    label: "view",
    bindings: [
      { keys: ["T"], action: "Switch theme" },
      { keys: ["?"], action: "This panel" },
      { keys: ["Esc"], action: "Close the topmost layer" },
    ],
  },
];

/**
 * A native <dialog> rather than a hand-rolled overlay: focus trapping, the
 * top layer, and Esc-to-close all come for free and behave correctly with
 * assistive technology.
 */
export function KeymapOverlay() {
  const open = useOS((s) => s.keymapOpen);
  const setOpen = useOS((s) => s.setKeymapOpen);
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={() => setOpen(false)}
      onClick={(e) => {
        // Clicks land on the dialog element itself only when they hit the
        // backdrop — the panel inside stops them.
        if (e.target === ref.current) setOpen(false);
      }}
      aria-label="Keyboard shortcuts"
      className="layer anim-rise m-auto w-[calc(100vw-2rem)] max-w-[520px] rounded-sm p-0 backdrop:bg-[var(--bg)]/70"
    >
      <div className="hair-b flex items-center justify-between px-4 py-3">
        <h2 className="label text-muted">keyboard</h2>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="text-faint hover:text-text hover:bg-surface-2 flex size-6 items-center justify-center rounded-xs transition-colors duration-150"
        >
          <X aria-hidden size={13} strokeWidth={2} />
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto px-4 py-2">
        {GROUPS.map((group) => (
          <section key={group.label} className="py-3">
            <h3 className="label text-faint mb-2.5">{group.label}</h3>
            <dl>
              {group.bindings.map((binding) => (
                <div
                  key={binding.action}
                  className="flex items-center justify-between gap-4 py-1.5"
                >
                  <dt className="text-ui text-muted">{binding.action}</dt>
                  <dd className="flex shrink-0 items-center gap-1">
                    {binding.keys.map((key, i) => (
                      <kbd
                        key={i}
                        className={
                          key === "–"
                            ? "text-faint px-0.5 font-mono text-micro"
                            : "border-line text-faint inline-flex h-5 min-w-6 items-center justify-center rounded-xs border px-1.5 font-mono text-micro not-italic"
                        }
                      >
                        {/* The bare grave accent sits high and thin in most
                            monospace faces — near-invisible at this size — so
                            it gets a plain-language label instead of relying
                            on a mark nobody would actually see. */}
                        {key === "`" ? "backtick" : key}
                      </kbd>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <p className="hair-t text-faint px-4 py-2.5 font-mono text-micro">
        ⌘ is Ctrl on Windows and Linux. ⌥W replaces ⌘W because browsers reserve it.
      </p>
    </dialog>
  );
}

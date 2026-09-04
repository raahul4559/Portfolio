"use client";

import { describeRoute } from "@/lib/routes";
import { useOS } from "@/lib/store";

/**
 * Bottom edge. Left side describes where you are; right side lists what you
 * can press. Both are real — every hint here maps to a working binding.
 */
export function StatusBar({ activeRoute }: { activeRoute: string }) {
  const tabs = useOS((s) => s.tabs);
  const splitRoute = useOS((s) => s.splitRoute);
  const terminalOpen = useOS((s) => s.terminalOpen);
  const toggleTerminal = useOS((s) => s.toggleTerminal);
  const toggleKeymap = useOS((s) => s.toggleKeymap);
  const explorerOpen = useOS((s) => s.explorerOpen);
  const toggleExplorer = useOS((s) => s.toggleExplorer);

  const { path } = describeRoute(activeRoute);

  return (
    <footer
      aria-label="Status bar"
      className="hair-t hidden h-[var(--h-statusbar)] shrink-0 items-center gap-4 px-3 font-mono text-micro select-none md:flex"
    >
      <span className="text-muted flex items-center gap-1.5">
        <span className="text-faint" aria-hidden>
          ⎇
        </span>
        main
        <span className="text-ok" aria-label="clean working tree">
          ✓
        </span>
      </span>

      <span className="text-faint truncate">{path}</span>

      <span className="text-faint hidden lg:inline">
        {tabs.length} open{splitRoute ? " · split" : ""}
      </span>

      <div className="ml-auto flex items-center gap-1">
        <StatusAction
          onClick={toggleExplorer}
          keys="⌘B"
          label="explorer"
          active={explorerOpen}
        />
        <StatusAction onClick={toggleKeymap} keys="?" label="keys" />
        <StatusAction
          onClick={toggleTerminal}
          keys="⌘J"
          label="terminal"
          active={terminalOpen}
        />
      </div>
    </footer>
  );
}

function StatusAction({
  onClick,
  keys,
  label,
  active,
}: {
  onClick: () => void;
  keys: string;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`hover:text-text hover:bg-surface-2 flex items-center gap-1.5 rounded-xs px-2 py-1 transition-colors duration-150 ${
        active ? "text-text" : "text-faint"
      }`}
    >
      <span>{label}</span>
      <kbd className="text-faint not-italic">{keys}</kbd>
    </button>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { profile } from "@/content";
import {
  COMMAND_NAMES,
  PATH_COMMANDS,
  execute,
  type Block,
  type Tone,
} from "@/lib/commands";
import { openExternal } from "@/lib/dom";
import { commonPrefix, completePath } from "@/lib/fs";
import { useMediaQuery } from "@/lib/hooks";
import {
  TERMINAL_MAX_RATIO,
  TERMINAL_MIN,
  useOS,
} from "@/lib/store";

const TONE_CLASS: Record<Tone, string> = {
  text: "text-text",
  muted: "text-muted",
  faint: "text-faint",
  ok: "text-ok",
  warn: "text-warn",
  err: "text-err",
  accent: "text-accent",
};

/** ANSI-shadow "R". Sits beside the system summary, neofetch style. */
const SIGIL = [
  "██████╗ ",
  "██╔══██╗",
  "██████╔╝",
  "██╔══██╗",
  "██║  ██║",
  "╚═╝  ╚═╝",
];

const WELCOME: Block[] = [
  {
    type: "lines",
    lines: [
      { text: `${profile.host} shell — os-sh`, tone: "text" },
      {
        text: "Type 'help' for commands. Tab completes paths, ↑ recalls history.",
        tone: "faint",
      },
    ],
  },
];

/**
 * A real shell over the virtual filesystem, not a scripted animation.
 *
 * It overlays the pane rather than resizing it: a translate is a compositor
 * job, while animating the pane's height would reflow the document on every
 * frame of the open.
 */
export function Terminal() {
  const router = useRouter();
  const open = useOS((s) => s.terminalOpen);
  const height = useOS((s) => s.terminalHeight);
  const setHeight = useOS((s) => s.setTerminalHeight);
  const setOpen = useOS((s) => s.setTerminalOpen);
  const setTheme = useOS((s) => s.setTheme);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [blocks, setBlocks] = useState<Block[]>(WELCOME);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Pin to the newest output the way a terminal does.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [blocks, open]);

  const run = useCallback(
    (raw: string) => {
      const line = raw.trim();
      const echo: Block = { type: "echo", cwd, input: raw };

      if (!line) {
        setBlocks((prev) => [...prev, echo]);
        return;
      }

      let cleared = false;
      const output = execute(line, {
        cwd,
        history,
        setCwd,
        navigate: (route) => {
          if (route.startsWith("/") && !route.endsWith(".pdf")) router.push(route);
          else openExternal(route);
        },
        setTheme,
        clear: () => {
          cleared = true;
        },
        close: () => setOpen(false),
      });

      setHistory((prev) => [...prev, line]);
      setHistoryIndex(null);
      setBlocks((prev) => (cleared ? [] : [...prev, echo, ...output]));
    },
    [cwd, history, router, setOpen, setTheme],
  );

  const complete = useCallback(() => {
    const parts = input.split(/\s+/);
    const isFirstToken = parts.length === 1;
    const token = parts[parts.length - 1] ?? "";

    const candidates = isFirstToken
      ? COMMAND_NAMES.filter((c) => c.startsWith(token))
      : PATH_COMMANDS.has(parts[0])
        ? completePath(cwd, token)
        : [];

    if (candidates.length === 0) return;

    if (candidates.length === 1) {
      parts[parts.length - 1] = candidates[0];
      setInput(parts.join(" ") + (isFirstToken ? " " : ""));
      return;
    }

    // Several matches: extend to the shared prefix and show the options,
    // exactly as a shell would.
    const prefix = commonPrefix(candidates);
    if (prefix.length > token.length) {
      parts[parts.length - 1] = prefix;
      setInput(parts.join(" "));
    }
    setBlocks((prev) => [
      ...prev,
      { type: "grid", items: candidates.map((c) => ({ text: c, tone: "faint" })) },
    ]);
  }, [cwd, input]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      run(input);
      setInput("");
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      complete();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const next = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setBlocks([]);
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      event.preventDefault();
      setBlocks((prev) => [...prev, { type: "echo", cwd, input: `${input}^C` }]);
      setInput("");
    }
  };

  const startResize = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    event.preventDefault();
    const startY = event.clientY;
    const startHeight = height;
    const max = window.innerHeight * TERMINAL_MAX_RATIO;

    const onMove = (e: PointerEvent) => {
      const next = Math.min(max, Math.max(TERMINAL_MIN, startHeight + (startY - e.clientY)));
      setHeight(next);
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      document.body.style.userSelect = "";
    };

    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <section
      aria-label="Terminal"
      aria-hidden={!open}
      inert={!open}
      style={{ height: isDesktop ? height : undefined }}
      // Fixed to the true viewport, not `main` — `main`'s own bottom edge
      // sits flush against the status bar, so an absolute drawer parked
      // there via translateY(100%) only travels its own height and lands
      // exactly on top of the status bar instead of past it. Anchoring to
      // the status bar's height and adding that same height to the closed
      // translate is what actually clears it.
      className={`bg-surface fixed inset-x-0 top-[var(--h-systembar)] bottom-0 z-30 flex flex-col border-t border-t-[var(--border-strong)] shadow-[var(--shadow-layer)] transition-transform duration-200 ease-[var(--ease-os)] md:top-auto md:bottom-[var(--h-statusbar)] ${
        open
          ? "translate-y-0"
          : "pointer-events-none translate-y-full md:translate-y-[calc(100%+var(--h-statusbar))]"
      }`}
    >
      {/* Drag to resize. Desktop only — on mobile the shell is full-height. */}
      <div
        onPointerDown={startResize}
        className="group absolute -top-1 right-0 left-0 z-10 hidden h-2 cursor-row-resize md:block"
        aria-hidden
      >
        <div className="group-hover:bg-accent mx-auto mt-1 h-px w-16 bg-transparent transition-colors duration-150" />
      </div>

      <header className="hair-b flex h-8 shrink-0 items-center gap-3 px-3">
        <span className="label text-faint">shell</span>
        <span className="text-faint font-mono text-micro">os-sh — {cwd}</span>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setBlocks([])}
            className="label text-faint hover:text-text hover:bg-surface-2 rounded-xs px-2 py-1 transition-colors duration-150"
          >
            clear
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close terminal"
            className="text-faint hover:text-text hover:bg-surface-2 flex size-6 items-center justify-center rounded-xs text-[13px] leading-none transition-colors duration-150"
          >
            ×
          </button>
        </div>
      </header>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto px-3 py-2.5 font-mono text-data"
      >
        <div className="space-y-2">
          {blocks.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-2 flex items-baseline gap-2"
        >
          <Prompt cwd={cwd} />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            aria-label="Terminal input"
            className="text-text caret-accent min-w-0 flex-1 bg-transparent outline-none"
          />
        </form>
      </div>
    </section>
  );
}

function Prompt({ cwd }: { cwd: string }) {
  return (
    <span className="shrink-0 whitespace-nowrap select-none">
      <span className="text-accent">{profile.handle}</span>
      <span className="text-faint">@{profile.host}</span>
      <span className="text-faint">:</span>
      <span className="text-muted">{cwd}</span>
      <span className="text-faint">$</span>
    </span>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "echo":
      return (
        <div className="flex items-baseline gap-2">
          <Prompt cwd={block.cwd} />
          <span className="text-text min-w-0 break-all">{block.input}</span>
        </div>
      );

    case "lines":
      return (
        <div>
          {block.lines.map((line, i) => (
            <p key={i} className={`${TONE_CLASS[line.tone ?? "text"]} text-pretty`}>
              {line.text || " "}
            </p>
          ))}
        </div>
      );

    case "grid":
      return (
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {block.items.map((item, i) => (
            <span key={i} className={TONE_CLASS[item.tone ?? "text"]}>
              {item.text}
            </span>
          ))}
        </div>
      );

    case "kv":
      return (
        <dl className="grid grid-cols-[minmax(5rem,auto)_1fr] gap-x-5 gap-y-1">
          {block.rows.map((row, i) => (
            <div key={i} className="contents">
              <dt className="text-accent whitespace-pre">{row.k}</dt>
              <dd className="text-muted min-w-0 text-pretty">{row.v}</dd>
            </div>
          ))}
        </dl>
      );

    case "card":
      return (
        <div className="border-line max-w-[52rem] rounded-xs border p-3">
          <p className="text-text">{block.title}</p>
          <p className="text-faint mt-0.5 text-micro">{block.subtitle}</p>
          <dl className="mt-2.5 grid grid-cols-[minmax(4rem,auto)_1fr] gap-x-4 text-micro">
            {block.rows.map((row) => (
              <div key={row.k} className="contents">
                <dt className="text-faint">{row.k}</dt>
                <dd className="text-muted">{row.v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-muted mt-2.5 text-pretty">{block.body}</p>
        </div>
      );

    case "sysinfo":
      return (
        <div className="flex flex-wrap items-start gap-x-8 gap-y-3">
          <pre aria-hidden className="text-accent text-[10px] leading-[1.15]">
            {SIGIL.join("\n")}
          </pre>
          <dl className="grid grid-cols-[minmax(4.5rem,auto)_1fr] gap-x-5 gap-y-0.5">
            {block.rows.map((row) => (
              <div key={row.k} className="contents">
                <dt className="text-accent">{row.k}</dt>
                <dd className="text-muted">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
  }
}

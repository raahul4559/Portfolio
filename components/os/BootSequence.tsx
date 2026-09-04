"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { profile } from "@/content";
import { hasBooted, markBooted } from "@/lib/boot";
import { useMounted } from "@/lib/hooks";

/**
 * The five things the rest of the OS is built from. Order matches the
 * Activity Bar's own content shortcuts, so booting already previews the
 * site's shape before a single click.
 */
const LINES = ["identity", "projects", "experience", "skills", "experiments"];

const LINE_MS = 115;
const READY_HOLD_MS = 150;
const AUTO_CONTINUE_MS = 1400;

/**
 * Overlays content that is already in the DOM rather than gating it, and is
 * skipped entirely for repeat visits in a session, for reduced-motion users,
 * and when JavaScript is unavailable. It is a greeting, never a gate — every
 * stage is skippable by any key or click, and it auto-continues on its own
 * shortly after reaching ready in case nobody touches anything.
 */
export function BootSequence() {
  // Rendered on the server so first-time visitors never see the site flash
  // behind it; CSS decides whether it's visible at all.
  const mounted = useMounted();
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const skipped = useRef(false);

  const finish = useCallback(() => {
    if (skipped.current) return;
    skipped.current = true;
    markBooted();
    setLeaving(true);
    // Matches the exit transition below — the overlay collapses into the
    // desktop rather than simply vanishing.
    setTimeout(() => setVisible(false), 220);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hasBooted() || reduced) {
      markBooted();
      // A one-time read of client-only environment state (session flag,
      // motion preference) that decides whether the overlay runs at all —
      // this can only be known after mount, so this setState has no render
      // to attach to and can't be expressed as a subscription callback.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      skipped.current = true;
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), LINE_MS * (i + 1)));
    });
    timers.push(
      setTimeout(() => setReady(true), LINE_MS * LINES.length + READY_HOLD_MS),
    );
    timers.push(
      setTimeout(
        finish,
        LINE_MS * LINES.length + READY_HOLD_MS + AUTO_CONTINUE_MS,
      ),
    );

    return () => timers.forEach(clearTimeout);
  }, [finish]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") return; // don't eat keyboard nav on skip
      finish();
    };
    const onPointer = () => finish();
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [visible, finish]);

  if (!visible) return null;

  return (
    <div
      className={`boot flex items-center justify-center px-6 transition-[opacity,transform] duration-[220ms] ease-[var(--ease-os)] ${
        leaving ? "translate-y-[-6px] scale-[0.985] opacity-0" : "translate-y-0 scale-100 opacity-100"
      }`}
      aria-hidden
    >
      <div className="w-full max-w-[420px] font-mono text-data">
        <p className="text-text tracking-[0.04em]">
          [ <span className="text-accent">{profile.host.split(".")[0].toUpperCase()}</span>
          <span className="text-faint">.OS</span> ]
        </p>

        <p className="text-faint mt-6">Initializing environment...</p>

        <div className="mt-3 space-y-1.5">
          {LINES.map((line, i) => {
            // Before mount nothing is revealed, so the server HTML and the
            // first client render agree.
            const revealed = mounted && i < step;
            return (
              <div
                key={line}
                className={`flex items-baseline gap-2 transition-opacity duration-100 ${
                  revealed ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-muted shrink-0">Loading {line}</span>
                <span
                  aria-hidden
                  className="text-faint min-w-4 flex-1 overflow-hidden text-clip whitespace-nowrap"
                >
                  {" ".padEnd(48, ".")}
                </span>
                <span className="text-ok shrink-0">✓</span>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-7 transition-opacity duration-150 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-text tracking-[0.08em]">
            SYSTEM READY
            <span className="text-accent animate-pulse"> ▊</span>
          </p>
          <p className="text-faint mt-3 text-micro">
            Press <span className="text-muted">ENTER</span> or click to continue
          </p>
        </div>
      </div>
    </div>
  );
}

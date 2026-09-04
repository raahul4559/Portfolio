"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { profile, systemStats } from "@/content";
import { hasBooted, markBooted } from "@/lib/boot";
import { useMounted } from "@/lib/hooks";

interface BootLine {
  op: string;
  target: string;
  detail: string;
}

/**
 * Every line reports something real from the content layer. If a project is
 * added, this screen counts it — which is the difference between a boot
 * sequence and a loading animation.
 */
const LINES: BootLine[] = [
  { op: "mount", target: "/profile", detail: profile.name.toLowerCase().replace(/\s+/g, "-") },
  { op: "index", target: "/projects", detail: `${systemStats.projects} entries` },
  { op: "load", target: "/stack", detail: `${systemStats.stackItems} tools · ${systemStats.stackDomains} domains` },
  { op: "load", target: "/timeline", detail: systemStats.timelineSpan },
  { op: "link", target: "/modules", detail: `${systemStats.modules} mounted` },
];

const STEP_MS = 190;
const HOLD_MS = 520;

/**
 * Overlays content that is already in the DOM rather than gating it, and is
 * skipped entirely for repeat visits in a session, for reduced-motion users,
 * and when JavaScript is unavailable. It is a greeting, never a gate.
 */
export function BootSequence() {
  // Rendered on the server so first-time visitors never see the site flash
  // behind it; CSS decides whether it's visible at all.
  const mounted = useMounted();
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const skipped = useRef(false);

  const finish = useCallback(() => {
    if (skipped.current) return;
    skipped.current = true;
    markBooted();
    setLeaving(true);
    setTimeout(() => setVisible(false), 200);
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

    // Shorter on small screens: a phone visitor is more likely to be
    // impatient and less likely to be impressed by a shell.
    const compact = window.innerWidth < 768;
    const stepMs = compact ? STEP_MS * 0.65 : STEP_MS;

    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), stepMs * (i + 1)));
    });
    timers.push(setTimeout(finish, stepMs * LINES.length + HOLD_MS));

    return () => timers.forEach(clearTimeout);
  }, [finish]);

  useEffect(() => {
    if (!visible) return;
    const onAny = () => finish();
    window.addEventListener("keydown", onAny, { once: true });
    window.addEventListener("pointerdown", onAny, { once: true });
    return () => {
      window.removeEventListener("keydown", onAny);
      window.removeEventListener("pointerdown", onAny);
    };
  }, [visible, finish]);

  if (!visible) return null;

  const done = step >= LINES.length;

  return (
    <div
      className={`boot flex items-center justify-center px-6 transition-opacity duration-200 ease-[var(--ease-os)] ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <div className="w-full max-w-[440px] font-mono text-data">
        <p className="text-text">
          {profile.host}
          <span className="text-faint"> v{profile.version}</span>
        </p>

        <div className="mt-6 space-y-1.5">
          {LINES.map((line, i) => {
            // Before mount nothing is revealed, so the server HTML and the
            // first client render agree.
            const revealed = mounted && i < step;
            return (
              <div
                key={line.target}
                className={`flex items-baseline gap-2 transition-opacity duration-100 ${
                  revealed ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-faint w-11 shrink-0">{line.op}</span>
                <span className="text-muted shrink-0">{line.target}</span>
                <span
                  aria-hidden
                  className="text-faint min-w-4 flex-1 overflow-hidden text-clip whitespace-nowrap"
                >
                  {" ".padEnd(40, ".")}
                </span>
                <span className="text-faint hidden shrink-0 text-micro sm:block">
                  {line.detail}
                </span>
                <span className="text-ok shrink-0">ok</span>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-8 transition-opacity duration-150 ${
            done ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-muted">
            welcome, visitor.
            <span className="text-accent"> ▊</span>
          </p>
          <p className="text-faint mt-2 text-micro">
            ⌘K to search · ` for a shell · ? for shortcuts
          </p>
        </div>

        <p className="text-faint mt-10 text-micro">press any key to skip</p>
      </div>
    </div>
  );
}

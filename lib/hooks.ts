"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const noSubscription = () => () => {};

/**
 * True only after the first client render. Used to gate anything that cannot
 * match the server output — live clocks, persisted layout, `navigator` reads.
 *
 * Built on useSyncExternalStore rather than a state+effect pair: there is
 * nothing to subscribe to, but the hook still needs the client snapshot (true)
 * to differ from the server snapshot (false), and this is React's sanctioned
 * shape for that rather than a setState call inside an effect body.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noSubscription,
    () => true,
    () => false,
  );
}

/** Media query as state, SSR-safe (always false on the server). */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Ticks once a minute, aligned to the minute boundary. */
export function useMinuteTick(): number {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const msToNextMinute = 60_000 - (Date.now() % 60_000);
      timeout = setTimeout(() => {
        setTick((t) => t + 1);
        schedule();
      }, msToNextMinute + 50);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return tick;
}

/** True while the user is typing into a field — used to gate bare-key shortcuts. */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

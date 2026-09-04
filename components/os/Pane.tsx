"use client";

import { useEffect, useRef } from "react";

/**
 * A document viewport. Scroll position resets per route the way opening a file
 * in an editor does — the shell persists, but the document does not remember
 * where you were in the previous one.
 */
export function Pane({
  routeKey,
  children,
  label,
  className = "",
}: {
  routeKey: string;
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [routeKey]);

  return (
    <div
      ref={ref}
      aria-label={label}
      className={`min-w-0 flex-1 overflow-x-hidden overflow-y-auto ${className}`}
    >
      <div key={routeKey} className="anim-fade">
        {children}
      </div>
    </div>
  );
}

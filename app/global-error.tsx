"use client";

import { useEffect } from "react";

/**
 * Only fires if the root layout itself throws — the Shell chrome is gone at
 * that point, so this can't lean on globals.css tokens being reliably in
 * effect. Inline styles keep it legible even if the failure took styling
 * down with it.
 */
export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0e0e",
          color: "#ededed",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "420px" }}>
          <p
            style={{
              color: "#e0574a",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            system halted
          </p>
          <h1 style={{ fontSize: "22px", fontWeight: 500, margin: 0 }}>
            rahul.os failed to boot
          </h1>
          <p
            style={{
              color: "#7a7a7a",
              fontSize: "14px",
              lineHeight: 1.6,
              marginTop: "14px",
            }}
          >
            The environment itself hit an error, not just one document.
            Restarting usually clears it.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "24px",
              background: "rgb(255 176 32 / 0.1)",
              color: "#ededed",
              border: "1px solid #ffb020",
              borderRadius: "2px",
              padding: "10px 16px",
              fontFamily: "inherit",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            [ Restart ]
          </button>
        </div>
      </body>
    </html>
  );
}

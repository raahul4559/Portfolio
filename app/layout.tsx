import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";

import { Shell } from "@/components/os/Shell";
import { profile } from "@/content";
import { BOOT_KEY } from "@/lib/boot";
import { SITE_URL } from "@/lib/site";
import { THEME_KEY } from "@/lib/theme";

import "./globals.css";

const ui = Inter_Tight({
  variable: "--font-ui",
  subsets: ["latin"],
  display: "swap",
});

const data = JetBrains_Mono({
  variable: "--font-data",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.role}`,
    // Tabs in the browser read like documents in the OS: `projects — rahul.os`.
    template: `%s — ${profile.host}`,
  },
  description: profile.positioning,
  applicationName: profile.host,
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    siteName: profile.host,
    title: `${profile.name} — ${profile.role}`,
    description: profile.positioning,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.positioning,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" },
    { media: "(prefers-color-scheme: light)", color: "#0e0e0e" },
  ],
  colorScheme: "dark light",
};

/**
 * Runs before first paint. Sets the palette so a returning visitor never sees
 * the wrong one flash, and marks the session as already-booted so the boot
 * overlay is hidden by CSS rather than removed by React a frame later.
 */
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)});d.dataset.theme=t==="paper"?"paper":"ink"}catch(e){d.dataset.theme="ink"}try{if(sessionStorage.getItem(${JSON.stringify(
  BOOT_KEY,
)}))d.dataset.booted="1"}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="ink"
      suppressHydrationWarning
      className={`${ui.variable} ${data.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        {/* Without JS the boot overlay would never lift. Content first. */}
        <noscript>
          <style>{`.boot{display:none}`}</style>
        </noscript>
      </head>
      <body className="h-full overflow-hidden">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}

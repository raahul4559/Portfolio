"use client";

import { useEffect, useState } from "react";

import { Document, DocumentHead, Section } from "@/components/ui/Document";
import { ExternalLink } from "@/components/ui/bits";
import { profile } from "@/content";

export function ContactModule() {
  return (
    <Document>
      <DocumentHead
        eyebrow="contact.md"
        title="Get in touch"
        summary={profile.availability.detail}
      />

      <Section label="email">
        <CopyField value={profile.email} href={`mailto:${profile.email}`} />
        <p className="text-ui text-faint mt-3 font-mono">
          {profile.availability.responseTime}
        </p>
      </Section>

      <Section label="elsewhere" count={profile.socials.length}>
        <ul className="space-y-3">
          {profile.socials.map((social) => (
            <li key={social.label} className="flex items-baseline gap-4">
              <span className="text-faint w-20 shrink-0 font-mono text-micro">
                {social.label}
              </span>
              <ExternalLink href={social.href}>{social.handle}</ExternalLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="resume">
        <ExternalLink href={profile.resume}>resume.pdf</ExternalLink>
        <p className="text-ui text-faint mt-3">
          One page. Same content as the timeline, in a format ATS software can read.
        </p>
      </Section>
    </Document>
  );
}

/**
 * Click-to-copy with a real confirmation. Falls back to a plain mailto link if
 * the clipboard API is unavailable or blocked — the address is never trapped
 * behind a button that might not work.
 */
function CopyField({ value, href }: { value: string; href: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      window.location.href = href;
    }
  };

  return (
    <div className="border-line flex flex-wrap items-center gap-x-4 gap-y-2 rounded-sm border p-3 sm:p-4">
      <a
        href={href}
        className="text-data text-text hover:text-accent min-w-0 flex-1 truncate font-mono transition-colors duration-150"
      >
        {value}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="label border-line text-muted hover:text-text hover:bg-surface-2 shrink-0 rounded-xs border px-2.5 py-1.5 transition-colors duration-150"
      >
        {copied ? "copied ✓" : "copy"}
      </button>
    </div>
  );
}

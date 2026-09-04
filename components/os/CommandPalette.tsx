"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { nextSplitTarget } from "@/components/os/TabBar";
import { profile, searchIndex } from "@/content";
import { copyText, openExternal, openMailto } from "@/lib/dom";
import { useOS } from "@/lib/store";

interface Action {
  id: string;
  title: string;
  hint?: string;
  keywords: string[];
  run: () => void;
}

/** Proper-noun casing for a natural "Open X" sentence — `social.label` itself
 *  stays lowercase, since that's the mono chrome voice used everywhere else
 *  it appears (Contact, the terminal). */
const SOCIAL_DISPLAY_NAME: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  x: "X",
};

/**
 * ⌘K. Searches the same index the terminal completes against, plus the
 * actions that would otherwise be buried in the chrome. Everything reachable
 * by mouse is reachable here, which is the point.
 */
export function CommandPalette() {
  const router = useRouter();
  const open = useOS((s) => s.paletteOpen);
  const setOpen = useOS((s) => s.setPaletteOpen);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  // A palette that reopens with the last query is a palette that lies about
  // what's on screen — reset it as part of the close itself, not as a
  // separate effect reacting to `open`.
  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setSearch("");
  };

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  const go = (route: string) => {
    setOpen(false);
    router.push(route);
  };

  const modules = searchIndex.filter((e) => e.type === "module");
  const projects = searchIndex.filter((e) => e.type === "project");

  const actions: Action[] = [
    {
      id: "theme",
      title: "Toggle theme",
      hint: "T",
      keywords: ["dark", "light", "ink", "paper", "appearance"],
      run: () => {
        useOS.getState().toggleTheme();
        setOpen(false);
      },
    },
    {
      id: "terminal",
      title: "Toggle terminal",
      hint: "`",
      keywords: ["shell", "console", "command line"],
      run: () => {
        setOpen(false);
        useOS.getState().setTerminalOpen(true);
      },
    },
    {
      id: "split",
      title: "Toggle split view",
      hint: "⌘\\",
      keywords: ["pane", "side by side", "compare"],
      run: () => {
        const os = useOS.getState();
        os.setSplitRoute(
          os.splitRoute ? null : nextSplitTarget(os.tabs, os.activeRoute),
        );
        setOpen(false);
      },
    },
    {
      id: "keymap",
      title: "Show keyboard shortcuts",
      hint: "?",
      keywords: ["keys", "bindings", "help", "hotkeys"],
      run: () => {
        setOpen(false);
        useOS.getState().setKeymapOpen(true);
      },
    },
    {
      id: "copy-email",
      title: copied ? "Email copied ✓" : "Copy email address",
      keywords: ["mail", "contact", "address", profile.email],
      run: async () => {
        const ok = await copyText(profile.email);
        if (ok) setCopied(true);
        else {
          openMailto(profile.email);
          setOpen(false);
        }
      },
    },
    {
      id: "resume",
      title: "Open resume",
      keywords: ["cv", "pdf", "download", "hire"],
      run: () => {
        setOpen(false);
        openExternal(profile.resume);
      },
    },
    ...profile.socials.map<Action>((social) => ({
      id: `social-${social.label}`,
      title: `Open ${SOCIAL_DISPLAY_NAME[social.label] ?? social.label}`,
      hint: social.handle,
      keywords: ["social", "profile", social.label, social.handle],
      run: () => {
        setOpen(false);
        openExternal(social.href);
      },
    })),
  ];

  return (
    <Command.Dialog
      open={open}
      onOpenChange={handleOpenChange}
      label="Command palette"
      shouldFilter
      loop
      overlayClassName="fixed inset-0 z-40 bg-bg/70 anim-fade"
      contentClassName="layer anim-rise fixed top-[12vh] left-1/2 z-50 w-[calc(100vw-2rem)] max-w-[560px] -translate-x-1/2 overflow-hidden rounded-sm"
    >
      <div className="hair-b flex items-center gap-3 px-4">
        <span aria-hidden className="text-faint font-mono text-data">
          ›
        </span>
        <Command.Input
          value={search}
          onValueChange={setSearch}
          placeholder="Search portfolio…"
          className="text-text placeholder:text-faint h-12 flex-1 bg-transparent font-mono text-data outline-none"
        />
        <kbd className="text-faint hidden font-mono text-micro sm:block">esc</kbd>
      </div>

      <Command.List className="max-h-[min(52vh,380px)] overflow-y-auto p-1.5">
        <Command.Empty className="text-faint px-3 py-8 text-center font-mono text-data">
          No matches for “{search}”
        </Command.Empty>

        <Group heading="modules">
          {modules.map((entry) => (
            <Item
              key={entry.id}
              value={`${entry.title} ${entry.subtitle} ${entry.keywords.join(" ")}`}
              onSelect={() => go(entry.route)}
              title={entry.title}
              subtitle={entry.subtitle}
            />
          ))}
        </Group>

        <Group heading="projects">
          {projects.map((entry) => (
            <Item
              key={entry.id}
              value={`${entry.title} ${entry.subtitle} ${entry.keywords.join(" ")}`}
              onSelect={() => go(entry.route)}
              title={entry.title}
              subtitle={entry.subtitle}
            />
          ))}
        </Group>

        <Group heading="actions">
          {actions.map((action) => (
            <Item
              key={action.id}
              value={`${action.title} ${action.keywords.join(" ")}`}
              onSelect={action.run}
              title={action.title}
              hint={action.hint}
            />
          ))}
        </Group>
      </Command.List>
    </Command.Dialog>
  );
}

function Group({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Command.Group
      heading={heading}
      className="[&_[cmdk-group-heading]]:label [&_[cmdk-group-heading]]:text-faint mb-1 [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-2"
    >
      {children}
    </Command.Group>
  );
}

function Item({
  value,
  onSelect,
  title,
  subtitle,
  hint,
}: {
  value: string;
  onSelect: () => void;
  title: string;
  subtitle?: string;
  hint?: string;
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="group data-[selected=true]:bg-surface-2 data-[selected=true]:text-text text-muted flex cursor-pointer items-center gap-3 rounded-xs px-2.5 py-2 transition-colors duration-100"
    >
      {/* The accent bar marks the selected row and nothing else. */}
      <span
        aria-hidden
        className="bg-accent h-3.5 w-0.5 shrink-0 opacity-0 group-data-[selected=true]:opacity-100"
      />
      <span className="text-data min-w-0 shrink-0 font-mono">{title}</span>
      {subtitle && (
        <span className="text-faint min-w-0 truncate text-ui">{subtitle}</span>
      )}
      {hint && (
        <kbd className="text-faint ml-auto shrink-0 font-mono text-micro">
          {hint}
        </kbd>
      )}
    </Command.Item>
  );
}

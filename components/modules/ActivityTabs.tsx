import Link from "next/link";

const TABS = [
  { href: "/activity", label: "contributions" },
  { href: "/activity/timeline", label: "activity" },
  { href: "/activity/insights", label: "insights" },
];

/**
 * The activity module's three real routes, one click apart — the same
 * open-tabs grammar `ProjectRepo` uses for a project's files, recursed into
 * this module instead of a project.
 */
export function ActivityTabs({ active }: { active: string }) {
  return (
    <nav aria-label="Activity views" className="hair-b mb-8 flex gap-1 overflow-x-auto">
      {TABS.map((tab) => {
        const isActive = tab.href === active;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`relative shrink-0 px-3 py-2.5 font-mono text-micro transition-colors duration-150 ${
              isActive ? "text-text" : "text-faint hover:text-muted"
            }`}
          >
            {tab.label}
            <span
              aria-hidden
              className={`absolute inset-x-0 -bottom-px h-px ${isActive ? "bg-accent" : "bg-transparent"}`}
            />
          </Link>
        );
      })}
    </nav>
  );
}

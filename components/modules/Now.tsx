import { Document, Section } from "@/components/ui/Document";
import { ExternalLink } from "@/components/ui/bits";
import { now, profile } from "@/content";
import { SHELL_USER } from "@/lib/commands";

/**
 * A now-page (nownownow.com's idea, not GitHub's or VS Code's) framed as a
 * Unix device: `/dev/now` reads live, the way `/dev/random` always has
 * something for you. `tail -f` is the tell — this is the one file on the
 * site meant to be checked back on, not read once.
 *
 * "Open to" isn't stored here — it's `profile.availability.label`, read
 * live, so this page and the contact page can never quietly disagree.
 */
export function NowModule() {
  const rows = [...now.focus, { label: "Open to", value: profile.availability.label }];

  return (
    <Document>
      <header className="anim-rise mb-10 sm:mb-14">
        <p className="label text-faint mb-3">dev/now</p>

        <p className="font-mono text-data mb-6">
          <span className="text-accent">{SHELL_USER}</span>
          <span className="text-faint">@{profile.host}:~$</span>{" "}
          <span className="text-muted">tail -f dev/now</span>
        </p>

        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h1 className="text-h1 sm:text-display text-text font-medium tracking-[-0.02em] text-balance">
            Currently
          </h1>
          <span className="text-micro text-faint tnum shrink-0 font-mono">
            updated {now.updated}
          </span>
        </div>

        <dl className="font-mono text-data">
          {rows.map((row) => (
            <div
              key={row.label}
              className="hair-b flex items-baseline gap-3 py-2.5 last:border-b-0"
            >
              <dt className="text-muted w-24 shrink-0 sm:w-28">{row.label}</dt>
              <dd aria-hidden className="text-faint">
                →
              </dd>
              <dd className="text-text min-w-0 text-pretty">{row.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <Section label="favorite stack" count={now.favoriteTech.length}>
        <p className="text-ui text-faint -mt-2 mb-5">
          Taste, not proficiency — see skills.md for the honest ratings.
        </p>
        <ul className="space-y-3">
          {now.favoriteTech.map((item) => (
            <li key={item.name} className="flex flex-col gap-0.5 sm:flex-row sm:gap-5">
              <span className="text-text w-32 shrink-0 font-mono text-data">
                {item.name}
              </span>
              <p className="prose-os text-pretty">{item.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="preferences" count={now.preferences.length}>
        <ul className="space-y-2.5">
          {now.preferences.map((pref) => (
            <li key={pref.slice(0, 24)} className="flex gap-3">
              <span aria-hidden className="text-faint mt-[0.5em] text-[8px] leading-none">
                ▸
              </span>
              <p className="prose-os text-pretty">{pref}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="principles" count={now.principles.length}>
        <ol className="space-y-2.5">
          {now.principles.map((principle, i) => (
            <li key={principle.slice(0, 24)} className="flex gap-3">
              <span className="text-faint tnum shrink-0 pt-[0.15em] font-mono text-micro">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="prose-os text-pretty">{principle}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="experiments" count={now.experiments.length}>
        <ul className="space-y-5">
          {now.experiments.map((experiment) => (
            <li key={experiment.name}>
              <p className="text-text font-mono text-data">{experiment.name}</p>
              <p className="prose-os mt-1 text-pretty">{experiment.note}</p>
              {experiment.href && (
                <div className="mt-1.5">
                  <ExternalLink href={experiment.href}>source</ExternalLink>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section label="note">
        <p className="prose-os text-pretty">
          {now.note}{" "}
          <span aria-hidden className="text-accent animate-pulse">
            ▊
          </span>
        </p>
      </Section>
    </Document>
  );
}

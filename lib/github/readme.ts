/**
 * Turns a README into portfolio copy instead of dumping it verbatim — the
 * user asked for a "polished portfolio presentation... while preserving the
 * original meaning," which rules out both extremes: showing raw markdown,
 * and inventing content the README doesn't actually contain.
 *
 * This is a pragmatic heuristic pass, not a markdown-spec parser: it knows
 * about headings, bullets, numbered lists, and the one markdown-table shape
 * READMEs actually use for feature lists. Anything it can't confidently
 * extract, it leaves out rather than guesses at.
 */

export interface ParsedReadme {
  overview: string;
  features: string[];
  architecture: string[];
  images: string[];
}

function stripMarkdown(line: string): string {
  return line
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#+\s*/, "")
    .replace(/^>\s?/, "")
    .trim();
}

interface Section {
  heading: string;
  body: string[];
}

/**
 * Whichever heading comes first — `#` or `##`, READMEs use both for their
 * own title — is treated as the title and dropped, not sectioned on: the
 * overview lives right after it, before the first *real* heading, and
 * sectioning on the title itself would leave that overview with nothing
 * captured ahead of it.
 */
function splitSections(md: string): Section[] {
  const sections: Section[] = [{ heading: "", body: [] }];
  let titleSkipped = false;
  for (const line of md.split("\n")) {
    const heading = line.match(/^#{1,4}\s+(.*)/);
    if (heading) {
      if (!titleSkipped) {
        titleSkipped = true;
        continue;
      }
      sections.push({ heading: stripMarkdown(heading[1]).toLowerCase(), body: [] });
      continue;
    }
    sections[sections.length - 1].body.push(line);
  }
  return sections;
}

/** Bullets, numbered lists, and table rows (skipping the header + separator
 *  rows) — the three shapes a "features" section actually shows up in. */
function extractListItems(bodyLines: string[], max: number): string[] {
  const items: string[] = [];
  let tableRow = -1;

  for (const raw of bodyLines) {
    const line = raw.trim();
    if (!line) continue;

    let m = line.match(/^[-*]\s+(.*)/);
    if (m) {
      items.push(stripMarkdown(m[1]));
      continue;
    }
    m = line.match(/^\d+\.\s+(.*)/);
    if (m) {
      items.push(stripMarkdown(m[1]));
      continue;
    }
    if (line.startsWith("|")) {
      tableRow++;
      if (tableRow === 0) continue; // header row
      if (/^\|[\s:|-]+\|?$/.test(line)) continue; // separator row
      const cells = line
        .split("|")
        .map((c) => stripMarkdown(c.trim()))
        .filter(Boolean);
      if (cells.length === 0) continue;
      items.push(cells.length >= 2 ? `${cells[0]} — ${cells.slice(1).join(", ")}` : cells[0]);
    }
  }

  return items.filter(Boolean).slice(0, max);
}

/** The first couple of real sentences before the first heading — skipping
 *  badge rows, blockquotes, and the title itself. */
function extractOverview(preHeadingBody: string[]): string {
  const text = preHeadingBody
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("[![") && !l.startsWith("![") && !l.startsWith(">") && !/^[-*_]{3,}$/.test(l))
    .map(stripMarkdown)
    .join(" ")
    .replace(/\s+/g, " ");

  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  let out = "";
  for (const sentence of sentences) {
    if (out && (out + " " + sentence).length > 280) break;
    out = out ? `${out} ${sentence}` : sentence;
  }
  return out || text.slice(0, 280);
}

const FEATURE_HEADINGS = /features?|what you get|highlights/i;
const ARCH_HEADINGS = /architecture|how it works|design|under the hood/i;
const IMAGE_RE = /!\[[^\]]*\]\((.*?)\)/g;

export function parseReadme(markdown: string): ParsedReadme {
  const sections = splitSections(markdown);
  const overview = extractOverview(sections[0]?.body ?? []);

  let features: string[] = [];
  let architecture: string[] = [];

  for (const section of sections) {
    if (features.length === 0 && FEATURE_HEADINGS.test(section.heading)) {
      features = extractListItems(section.body, 8);
    }
    if (architecture.length === 0 && ARCH_HEADINGS.test(section.heading)) {
      architecture = extractListItems(section.body, 6);
      if (architecture.length === 0) {
        // Prose steps rather than a list — take non-empty lines as-is.
        architecture = section.body
          .map((l) => l.trim())
          .filter(Boolean)
          .map(stripMarkdown)
          .filter(Boolean)
          .slice(0, 6);
      }
    }
  }

  const images: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = IMAGE_RE.exec(markdown)) && images.length < 6) {
    if (!match[1].startsWith("http") || !/badge|shield/i.test(match[1])) {
      images.push(match[1]);
    }
  }

  return { overview, features, architecture, images };
}

const KNOWN_TECH = [
  "Next.js", "React", "Vue", "Svelte", "Angular", "Node.js", "Express", "Nest.js",
  "Flask", "Django", "FastAPI", "Spring Boot",
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "SQLite", "Firebase", "Supabase",
  "Tailwind CSS", "Bootstrap", "Docker", "Kubernetes", "AWS", "Vercel", "Netlify",
  "GraphQL", "JWT", "OAuth", "WebSocket", "Socket.io",
  "TensorFlow", "PyTorch", "Keras", "MediaPipe", "OpenCV", "scikit-learn", "Pandas", "NumPy",
  "Zustand", "Redux", "Prisma", "Sequelize", "Mongoose", "NanoID",
  // Deliberately excludes real programming languages (Go, Java, Python, Rust,
  // TypeScript, ...) — those come from the languages API, which reads actual
  // file bytes. Text-matching short language names against free-form prose
  // is exactly how "Go" ends up "detected" inside the word "MongoDB."
];

/** Fills in the technologies the languages API can't see — Flask, MongoDB,
 *  JWT, and the rest are frameworks and services, not languages, so a repo
 *  full of real Node/Express/MongoDB code would otherwise show up as just
 *  "JavaScript." Scans the README and description text for known names,
 *  matched at word boundaries so "Go" can't match inside "MongoDB" or "Java"
 *  inside "JavaScript." */
export function extractTechnologies(text: string, languages: string[]): string[] {
  const found = new Set<string>(languages);
  for (const tech of KNOWN_TECH) {
    const escaped = tech.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`, "i");
    if (pattern.test(text)) found.add(tech);
  }
  return Array.from(found).slice(0, 10);
}

import { Document, DocumentHead, Section } from "@/components/ui/Document";
import { LevelBlocks } from "@/components/ui/bits";
import { stack, stackItemCount } from "@/content";

export function StackModule() {
  return (
    <Document>
      <DocumentHead
        eyebrow="stack.md"
        title="Tools, honestly rated"
        summary="Five blocks means I could teach it and have debugged it in production at 3am. Two means I shipped something small. The note underneath matters more than the blocks — a rating without context is just a number."
        aside={
          <span className="text-micro text-faint tnum font-mono">
            {stackItemCount} tools
          </span>
        }
      />

      {stack.map((group) => (
        <Section key={group.id} label={group.label} count={group.items.length}>
          <p className="text-ui text-faint -mt-2 mb-5">{group.blurb}</p>

          <ul>
            {group.items.map((item) => (
              <li
                key={item.name}
                className="hair-b grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1.5 py-3.5 last:border-b-0 sm:grid-cols-[11rem_auto_1fr]"
              >
                <span className="text-data text-text font-mono">{item.name}</span>

                <span className="flex items-center gap-3 justify-self-end sm:justify-self-start">
                  <LevelBlocks level={item.level} />
                  <span className="text-micro text-faint tnum w-6 font-mono">
                    {item.years}
                  </span>
                </span>

                <span className="text-ui text-muted col-span-2 text-pretty sm:col-span-1 sm:pl-4">
                  {item.note}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </Document>
  );
}

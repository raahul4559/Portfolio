import type { Metadata } from "next";

import { TimelineModule } from "@/components/modules/Timeline";
import { moduleById } from "@/content";

export const metadata: Metadata = {
  title: "experience",
  description: moduleById.get("timeline")?.description,
};

export default function Page() {
  return <TimelineModule />;
}

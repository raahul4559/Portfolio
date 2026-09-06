import type { Metadata } from "next";

import { ActivityModule } from "@/components/modules/Activity";
import { moduleById } from "@/content";

export const metadata: Metadata = {
  title: "activity",
  description: moduleById.get("activity")?.description,
};

export default function Page() {
  return <ActivityModule />;
}

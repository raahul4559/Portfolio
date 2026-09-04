import type { Metadata } from "next";

import { StackModule } from "@/components/modules/Stack";
import { moduleById } from "@/content";

export const metadata: Metadata = {
  title: "stack",
  description: moduleById.get("stack")?.description,
};

export default function Page() {
  return <StackModule />;
}

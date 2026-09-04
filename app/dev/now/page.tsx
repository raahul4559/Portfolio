import type { Metadata } from "next";

import { NowModule } from "@/components/modules/Now";
import { moduleById } from "@/content";

export const metadata: Metadata = {
  title: "now",
  description: moduleById.get("now")?.description,
};

export default function Page() {
  return <NowModule />;
}

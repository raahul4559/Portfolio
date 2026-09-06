import type { Metadata } from "next";

import { ActivityTimelineModule } from "@/components/modules/ActivityTimeline";

export const metadata: Metadata = {
  title: "activity/timeline",
  description: "Recent commits, pull requests, issues, and repository activity from GitHub.",
};

export default function Page() {
  return <ActivityTimelineModule />;
}

import type { Metadata } from "next";

import { ActivityInsightsModule } from "@/components/modules/ActivityInsights";

export const metadata: Metadata = {
  title: "activity/insights",
  description: "Developer insights aggregated from real GitHub repository data.",
};

export default function Page() {
  return <ActivityInsightsModule />;
}

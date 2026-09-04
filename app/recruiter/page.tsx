import type { Metadata } from "next";

import { RecruiterView } from "@/components/modules/Recruiter";
import { profile } from "@/content";

export const metadata: Metadata = {
  title: "quick view",
  description: `${profile.name} — ${profile.role}. ${profile.positioning}`,
};

export default function Page() {
  return <RecruiterView />;
}

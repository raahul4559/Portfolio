import type { Metadata } from "next";

import { ProjectsModule } from "@/components/modules/Projects";
import { moduleById } from "@/content";

export const metadata: Metadata = {
  title: "projects",
  description: moduleById.get("projects")?.description,
};

export default function Page() {
  return <ProjectsModule />;
}

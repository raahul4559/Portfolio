"use client";

import { ActivityModule } from "@/components/modules/Activity";
import { ActivityInsightsModule } from "@/components/modules/ActivityInsights";
import { ActivityTimelineModule } from "@/components/modules/ActivityTimeline";
import { ContactModule } from "@/components/modules/Contact";
import { NowModule } from "@/components/modules/Now";
import { ProjectRepo } from "@/components/modules/ProjectRepo";
import { ProjectsModule } from "@/components/modules/Projects";
import { ReadmeModule } from "@/components/modules/Readme";
import { StackModule } from "@/components/modules/Stack";
import { TimelineModule } from "@/components/modules/Timeline";
import { getProject } from "@/content";

/**
 * Renders a module by route on the client.
 *
 * The primary pane gets its content from the router, which is what makes URLs
 * shareable and metadata real. The split pane has no router of its own, so it
 * resolves the same components directly — which only works because every
 * module reads from static content and holds no server-only state.
 */
export function ModuleView({ route }: { route: string }) {
  if (route === "/") return <ReadmeModule />;
  if (route === "/projects") return <ProjectsModule />;
  if (route === "/stack") return <StackModule />;
  if (route === "/timeline") return <TimelineModule />;
  if (route === "/contact") return <ContactModule />;
  if (route === "/dev/now") return <NowModule />;
  if (route === "/activity") return <ActivityModule />;
  if (route === "/activity/timeline") return <ActivityTimelineModule />;
  if (route === "/activity/insights") return <ActivityInsightsModule />;

  if (route.startsWith("/projects/")) {
    const project = getProject(route.slice("/projects/".length));
    if (project) return <ProjectRepo project={project} />;
  }

  return (
    <div className="text-faint p-8 font-mono text-data">
      no view for {route}
    </div>
  );
}

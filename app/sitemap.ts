import type { MetadataRoute } from "next";

import { moduleRoutes } from "@/lib/routes";
import { projects } from "@/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const modules = moduleRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));

  const caseStudies = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Not a module — deliberately outside the rail/tab system — but still a
  // real, indexable page worth pointing search engines at.
  const recruiterView = [
    { url: `${SITE_URL}/recruiter`, changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  // The activity module's own two sub-routes — real, shareable pages one
  // level below its rail entry, same treatment as the recruiter view above.
  const activityViews = ["/activity/timeline", "/activity/insights"].map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "daily" as const,
    priority: 0.5,
  }));

  return [...modules, ...caseStudies, ...recruiterView, ...activityViews];
}

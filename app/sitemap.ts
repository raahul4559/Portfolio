import type { MetadataRoute } from "next";

import { moduleRoutes } from "@/lib/routes";
import { projects } from "@/content";

const BASE_URL = "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const modules = moduleRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));

  const caseStudies = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Not a module — deliberately outside the rail/tab system — but still a
  // real, indexable page worth pointing search engines at.
  const recruiterView = [
    { url: `${BASE_URL}/recruiter`, changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  return [...modules, ...caseStudies, ...recruiterView];
}

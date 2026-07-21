import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";
import { getAllProjects } from "@/lib/content/projects";
import { getAllEssays } from "@/lib/content/essays";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/projects",
    "/essays",
    "/photography",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const essayRoutes: MetadataRoute.Sitemap = getAllEssays().map((e) => ({
    url: `${siteConfig.url}/essays/${e.slug}`,
    lastModified: new Date(e.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...essayRoutes];
}

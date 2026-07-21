import { getAllProjects } from "./content/projects";
import { getAllEssays } from "./content/essays";
import { getAllPhotos } from "./content/photos";

export type SearchItemType = "project" | "essay" | "photo";

export interface SearchItem {
  type: SearchItemType;
  title: string;
  description: string;
  href: string;
  tags: string[];
}

export function getSearchIndex(): SearchItem[] {
  const projects: SearchItem[] = getAllProjects().map((p) => ({
    type: "project",
    title: p.title,
    description: p.summary,
    href: `/projects/${p.slug}`,
    tags: p.tags,
  }));

  const essays: SearchItem[] = getAllEssays().map((e) => ({
    type: "essay",
    title: e.title,
    description: e.excerpt,
    href: `/essays/${e.slug}`,
    tags: [e.category],
  }));

  const photos: SearchItem[] = getAllPhotos().map((p) => ({
    type: "photo",
    title: p.title,
    description: `${p.species} — ${p.location}`,
    href: "/photography",
    tags: [p.species],
  }));

  return [...projects, ...essays, ...photos];
}

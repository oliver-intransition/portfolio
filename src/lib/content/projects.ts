import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Project, ProjectFrontmatter } from "./types";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

function readProjectFile(filename: string): Project {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = { ...(data as ProjectFrontmatter), slug };
  return { ...frontmatter, content };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map(readProjectFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedProjects(limit = 3): Project[] {
  const all = getAllProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

export function getAllProjectTags(): string[] {
  const tags = new Set<string>();
  getAllProjects().forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

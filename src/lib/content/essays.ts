import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Essay, EssayFrontmatter } from "./types";

const ESSAYS_DIR = path.join(process.cwd(), "content/essays");

function readEssayFile(filename: string): Essay {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(ESSAYS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = { ...(data as EssayFrontmatter), slug };
  return { ...frontmatter, content, readingTime: readingTime(content).text };
}

export function getAllEssays(): Essay[] {
  if (!fs.existsSync(ESSAYS_DIR)) return [];
  return fs
    .readdirSync(ESSAYS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map(readEssayFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedEssay(): Essay | undefined {
  const all = getAllEssays();
  return all.find((e) => e.featured) ?? all[0];
}

export function getEssayBySlug(slug: string): Essay | undefined {
  return getAllEssays().find((e) => e.slug === slug);
}

export function getAllEssaySlugs(): string[] {
  return getAllEssays().map((e) => e.slug);
}

export function getEssaysByCategory(category: string): Essay[] {
  return getAllEssays().filter(
    (e) => e.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAdjacentEssays(slug: string): {
  previous: Essay | null;
  next: Essay | null;
} {
  const all = getAllEssays();
  const index = all.findIndex((e) => e.slug === slug);
  return {
    previous: index < all.length - 1 ? all[index + 1] : null,
    next: index > 0 ? all[index - 1] : null,
  };
}

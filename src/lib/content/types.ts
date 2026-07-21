export interface ProjectFrontmatter {
  title: string;
  summary: string;
  skills: string[];
  tools: string[];
  date: string;
  cover: string;
  tags: string[];
  slug: string;
  featured?: boolean;
}

export interface Project extends ProjectFrontmatter {
  content: string;
}

export type EssayCategory = "Biology" | "Philosophy" | "Commercial";

export interface EssayFrontmatter {
  title: string;
  date: string;
  category: EssayCategory;
  excerpt: string;
  slug: string;
  featured?: boolean;
}

export interface Essay extends EssayFrontmatter {
  content: string;
  readingTime: string;
}

export interface Photo {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  location: string;
  species: string;
  camera?: string;
  lens?: string;
  settings?: string;
  featured?: boolean;
}

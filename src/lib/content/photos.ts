import fs from "node:fs";
import path from "node:path";
import type { Photo } from "./types";

const PHOTOS_FILE = path.join(process.cwd(), "content/photos.json");

export function getAllPhotos(): Photo[] {
  if (!fs.existsSync(PHOTOS_FILE)) return [];
  const raw = fs.readFileSync(PHOTOS_FILE, "utf8");
  return JSON.parse(raw) as Photo[];
}

export function getFeaturedPhoto(): Photo | undefined {
  const all = getAllPhotos();
  return all.find((p) => p.featured) ?? all[0];
}

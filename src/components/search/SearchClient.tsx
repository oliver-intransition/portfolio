"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { SearchItem } from "@/lib/search-index";

const TYPE_LABEL: Record<SearchItem["type"], string> = {
  project: "Project",
  essay: "Essay",
  photo: "Photograph",
};

export function SearchClient({ index }: { index: SearchItem[] }) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: ["title", "description", "tags"],
        threshold: 0.35,
      }),
    [index]
  );

  const results = query.trim()
    ? fuse.search(query).map((r) => r.item)
    : index;

  return (
    <div>
      <div className="relative">
        <Search
          size={17}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, essays, and photography…"
          autoFocus
          className="w-full rounded-lg border border-border bg-transparent py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
        />
      </div>

      <ul className="mt-8 flex flex-col divide-y divide-border">
        {results.length === 0 && (
          <li className="py-6 text-sm text-muted-foreground">
            No results for &ldquo;{query}&rdquo;.
          </li>
        )}
        {results.map((item) => (
          <li key={`${item.type}-${item.href}-${item.title}`}>
            <Link
              href={item.href}
              className="flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <Badge className="shrink-0">{TYPE_LABEL[item.type]}</Badge>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

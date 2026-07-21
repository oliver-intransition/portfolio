import Link from "next/link";
import type { Essay } from "@/lib/content/types";
import { Badge } from "./Badge";
import { formatDate } from "@/lib/utils";

export function EssayCard({ essay }: { essay: Essay }) {
  return (
    <Link
      href={`/essays/${essay.slug}`}
      className="group block border-b border-border py-6 first:pt-0"
    >
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <Badge>{essay.category}</Badge>
        <time dateTime={essay.date}>{formatDate(essay.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{essay.readingTime}</span>
      </div>
      <h3 className="mt-3 text-lg font-medium text-foreground transition-colors group-hover:text-accent">
        {essay.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{essay.excerpt}</p>
    </Link>
  );
}

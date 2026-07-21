import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/content/types";
import { Badge } from "./Badge";
import { formatDate } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-xl border border-border transition-colors hover:border-foreground/20"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <p className="text-xs text-muted-foreground">
          {formatDate(project.date, { year: "numeric", month: "short", day: undefined })}
        </p>
        <h3 className="mt-1.5 text-base font-medium text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}

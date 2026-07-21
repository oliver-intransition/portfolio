import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/content/projects";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.cover }],
      type: "article",
      publishedTime: project.date,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />

      <header>
        <p className="text-sm text-muted-foreground">
          {formatDate(project.date)}
        </p>
        <h1 className="mt-2 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {project.title}
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Skills
            </dt>
            <dd className="mt-1.5 text-sm text-foreground">
              {project.skills.join(", ")}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Tools
            </dt>
            <dd className="mt-1.5 text-sm text-foreground">
              {project.tools.join(", ")}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Date
            </dt>
            <dd className="mt-1.5 text-sm text-foreground">
              {formatDate(project.date)}
            </dd>
          </div>
        </dl>
      </header>

      <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-xl bg-surface">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="768px"
          priority
          className="object-cover"
        />
      </div>

      <div className="mt-10">
        <MarkdownContent source={project.content} />
      </div>
    </article>
  );
}

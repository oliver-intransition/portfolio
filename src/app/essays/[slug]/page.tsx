import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getAdjacentEssays,
  getAllEssaySlugs,
  getEssayBySlug,
} from "@/lib/content/essays";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllEssaySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) return {};

  return {
    title: essay.title,
    description: essay.excerpt,
    openGraph: {
      title: essay.title,
      description: essay.excerpt,
      type: "article",
      publishedTime: essay.date,
    },
  };
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) notFound();

  const { previous, next } = getAdjacentEssays(slug);

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Essays", href: "/essays" },
          { label: essay.title },
        ]}
      />

      <header>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Badge>{essay.category}</Badge>
          <time dateTime={essay.date}>{formatDate(essay.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{essay.readingTime}</span>
        </div>
        <h1 className="mt-3 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {essay.title}
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          {essay.excerpt}
        </p>
      </header>

      <div className="mt-10">
        <MarkdownContent source={essay.content} />
      </div>

      <nav className="mt-16 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {previous ? (
          <Link
            href={`/essays/${previous.slug}`}
            className="group flex flex-col rounded-xl border border-border p-4 transition-colors hover:border-foreground/20"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeft size={13} /> Previous
            </span>
            <span className="mt-1.5 text-sm font-medium text-foreground group-hover:text-accent">
              {previous.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/essays/${next.slug}`}
            className="group flex flex-col items-end rounded-xl border border-border p-4 text-right transition-colors hover:border-foreground/20"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              Next <ArrowRight size={13} />
            </span>
            <span className="mt-1.5 text-sm font-medium text-foreground group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}

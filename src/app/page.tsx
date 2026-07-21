import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { getFeaturedProjects } from "@/lib/content/projects";
import { getFeaturedEssay } from "@/lib/content/essays";
import { getFeaturedPhoto } from "@/lib/content/photos";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export default function Home() {
  const featuredProjects = getFeaturedProjects(3);
  const featuredEssay = getFeaturedEssay();
  const featuredPhoto = getFeaturedPhoto();

  return (
    <div className="mx-auto max-w-4xl px-6">
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          {siteConfig.name}
        </h1>
        <p className="mt-3 text-base text-accent">{siteConfig.tagline}</p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          {siteConfig.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            View projects <ArrowRight size={15} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About me
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      {featuredProjects.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-lg font-medium text-foreground">
              Featured projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All projects
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Featured essay + photo */}
      <section className="grid gap-8 border-t border-border py-16 sm:grid-cols-2">
        {featuredEssay && (
          <Link
            href={`/essays/${featuredEssay.slug}`}
            className="group flex flex-col justify-between rounded-xl border border-border p-6 transition-colors hover:border-foreground/20"
          >
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Featured essay
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                <Badge>{featuredEssay.category}</Badge>
                <span>{formatDate(featuredEssay.date)}</span>
              </div>
              <h3 className="mt-3 text-lg font-medium text-foreground transition-colors group-hover:text-accent">
                {featuredEssay.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {featuredEssay.excerpt}
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
              Read essay <ArrowRight size={14} />
            </span>
          </Link>
        )}

        {featuredPhoto && (
          <Link
            href="/photography"
            className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-xl border border-border p-6"
          >
            <Image
              src={featuredPhoto.src}
              alt={featuredPhoto.title}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="relative">
              <p className="text-sm font-medium text-white/80">
                Featured photograph
              </p>
              <h3 className="mt-2 text-lg font-medium text-white">
                {featuredPhoto.title}
              </h3>
              <p className="mt-1 text-sm text-white/70">
                {featuredPhoto.species} · {featuredPhoto.location}
              </p>
            </div>
          </Link>
        )}
      </section>
    </div>
  );
}

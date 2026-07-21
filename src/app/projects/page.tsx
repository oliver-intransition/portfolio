import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Projects",
  description: "A portfolio of data analytics and applied research projects.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
      <h1 className="text-2xl font-medium tracking-tight text-foreground">
        Projects
      </h1>
      <p className="mt-3 max-w-xl text-base text-muted-foreground">
        A selection of data analytics and applied research work — spanning
        ecology, conservation, and machine learning.
      </p>

      {projects.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">
          No projects yet — check back soon.
        </p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

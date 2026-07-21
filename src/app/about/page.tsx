import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "About",
  description: `Background, interests, and current work of ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <h1 className="text-2xl font-medium tracking-tight text-foreground">
        About
      </h1>

      <div className="prose prose-neutral dark:prose-invert prose-headings:font-medium prose-headings:tracking-tight mt-8 max-w-none">
        <h2>Background</h2>
        <p>
          A recent Biology Master's graduate from the University of Oxford, I am passionate about the intersection of 
          technology, data, and applications of Biology in the real world. My Master's project designed a framework for
          mitigating bird collisions with wind turbines using an understanding of avian biomechanics and visual 
          physiology. I believe that societal progress is driven by interdisciplinary collaboration and technology.
        </p>

        <h2>Interests</h2>
        <p>
          Outside of client work, I read and write about philosophy, commercial insights, and applications of biology in 
          the real world. I hope you find my projects, photography, and essays of value.
        </p>
      </div>
    </div>
  );
}

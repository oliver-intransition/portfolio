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
          I trained in biology before moving into data analytics, and that
          combination has shaped how I approach most problems: start from the
          system&apos;s underlying mechanics, then let the data confirm or
          complicate the story. I&apos;ve worked with conservation nonprofits,
          research groups, and small analytics teams, usually on projects
          where the data is messy, the stakes are real, and the question
          matters more than the tool.
        </p>

        <h2>Interests</h2>
        <p>
          Outside of client work, I read and write about philosophy of
          science — particularly questions about explanation, reduction, and
          how confident we should be in models of complex systems. I spend as
          much time as I can outdoors with a camera, usually somewhere cold,
          waiting for something to move.
        </p>

        <h2>Current work</h2>
        <p>
          I&apos;m currently focused on applied analytics for ecological and
          conservation datasets — building pipelines, dashboards, and models
          that hold up under scrutiny, and writing about the parts of the
          process that don&apos;t usually make it into the final report.
        </p>
      </div>
    </div>
  );
}

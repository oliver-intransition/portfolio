import type { Metadata } from "next";
import Link from "next/link";
import { getAllEssays } from "@/lib/content/essays";
import { EssayCard } from "@/components/ui/EssayCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Pagination } from "@/components/ui/Pagination";
import { cn } from "@/lib/utils";
import type { EssayCategory } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Essays",
  description:
    "Essays on biology, philosophy, and commercial topics in applied data work.",
};

const CATEGORIES: EssayCategory[] = ["Biology", "Philosophy", "Commercial"];
const PER_PAGE = 6;

export default async function EssaysPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category, page } = await searchParams;
  const allEssays = getAllEssays();

  const filtered = category
    ? allEssays.filter((e) => e.category.toLowerCase() === category.toLowerCase())
    : allEssays;

  const currentPage = Math.max(1, Number(page) || 1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const basePath = category ? `/essays?category=${category}` : "/essays";

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Essays" }]} />
      <h1 className="text-2xl font-medium tracking-tight text-foreground">
        Essays
      </h1>
      <p className="mt-3 max-w-xl text-base text-muted-foreground">
        Writing on biology, philosophy, and the commercial side of data work.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/essays"
          className={cn(
            "rounded-full border px-3 py-1 text-sm transition-colors",
            !category
              ? "border-accent text-accent"
              : "border-border text-muted-foreground hover:text-foreground"
          )}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/essays?category=${c}`}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition-colors",
              category?.toLowerCase() === c.toLowerCase()
                ? "border-accent text-accent"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="mt-10">
        {paged.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No essays in this category yet.
          </p>
        ) : (
          paged.map((essay) => <EssayCard key={essay.slug} essay={essay} />)
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={basePath}
      />
    </div>
  );
}

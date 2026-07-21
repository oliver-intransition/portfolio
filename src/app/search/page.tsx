import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SearchClient } from "@/components/search/SearchClient";
import { getSearchIndex } from "@/lib/search-index";

export const metadata: Metadata = {
  title: "Search",
  description: "Search projects, essays, and photography.",
};

export default function SearchPage() {
  const index = getSearchIndex();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <h1 className="text-2xl font-medium tracking-tight text-foreground">
        Search
      </h1>
      <div className="mt-8">
        <SearchClient index={index} />
      </div>
    </div>
  );
}

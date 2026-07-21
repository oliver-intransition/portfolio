import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) => {
    if (page === 1) return basePath;
    const separator = basePath.includes("?") ? "&" : "?";
    return `${basePath}${separator}page=${page}`;
  };

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-between border-t border-border pt-6"
    >
      <Link
        href={pageHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={cn(
          "flex items-center gap-1 text-sm transition-colors",
          currentPage === 1
            ? "pointer-events-none text-muted-foreground/40"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <ChevronLeft size={15} />
        Previous
      </Link>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={pageHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={cn(
          "flex items-center gap-1 text-sm transition-colors",
          currentPage === totalPages
            ? "pointer-events-none text-muted-foreground/40"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Next
        <ChevronRight size={15} />
      </Link>
    </nav>
  );
}

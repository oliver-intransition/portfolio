import type { Metadata } from "next";
import { getAllPhotos } from "@/lib/content/photos";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Photography",
  description: "A gallery of wildlife photography from field trips around the world.",
};

export default function PhotographyPage() {
  const photos = getAllPhotos();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Photography" }]}
      />
      <h1 className="text-2xl font-medium tracking-tight text-foreground">
        Photography
      </h1>
      <p className="mt-3 max-w-xl text-base text-muted-foreground">
        A collection of wildlife photographs from field trips — click any
        image for details.
      </p>

      <div className="mt-12">
        {photos.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No photographs yet — check back soon.
          </p>
        ) : (
          <MasonryGallery photos={photos} />
        )}
      </div>
    </div>
  );
}

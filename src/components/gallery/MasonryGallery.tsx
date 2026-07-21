"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/content/types";
import { Lightbox } from "./Lightbox";

export function MasonryGallery({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg bg-surface"
            aria-label={`Open ${photo.title}`}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="text-left text-sm font-medium text-white">
                {photo.title}
              </p>
              <p className="text-left text-xs text-white/70">
                {photo.species}
              </p>
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          photos={photos}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}

"use client";

import Image from "next/image";
import { useState, useCallback, useRef } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GalleryImage {
  url: string;
  altText: string;
  isDefault: boolean;
}

interface ProductGalleryProps {
  images: GalleryImage[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ProductGallery({ images }: ProductGalleryProps) {
  // Sort so the default image comes first.
  const sorted = [...images].sort((a, b) =>
    a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1,
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [transitioning, setTransitioning] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const activeImage = sorted[activeIndex];

  // Mouse handlers for zoom -----------------------------------------------
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!mainRef.current) return;
      const rect = mainRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomOrigin({ x, y });
      setIsZoomed(true);
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false);
    setZoomOrigin({ x: 50, y: 50 });
  }, []);

  // Thumbnail click -------------------------------------------------------
  const handleThumbnailClick = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setTransitioning(true);
      // Let the opacity drop first, then swap image.
      const timer = setTimeout(() => {
        setActiveIndex(index);
        setTransitioning(false);
      }, 200);
      return () => clearTimeout(timer);
    },
    [activeIndex],
  );

  // Fallback if no images.
  if (sorted.length === 0) {
    return (
      <div className="aspect-[4/5] w-full rounded-lg bg-stone-100 flex items-center justify-center text-stone-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4" role="region" aria-label="Product images">
      {/* ----------------------------------------------------------------- */}
      {/* Main image                                                        */}
      {/* ----------------------------------------------------------------- */}
      <div
        ref={mainRef}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-stone-100 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label="Product image viewer. Hover to zoom in."
      >
        {activeImage && (
          <Image
            key={activeImage.url}
            src={activeImage.url}
            alt={activeImage.altText || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className={[
              "object-cover transition-all duration-300 ease-out",
              transitioning ? "opacity-0" : "opacity-100",
            ].join(" ")}
            style={{
              transform: isZoomed ? "scale(2)" : "scale(1)",
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
            }}
          />
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Thumbnail strip                                                   */}
      {/* ----------------------------------------------------------------- */}
      {sorted.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 -mb-1 scrollbar-thin">
          {sorted.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => handleThumbnailClick(i)}
              aria-label={img.altText || `View image ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
              className={[
                "relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200",
                i === activeIndex
                  ? "border-terracotta ring-1 ring-terracotta/30"
                  : "border-transparent hover:border-stone-300",
              ].join(" ")}
            >
              <Image
                src={img.url}
                alt={img.altText || `Thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

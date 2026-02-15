import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Collections",
  description: "Browse our curated collections of premium easels, brushes, paints, and studio supplies.",
};

const COLLECTIONS = [
  {
    name: "Easels",
    slug: "easels",
    description: "From compact tabletop easels to heavy-duty H-frames, find the perfect support for your work.",
    image: "https://images.unsplash.com/photo-1747311585699-d7a659864cac?w=800&h=600&fit=crop",
    count: 24,
  },
  {
    name: "Brushes & Tools",
    slug: "brushes-tools",
    description: "Professional-grade brushes, palette knives, and essential tools for every medium.",
    image: "https://images.unsplash.com/photo-1758522276630-8ebdf55d7619?w=800&h=600&fit=crop",
    count: 36,
  },
  {
    name: "Paints & Mediums",
    slug: "paints-mediums",
    description: "Artist-quality oils, acrylics, watercolors, and specialty mediums.",
    image: "https://images.unsplash.com/photo-1752649937266-1900d9e176c3?w=800&h=600&fit=crop",
    count: 48,
  },
  {
    name: "Canvas & Surfaces",
    slug: "canvas-surfaces",
    description: "Premium stretched canvases, wood panels, and specialty papers for every technique.",
    image: "https://images.unsplash.com/photo-1580493113011-ad79f792a7c2?w=800&h=600&fit=crop",
    count: 18,
  },
  {
    name: "Studio Furniture",
    slug: "studio-furniture",
    description: "Taborets, storage solutions, and furniture designed for the working artist.",
    image: "https://images.unsplash.com/photo-1763793426538-db411c27894d?w=800&h=600&fit=crop",
    count: 12,
  },
  {
    name: "Gift Sets",
    slug: "gift-sets",
    description: "Curated sets for the aspiring artist or the seasoned professional.",
    image: "https://images.unsplash.com/photo-1731958508590-2283b294e607?w=800&h=600&fit=crop",
    count: 8,
  },
];

export default function CollectionsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="font-heading text-4xl sm:text-5xl text-charcoal">
              Our Collections
            </h1>
            <p className="mt-4 text-[15px] text-stone-600 max-w-xl mx-auto">
              Everything you need for your creative practice, curated by artists
              who understand your craft.
            </p>
          </div>

          {/* Collections grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COLLECTIONS.map((collection) => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="group block rounded-lg overflow-hidden border border-stone-200 bg-warm-white shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={`${collection.name} collection - ${collection.description}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-heading text-xl text-charcoal group-hover:text-terracotta transition-colors">
                      {collection.name}
                    </h2>
                    <span className="text-[12px] text-stone-400 font-medium">
                      {collection.count} items
                    </span>
                  </div>
                  <p className="text-[14px] text-stone-600 leading-relaxed">
                    {collection.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

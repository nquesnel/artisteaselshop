import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { bigcommerceGQL } from "@/lib/bigcommerce/client";
import { GET_CATEGORY_TREE } from "@/lib/bigcommerce/queries/categories";
import type { GetCategoryTreeResponse, CategoryTreeItem } from "@/lib/bigcommerce/types";

export const metadata = {
  title: "Collections",
  description: "Browse our curated collections of premium easels, brushes, paints, and studio supplies.",
};

/** Fallback images & descriptions for categories (Unsplash) */
const CATEGORY_META: Record<string, { image: string; description: string }> = {
  easels: {
    image: "https://images.unsplash.com/photo-1747311585699-d7a659864cac?w=800&h=600&fit=crop",
    description: "From compact tabletop easels to heavy-duty H-frames, find the perfect support for your work.",
  },
  "brushes-tools": {
    image: "/images/collection-brushes-tools.jpg",
    description: "Professional-grade brushes, palette knives, and essential tools for every medium.",
  },
  "paints-mediums": {
    image: "/images/collection-paints-mediums.jpg",
    description: "Artist-quality oils, acrylics, watercolors, and specialty mediums.",
  },
  "canvas-surfaces": {
    image: "https://images.unsplash.com/photo-1580493113011-ad79f792a7c2?w=800&h=600&fit=crop",
    description: "Premium stretched canvases, wood panels, and specialty papers for every technique.",
  },
  "studio-furniture": {
    image: "https://images.unsplash.com/photo-1763793426538-db411c27894d?w=800&h=600&fit=crop",
    description: "Taborets, storage solutions, and furniture designed for the working artist.",
  },
  "gift-sets": {
    image: "https://images.unsplash.com/photo-1731958508590-2283b294e607?w=800&h=600&fit=crop",
    description: "Curated sets for the aspiring artist or the seasoned professional.",
  },
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1580493113011-ad79f792a7c2?w=800&h=600&fit=crop";

/** Flatten category tree into a list of top-level categories */
function flattenTree(tree: CategoryTreeItem[]): CategoryTreeItem[] {
  return tree;
}

export default async function CollectionsPage() {
  let categories: CategoryTreeItem[] = [];

  try {
    const data = await bigcommerceGQL<GetCategoryTreeResponse>(
      GET_CATEGORY_TREE,
      {},
      { revalidate: 3600 },
    );
    categories = flattenTree(data.site.categoryTree);
  } catch {
    // Fall back to empty — the page will show a message
  }

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
            {categories.map((cat) => {
              const slug = cat.path.replace(/^\/|\/$/g, "");
              const meta = CATEGORY_META[slug];
              const image = meta?.image ?? DEFAULT_IMAGE;
              const description = meta?.description ?? cat.description ?? "";

              return (
                <Link
                  key={cat.entityId}
                  href={`/collections/${slug}`}
                  className="group block rounded-lg overflow-hidden border border-stone-200 bg-warm-white shadow-soft hover:shadow-medium transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image}
                      alt={`${cat.name} collection`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="font-heading text-xl text-charcoal group-hover:text-terracotta transition-colors mb-2">
                      {cat.name}
                    </h2>
                    {description && (
                      <p className="text-[14px] text-stone-600 leading-relaxed">
                        {description}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {categories.length === 0 && (
            <p className="text-center text-stone-500 text-[15px] py-12">
              Collections are loading. Please check back shortly.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

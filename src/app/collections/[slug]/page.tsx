import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";
import Link from "next/link";
import { bigcommerceGQL } from "@/lib/bigcommerce/client";
import { GET_CATEGORY_BY_PATH } from "@/lib/bigcommerce/queries/categories";
import type { GetCategoryByPathResponse, ProductSummary } from "@/lib/bigcommerce/types";

// Fallback category metadata in case BC descriptions are empty
const CATEGORY_META: Record<string, { name: string; description: string }> = {
  easels: {
    name: "Easels",
    description:
      "From compact tabletop easels to heavy-duty H-frames, find the perfect support for your work.",
  },
  "brushes-tools": {
    name: "Brushes & Tools",
    description:
      "Professional-grade brushes, palette knives, and essential tools for every medium.",
  },
  "paints-mediums": {
    name: "Paints & Mediums",
    description:
      "Artist-quality oils, acrylics, watercolors, and specialty mediums.",
  },
  "canvas-surfaces": {
    name: "Canvas & Surfaces",
    description:
      "Premium stretched canvases, wood panels, and specialty papers for every technique.",
  },
  "studio-furniture": {
    name: "Studio Furniture",
    description:
      "Taborets, storage solutions, and furniture designed for the working artist.",
  },
  "gift-sets": {
    name: "Gift Sets",
    description:
      "Curated sets for the aspiring artist or the seasoned professional.",
  },
};

/** Convert a BigCommerce product path (e.g. "/products/chevalet-grand-h-frame/") to our frontend path */
function toFrontendPath(bcPath: string): string {
  // BC paths already include /products/ prefix — just strip trailing slash
  return bcPath.replace(/\/+$/, "");
}

/** Transform BC ProductSummary to the shape ProductCard expects */
function toCardProduct(p: ProductSummary) {
  return {
    entityId: p.entityId,
    name: p.name,
    path: toFrontendPath(p.path),
    plainTextDescription: p.plainTextDescription,
    defaultImage: p.defaultImage,
    prices: p.prices,
    brand: p.brand,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) return { title: "Collection" };
  return {
    title: meta.name,
    description: meta.description,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try fetching the category + products from BigCommerce
  let categoryName = CATEGORY_META[slug]?.name ?? slug;
  let categoryDescription = CATEGORY_META[slug]?.description ?? "";
  let products: ReturnType<typeof toCardProduct>[] = [];

  try {
    const data = await bigcommerceGQL<GetCategoryByPathResponse>(
      GET_CATEGORY_BY_PATH,
      { path: `/${slug}/`, first: 50 },
      { revalidate: 300 },
    );

    const node = data.site.route?.node;
    if (node) {
      categoryName = node.name || categoryName;
      if (node.description) categoryDescription = node.description;

      products = (node.products?.edges ?? []).map((edge) =>
        toCardProduct(edge.node),
      );
    }
  } catch (err) {
    console.error(`[Collection] Failed to fetch from BigCommerce:`, err);
  }

  // If no products found and no matching category, show 404
  if (products.length === 0 && !CATEGORY_META[slug]) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-stone-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-charcoal transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/collections"
                  className="hover:text-charcoal transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">
                <span className="text-terracotta">{categoryName}</span>
              </li>
            </ol>
          </nav>

          {/* Category header */}
          <div className="mb-8">
            <h1 className="font-heading text-4xl sm:text-5xl text-charcoal">
              {categoryName}
            </h1>
            {categoryDescription && (
              <p className="mt-3 text-[15px] text-stone-600 max-w-2xl">
                {categoryDescription}
              </p>
            )}
          </div>

          {/* Filters */}
          <ProductFilters productCount={products.length} />

          {/* B2B banner */}
          <div className="my-6 p-4 rounded-lg bg-sage/10 border border-sage/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-[14px] font-medium text-charcoal">
                Buying for a school or studio?
              </p>
              <p className="text-[13px] text-stone-500">
                Get volume discounts up to 30% on bulk orders.
              </p>
            </div>
            <Link
              href="/quote"
              className="text-[13px] font-medium text-terracotta hover:text-terracotta-dark transition-colors shrink-0"
            >
              Request a Quote &rarr;
            </Link>
          </div>

          {/* Product grid */}
          <ProductGrid products={products} />
        </div>
      </main>
      <Footer />
    </>
  );
}

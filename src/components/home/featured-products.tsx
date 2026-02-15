import { bigcommerceGQL } from "@/lib/bigcommerce/client";
import { GET_FEATURED_PRODUCTS, GET_PRODUCTS } from "@/lib/bigcommerce/queries/products";
import type {
  GetFeaturedProductsResponse,
  GetProductsResponse,
  ProductSummary,
  Edge,
} from "@/lib/bigcommerce/types";
import { ProductCard } from "@/components/products/product-card";

/** Convert BC product paths to frontend paths (strip trailing slash) */
function toFrontendPath(bcPath: string): string {
  return bcPath.replace(/\/+$/, "");
}

export async function FeaturedProducts() {
  let products: Edge<ProductSummary>[] = [];

  try {
    // Try featured products first
    const data = await bigcommerceGQL<GetFeaturedProductsResponse>(
      GET_FEATURED_PRODUCTS,
      { first: 8 },
      { revalidate: 600 },
    );
    products = data.site.featuredProducts.edges;

    // If no featured products, fall back to all products
    if (products.length === 0) {
      const fallback = await bigcommerceGQL<GetProductsResponse>(
        GET_PRODUCTS,
        { first: 8 },
        { revalidate: 600 },
      );
      products = fallback.site.products.edges;
    }
  } catch {
    return null;
  }

  if (products.length === 0) return null;

  return (
    <section aria-label="Featured products" className="py-16 sm:py-24 bg-cream/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal">
            Featured Products
          </h2>
          <p className="mt-3 text-[15px] text-stone-600 max-w-xl mx-auto">
            Hand-picked favorites from our collection, trusted by professionals
            and studios worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((edge) => (
            <ProductCard
              key={edge.node.entityId}
              product={{
                ...edge.node,
                path: toFrontendPath(edge.node.path),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

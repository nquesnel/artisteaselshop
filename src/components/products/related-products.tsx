import { ProductCard } from "./product-card";
import type { ComponentProps } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Accept any product shape that ProductCard can render. */
type CardProduct = ComponentProps<typeof ProductCard>["product"];

interface RelatedProductsProps {
  products: CardProduct[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  // Limit to 4 products
  const displayProducts = products.slice(0, 4);

  return (
    <section aria-label="Related products" className="space-y-8">
      {/* Section heading */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-[28px] font-semibold text-charcoal">
          You May Also Like
        </h2>
      </div>

      {/* Product row - horizontal scroll on mobile, 4-column grid on desktop */}
      <div className="relative">
        {/* Desktop grid */}
        <ul className="hidden md:grid md:grid-cols-4 md:gap-6 list-none p-0 m-0" role="list">
          {displayProducts.map((product) => (
            <li key={product.entityId}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        {/* Mobile horizontal scroll */}
        <ul className="flex gap-4 overflow-x-auto pb-4 -mb-4 snap-x snap-mandatory md:hidden scrollbar-thin list-none p-0 m-0" role="list">
          {displayProducts.map((product) => (
            <li
              key={product.entityId}
              className="w-[280px] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

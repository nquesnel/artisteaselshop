import { ProductCard } from "./product-card";
import type { ComponentProps } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Accept any product shape that ProductCard can render. */
type CardProduct = ComponentProps<typeof ProductCard>["product"];

interface ProductGridProps {
  products: CardProduct[];
  columns?: 3 | 4;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-4 text-stone-300"
          aria-hidden="true"
        >
          <path d="M20.91 8.84 8.56 21.16a2 2 0 0 1-2.83 0L2.86 18.3a2 2 0 0 1 0-2.83L15.17 3.1" />
          <path d="m18.5 2.5 3 3" />
          <path d="m14.5 6.5 3 3" />
        </svg>
        <p className="text-[15px] text-stone-500">No products found.</p>
        <p className="mt-1 text-[13px] text-stone-400">
          Try adjusting your filters or browse our collections.
        </p>
      </div>
    );
  }

  const gridCols =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul className={`grid ${gridCols} gap-6 list-none p-0 m-0`} role="list">
      {products.map((product) => (
        <li key={product.entityId}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

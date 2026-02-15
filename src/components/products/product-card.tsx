import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProductCardProps {
  product: {
    entityId: number;
    name: string;
    path: string;
    plainTextDescription?: string;
    defaultImage?: { url: string; altText: string } | null;
    prices?: {
      price?: { value: number; currencyCode: string } | null;
      salePrice?: { value: number; currencyCode: string } | null;
      bulkPricing?:
        | Array<{ minimumQuantity: number; maximumQuantity: number | null }>
        | null;
    } | null;
    brand?: { name: string } | null;
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ProductCard({ product }: ProductCardProps) {
  const { name, path, defaultImage, prices, brand } = product;

  const price = prices?.price;
  const salePrice = prices?.salePrice;
  const hasSale = salePrice && salePrice.value < (price?.value ?? Infinity);
  const hasBulk =
    Array.isArray(prices?.bulkPricing) && prices.bulkPricing.length > 0;

  return (
    <article className="rounded-lg overflow-hidden bg-white shadow-soft transition-shadow duration-300 hover:shadow-medium">
    <Link
      href={path}
      aria-label={name}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
    >
      {/* ----------------------------------------------------------------- */}
      {/* Image                                                             */}
      {/* ----------------------------------------------------------------- */}
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        {defaultImage?.url ? (
          <Image
            src={defaultImage.url}
            alt={defaultImage.altText || name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-stone-300">
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
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}

        {/* Bulk pricing badge */}
        {hasBulk && (
          <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-sage/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white shadow-soft backdrop-blur-sm">
            Bulk Pricing
          </span>
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Info                                                              */}
      {/* ----------------------------------------------------------------- */}
      <div className="p-4">
        {/* Brand */}
        {brand?.name && (
          <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-stone-500">
            {brand.name}
          </p>
        )}

        {/* Name */}
        <h3 className="text-[15px] font-medium leading-snug text-charcoal line-clamp-2">
          {name}
        </h3>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          {hasSale ? (
            <>
              <span className="price text-[15px] font-semibold text-terracotta">
                <span className="sr-only">Sale price: </span>
                {formatCurrency(salePrice.value, salePrice.currencyCode)}
              </span>
              <span className="price text-[13px] text-stone-400 line-through">
                <span className="sr-only">Original price: </span>
                {formatCurrency(price!.value, price!.currencyCode)}
              </span>
            </>
          ) : price ? (
            <span className="price text-[15px] font-semibold text-charcoal">
              {formatCurrency(price.value, price.currencyCode)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
    </article>
  );
}

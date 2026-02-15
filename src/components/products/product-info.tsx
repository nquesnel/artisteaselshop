"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import type {
  Product,
  Connection,
  CustomField,
  ReviewSummary,
  Availability,
  Money,
  Brand,
} from "@/lib/bigcommerce/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Flexible product type that works with both full BigCommerce Product responses
 * and simplified sample / partial data objects.
 *
 * All optional fields gracefully degrade when missing.
 */
interface ProductInfoProduct {
  entityId: number;
  name: string;
  path: string;
  description: string;
  plainTextDescription?: string;
  prices: {
    price: Money;
    salePrice?: Money | null;
    bulkPricing?: Array<{ minimumQuantity: number; maximumQuantity: number | null }> | null;
  };
  brand?: { name: string; path?: string; entityId?: number } | null;
  reviewSummary?: {
    summationOfRatings: number;
    numberOfReviews: number;
    averageRating?: number;
  } | null;
  customFields?:
    | Connection<CustomField>
    | Array<{ name: string; value: string; entityId?: number }>
    | null;
  availabilityV2?: Availability | null;
}

interface ProductInfoProps {
  product: ProductInfoProduct;
  onAddToCart?: (quantity: number) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Normalise customFields from either Connection or plain array. */
function normalizeCustomFields(
  raw?: ProductInfoProduct["customFields"],
): Array<{ name: string; value: string; entityId?: number }> {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  // Connection shape
  return raw.edges.map((e) => e.node);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Stars({
  summary,
}: {
  summary: NonNullable<ProductInfoProduct["reviewSummary"]>;
}) {
  const { numberOfReviews, summationOfRatings } = summary;
  if (numberOfReviews === 0) return null;

  // averageRating may not be present in sample data -- compute from summation
  const averageRating =
    summary.averageRating ?? summationOfRatings / numberOfReviews;

  const fullStars = Math.floor(averageRating);
  const hasHalf = averageRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-2" role="img" aria-label={`Rated ${averageRating.toFixed(1)} out of 5 stars based on ${numberOfReviews} ${numberOfReviews === 1 ? "review" : "reviews"}`}>
      <span className="flex text-terracotta" aria-hidden="true">
        {Array.from({ length: fullStars }, (_, i) => (
          <span key={`full-${i}`}>&#9733;</span>
        ))}
        {hasHalf && <span>&#9733;</span>}
        {Array.from({ length: emptyStars }, (_, i) => (
          <span key={`empty-${i}`} className="text-stone-300">
            &#9733;
          </span>
        ))}
      </span>
      <span className="text-[13px] text-stone-600" aria-hidden="true">
        {averageRating.toFixed(1)} ({numberOfReviews}{" "}
        {numberOfReviews === 1 ? "review" : "reviews"})
      </span>
    </div>
  );
}

function QuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center border border-stone-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        aria-label="Decrease quantity"
        className="flex items-center justify-center w-11 h-11 text-stone-600 hover:bg-stone-50 active:bg-stone-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
        </svg>
      </button>
      <span className="flex items-center justify-center w-12 h-11 text-[15px] font-medium tabular-nums text-charcoal border-x border-stone-200 select-none">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
        className="flex items-center justify-center w-11 h-11 text-stone-600 hover:bg-stone-50 active:bg-stone-100 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      </button>
    </div>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-stone-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-terracotta"
        aria-expanded={open}
      >
        <span className="text-[15px] font-medium text-charcoal">{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-stone-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[2000px] opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ProductInfo({ product, onAddToCart }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const {
    name,
    brand,
    prices,
    plainTextDescription,
    description,
    reviewSummary,
    availabilityV2,
  } = product;

  const price = prices.price;
  const salePrice = prices.salePrice;
  const hasSale = salePrice && salePrice.value < price.value;
  const currencyCode = price.currencyCode;

  const isAvailable = availabilityV2 ? availabilityV2.status === "Available" : true;

  const fields = normalizeCustomFields(product.customFields);

  const handleAddToCart = useCallback(async () => {
    if (!onAddToCart) return;
    setIsAdding(true);
    try {
      await onAddToCart(quantity);
    } finally {
      setIsAdding(false);
    }
  }, [onAddToCart, quantity]);

  // Compute sale percentage ------------------------------------------------
  let salePercent: number | null = null;
  if (hasSale) {
    salePercent = Math.round(
      ((price.value - salePrice.value) / price.value) * 100,
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Brand */}
      {brand && (
        brand.path ? (
          <Link
            href={brand.path}
            className="inline-block text-[11px] font-medium uppercase tracking-wider text-stone-500 hover:text-terracotta transition-colors"
          >
            {brand.name}
          </Link>
        ) : (
          <span className="inline-block text-[11px] font-medium uppercase tracking-wider text-stone-500">
            {brand.name}
          </span>
        )
      )}

      {/* Name */}
      <h1 className="font-heading text-[36px] font-semibold leading-tight text-charcoal -mt-2">
        {name}
      </h1>

      {/* Reviews */}
      {reviewSummary && reviewSummary.numberOfReviews > 0 && (
        <Stars summary={reviewSummary} />
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3">
        {hasSale ? (
          <>
            <span className="price text-[28px] font-semibold text-terracotta">
              <span className="sr-only">Sale price: </span>
              {formatCurrency(salePrice.value, currencyCode)}
            </span>
            <span className="price text-[18px] text-stone-400 line-through">
              <span className="sr-only">Original price: </span>
              {formatCurrency(price.value, currencyCode)}
            </span>
            {salePercent !== null && (
              <span className="inline-flex items-center rounded-full bg-terracotta/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-terracotta">
                Save {salePercent}%
              </span>
            )}
          </>
        ) : (
          <span className="price text-[28px] font-semibold text-charcoal">
            {formatCurrency(price.value, currencyCode)}
          </span>
        )}
      </div>

      {/* Short description */}
      {plainTextDescription && (
        <p className="text-[15px] leading-relaxed text-stone-600 line-clamp-3">
          {plainTextDescription}
        </p>
      )}

      {/* Availability */}
      {availabilityV2 && !isAvailable && (
        <p className="text-[13px] font-medium text-error">
          {availabilityV2.description || "Currently unavailable"}
        </p>
      )}

      {/* Quantity + Add to Cart */}
      <div className="flex flex-col gap-4 pt-2">
        <div className="flex items-center gap-4">
          <span className="text-[13px] font-medium text-stone-500">
            Quantity
          </span>
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!isAvailable || isAdding}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-terracotta px-8 py-4 text-base font-medium text-white shadow-soft transition-all duration-200 hover:bg-terracotta-dark hover:shadow-medium active:bg-terracotta-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAdding ? (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          )}
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>

        {/* Bulk order link */}
        <Link
          href="/quote"
          className="text-center text-[13px] font-medium text-terracotta underline-offset-4 hover:underline transition-colors"
        >
          Request a Quote for Bulk Orders
        </Link>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Accordion sections                                                */}
      {/* ----------------------------------------------------------------- */}
      <div className="mt-4 border-t border-stone-200">
        {/* Description (full HTML) */}
        <Accordion title="Description" defaultOpen>
          <div
            className="prose prose-sm prose-stone max-w-none text-[14px] leading-relaxed text-stone-600
              prose-headings:font-heading prose-headings:text-charcoal
              prose-a:text-terracotta prose-a:underline-offset-4
              prose-strong:text-charcoal"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </Accordion>

        {/* Specifications (custom fields) */}
        {fields.length > 0 && (
          <Accordion title="Specifications">
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              {fields.map((field, i) => (
                <div key={field.entityId ?? i} className="contents">
                  <dt className="text-[13px] font-medium text-stone-500">
                    {field.name}
                  </dt>
                  <dd className="text-[13px] text-charcoal">{field.value}</dd>
                </div>
              ))}
            </dl>
          </Accordion>
        )}

        {/* Shipping info */}
        <Accordion title="Shipping & Returns">
          <div className="space-y-3 text-[14px] leading-relaxed text-stone-600">
            <p>
              <strong className="text-charcoal">Free shipping</strong> on orders
              over $75. Standard shipping typically arrives within 5-7 business
              days.
            </p>
            <p>
              <strong className="text-charcoal">Express shipping</strong>{" "}
              available at checkout for 2-3 business day delivery.
            </p>
            <p>
              We accept returns within 30 days of delivery. Items must be unused
              and in original packaging. Contact our support team to initiate a
              return.
            </p>
          </div>
        </Accordion>
      </div>
    </div>
  );
}

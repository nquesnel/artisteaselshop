import { formatCurrency } from "@/lib/utils";
import type { BulkPricingTier } from "@/lib/bigcommerce/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PricingTiersProps {
  bulkPricing: BulkPricingTier[];
  basePrice: number;
  currencyCode?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function computeTierPrice(tier: BulkPricingTier, basePrice: number): number {
  switch (tier.type) {
    case "PERCENT_OFF":
      return basePrice * (1 - tier.discount / 100);
    case "PRICE_OFF":
      return basePrice - tier.discount;
    case "FIXED":
      return tier.discount;
    default:
      return basePrice;
  }
}

function computeSavePercent(tierPrice: number, basePrice: number): number {
  if (basePrice <= 0) return 0;
  return Math.round(((basePrice - tierPrice) / basePrice) * 100);
}

function formatRange(tier: BulkPricingTier): string {
  if (tier.maximumQuantity === null || tier.maximumQuantity === 0) {
    return `${tier.minimumQuantity}+`;
  }
  return `${tier.minimumQuantity} - ${tier.maximumQuantity}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PricingTiers({
  bulkPricing,
  basePrice,
  currencyCode = "USD",
}: PricingTiersProps) {
  if (!bulkPricing || bulkPricing.length === 0) return null;

  const sorted = [...bulkPricing].sort(
    (a, b) => a.minimumQuantity - b.minimumQuantity,
  );

  return (
    <div className="rounded-lg border border-stone-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 bg-stone-50 border-b border-stone-200">
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
          className="text-sage"
          aria-hidden="true"
        >
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
        <h3 className="text-[13px] font-semibold text-charcoal">
          Bulk Pricing
        </h3>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-stone-100">
            <th className="px-5 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-stone-500">
              Quantity
            </th>
            <th className="px-5 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-stone-500">
              Price / Unit
            </th>
            <th className="px-5 py-2.5 text-right text-[11px] font-medium uppercase tracking-wider text-stone-500">
              Savings
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((tier, i) => {
            const tierPrice = computeTierPrice(tier, basePrice);
            const savePercent = computeSavePercent(tierPrice, basePrice);

            return (
              <tr
                key={i}
                className="border-b border-stone-50 last:border-b-0 hover:bg-stone-50/50 transition-colors"
              >
                <td className="px-5 py-3 text-[14px] tabular-nums text-charcoal">
                  {formatRange(tier)}
                </td>
                <td className="px-5 py-3 text-[14px] font-medium tabular-nums text-charcoal">
                  {formatCurrency(tierPrice, currencyCode)}
                </td>
                <td className="px-5 py-3 text-right">
                  <span className="inline-flex items-center rounded-full bg-sage/10 px-2.5 py-0.5 text-[11px] font-semibold text-sage-dark">
                    Save {savePercent}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Footer */}
      <div className="px-5 py-3 bg-stone-50 border-t border-stone-200">
        <p className="text-[13px] text-stone-500">
          Schools &amp; Studios:{" "}
          <a
            href="/quote"
            className="font-medium text-terracotta underline-offset-4 hover:underline"
          >
            Request a custom quote for 25+ units
          </a>
        </p>
      </div>
    </div>
  );
}

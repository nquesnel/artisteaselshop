"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProductFiltersProps {
  productCount: number;
}

type SortOption = {
  label: string;
  value: string;
};

type ViewMode = "grid" | "list";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SORT_OPTIONS: SortOption[] = [
  { label: "Featured", value: "FEATURED" },
  { label: "Price: Low to High", value: "LOWEST_PRICE" },
  { label: "Price: High to Low", value: "HIGHEST_PRICE" },
  { label: "Newest", value: "NEWEST" },
  { label: "Best Selling", value: "BEST_SELLING" },
];

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function GridIcon({ active }: { active: boolean }) {
  return (
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
      className={active ? "text-charcoal" : "text-stone-400"}
      aria-hidden="true"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function ListIcon({ active }: { active: boolean }) {
  return (
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
      className={active ? "text-charcoal" : "text-stone-400"}
      aria-hidden="true"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ProductFilters({ productCount }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "FEATURED";
  const currentView = (searchParams.get("view") as ViewMode) || "grid";

  // Build a new URL preserving existing search params -----------------------
  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "" || (key === "sort" && value === "FEATURED")) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const qs = params.toString();
      router.push(qs ? `?${qs}` : "?", { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
      {/* Left: product count */}
      <p className="text-[13px] text-stone-500">
        Showing{" "}
        <span className="font-medium tabular-nums text-charcoal">
          {productCount}
        </span>{" "}
        {productCount === 1 ? "product" : "products"}
      </p>

      {/* Right: sort + view toggle */}
      <div className="flex items-center gap-4">
        {/* Sort dropdown */}
        <div className="relative">
          <label htmlFor="sort-select" className="sr-only">
            Sort by
          </label>
          <select
            id="sort-select"
            value={currentSort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="appearance-none rounded-lg border border-stone-200 bg-white py-2 pl-3 pr-9 text-[13px] text-charcoal transition-colors hover:border-stone-300 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta/30 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Chevron */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        {/* View toggle */}
        <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => updateParam("view", "grid")}
            aria-label="Grid view"
            aria-pressed={currentView === "grid"}
            className={`flex items-center justify-center w-9 h-9 transition-colors ${
              currentView === "grid"
                ? "bg-stone-100"
                : "bg-white hover:bg-stone-50"
            }`}
          >
            <GridIcon active={currentView === "grid"} />
          </button>
          <button
            type="button"
            onClick={() => updateParam("view", "list")}
            aria-label="List view"
            aria-pressed={currentView === "list"}
            className={`flex items-center justify-center w-9 h-9 transition-colors border-l border-stone-200 ${
              currentView === "list"
                ? "bg-stone-100"
                : "bg-white hover:bg-stone-50"
            }`}
          >
            <ListIcon active={currentView === "list"} />
          </button>
        </div>
      </div>
    </div>
  );
}

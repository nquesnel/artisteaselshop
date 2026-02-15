// =============================================================================
// Site-wide Constants
// =============================================================================

export const SITE_NAME = "Artist Easel Shop";
export const SITE_DESCRIPTION =
  "Premium easels, brushes, and studio supplies for artists who demand the best. Bulk pricing available for schools and studios.";
export const SITE_URL = "https://artisteaselshop.com";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Shop All", href: "/collections" },
  { label: "Easels", href: "/collections/easels" },
  { label: "Brushes", href: "/collections/brushes" },
  { label: "Studio Supplies", href: "/collections/studio-supplies" },
  { label: "Bulk Pricing", href: "/collections?sort=bulk" },
  { label: "About", href: "/about" },
];

// ---------------------------------------------------------------------------
// Studio Types (for targeted marketing sections)
// ---------------------------------------------------------------------------

export interface StudioType {
  name: string;
  description: string;
  href: string;
}

export const STUDIO_TYPES: StudioType[] = [
  {
    name: "Home Studio",
    description:
      "Compact easels and essentials for artists working from home. Space-saving designs without compromising quality.",
    href: "/collections?studio=home",
  },
  {
    name: "Professional Studio",
    description:
      "Heavy-duty easels and premium supplies built for daily professional use. The tools the masters choose.",
    href: "/collections?studio=professional",
  },
  {
    name: "School & University",
    description:
      "Durable, affordable easels in bulk quantities for classrooms and art programs. Volume discounts available.",
    href: "/collections?studio=education",
  },
];

// ---------------------------------------------------------------------------
// Value Propositions (for banners, footer, trust signals)
// ---------------------------------------------------------------------------

export interface ValueProp {
  title: string;
  description: string;
  icon: string; // Lucide icon name for rendering
}

export const VALUE_PROPS: ValueProp[] = [
  {
    title: "Free Shipping $75+",
    description: "Complimentary ground shipping on all orders over $75.",
    icon: "Truck",
  },
  {
    title: "Expert Curation",
    description:
      "Every product hand-selected by working artists and educators.",
    icon: "Award",
  },
  {
    title: "Bulk Pricing",
    description:
      "Tiered discounts for schools, studios, and large orders. Save up to 25%.",
    icon: "Tags",
  },
  {
    title: "30-Day Returns",
    description:
      "Not satisfied? Return any unused item within 30 days for a full refund.",
    icon: "RotateCcw",
  },
];

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 48;

// ---------------------------------------------------------------------------
// Revalidation (ISR cache intervals in seconds)
// ---------------------------------------------------------------------------

/** Product list / category pages */
export const REVALIDATE_PRODUCTS = 3600; // 1 hour

/** Individual product detail pages */
export const REVALIDATE_PRODUCT_DETAIL = 1800; // 30 min

/** Category tree / navigation */
export const REVALIDATE_CATEGORIES = 7200; // 2 hours

/** Cart operations (no cache) */
export const REVALIDATE_CART = 0;

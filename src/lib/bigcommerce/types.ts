// =============================================================================
// BigCommerce Storefront GraphQL API Types
// =============================================================================

// ---------------------------------------------------------------------------
// GraphQL Response Wrappers
// ---------------------------------------------------------------------------

export interface GraphQLResponse<T> {
  data: T;
  errors?: GraphQLError[];
}

export interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface Connection<T> {
  pageInfo: PageInfo;
  edges: Edge<T>[];
}

export interface Edge<T> {
  cursor: string;
  node: T;
}

// ---------------------------------------------------------------------------
// Money / Pricing
// ---------------------------------------------------------------------------

export interface Money {
  value: number;
  currencyCode: string;
}

export interface Prices {
  price: Money;
  salePrice: Money | null;
  retailPrice: Money | null;
  basePrice: Money | null;
  bulkPricing: BulkPricingTier[];
}

export interface BulkPricingTier {
  minimumQuantity: number;
  maximumQuantity: number | null;
  /** Fixed price discount (replaces unit price) */
  price?: number;
  /** Percentage off base price */
  percentOff?: number;
  /** Absolute price reduction */
  priceAdjustment?: number;
}

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------

export interface ProductImage {
  url: string;
  urlOriginal: string;
  altText: string;
  isDefault: boolean;
}

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------

export interface Brand {
  entityId: number;
  name: string;
  path: string;
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export interface ReviewSummary {
  summationOfRatings: number;
  numberOfReviews: number;
  averageRating: number;
}

// ---------------------------------------------------------------------------
// Custom Fields
// ---------------------------------------------------------------------------

export interface CustomField {
  entityId: number;
  name: string;
  value: string;
}

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

export interface VariantOption {
  entityId: number;
  displayName: string;
  values: Connection<VariantOptionValue>;
}

export interface VariantOptionValue {
  entityId: number;
  label: string;
  isDefault: boolean;
}

export interface Variant {
  entityId: number;
  sku: string;
  isPurchasable: boolean;
  defaultImage: ProductImage | null;
  prices: Prices | null;
  options: Connection<SelectedVariantOption>;
  inventory: VariantInventory | null;
}

export interface SelectedVariantOption {
  entityId: number;
  displayName: string;
  values: Connection<SelectedVariantOptionValue>;
}

export interface SelectedVariantOptionValue {
  entityId: number;
  label: string;
}

export interface VariantInventory {
  isInStock: boolean;
  aggregated: {
    availableToSell: number;
    warningLevel: number;
  } | null;
}

// ---------------------------------------------------------------------------
// Availability
// ---------------------------------------------------------------------------

export interface Availability {
  status: "Available" | "Unavailable" | "Preorder";
  description: string;
}

// ---------------------------------------------------------------------------
// Product
// ---------------------------------------------------------------------------

export interface Product {
  entityId: number;
  name: string;
  sku: string;
  path: string;
  plainTextDescription: string;
  description: string;
  defaultImage: ProductImage | null;
  images: Connection<ProductImage>;
  prices: Prices;
  brand: Brand | null;
  availabilityV2: Availability;
  reviewSummary: ReviewSummary;
  customFields: Connection<CustomField>;
  productOptions: Connection<VariantOption>;
  variants: Connection<Variant>;
  relatedProducts: Connection<Product>;
  categories: Connection<Category>;
}

/** Lighter product type returned from list/search queries (no full detail). */
export interface ProductSummary {
  entityId: number;
  name: string;
  sku: string;
  path: string;
  plainTextDescription: string;
  defaultImage: ProductImage | null;
  prices: Prices;
  brand: Brand | null;
  availabilityV2: Availability;
  reviewSummary: ReviewSummary;
}

export type ProductEdge = Edge<ProductSummary>;
export type ProductConnection = Connection<ProductSummary>;

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export interface Category {
  entityId: number;
  name: string;
  path: string;
  description: string;
  image: {
    url: string;
    altText: string;
  } | null;
}

export interface CategoryTreeItem {
  entityId: number;
  name: string;
  path: string;
  description: string;
  image: {
    url: string;
    altText: string;
  } | null;
  children: CategoryTreeItem[];
}

// ---------------------------------------------------------------------------
// Cart
// ---------------------------------------------------------------------------

export interface Cart {
  entityId: string;
  currencyCode: string;
  isTaxIncluded: boolean;
  baseAmount: Money;
  discountedAmount: Money;
  amount: Money;
  lineItems: CartLineItems;
  createdAt: { utc: string };
  updatedAt: { utc: string };
}

export interface CartLineItems {
  physicalItems: CartPhysicalItem[];
  digitalItems: CartDigitalItem[];
  giftCertificates: CartGiftCertificate[];
  customItems: CartCustomItem[];
  totalQuantity: number;
}

export interface CartPhysicalItem {
  entityId: string;
  parentEntityId: string | null;
  variantEntityId: number;
  productEntityId: number;
  sku: string;
  name: string;
  url: string;
  imageUrl: string;
  brand: string;
  quantity: number;
  isTaxable: boolean;
  discounts: CartDiscount[];
  discountedAmount: Money;
  couponAmount: Money;
  listPrice: Money;
  originalPrice: Money;
  salePrice: Money;
  extendedListPrice: Money;
  extendedSalePrice: Money;
  selectedOptions: CartSelectedOption[];
}

export interface CartDigitalItem {
  entityId: string;
  parentEntityId: string | null;
  variantEntityId: number;
  productEntityId: number;
  sku: string;
  name: string;
  url: string;
  imageUrl: string;
  brand: string;
  quantity: number;
  isTaxable: boolean;
  discounts: CartDiscount[];
  discountedAmount: Money;
  couponAmount: Money;
  listPrice: Money;
  originalPrice: Money;
  salePrice: Money;
  extendedListPrice: Money;
  extendedSalePrice: Money;
  selectedOptions: CartSelectedOption[];
}

export interface CartGiftCertificate {
  entityId: string;
  name: string;
  amount: Money;
  isTaxable: boolean;
  sender: { name: string; email: string };
  recipient: { name: string; email: string };
  message: string;
}

export interface CartCustomItem {
  entityId: string;
  sku: string;
  name: string;
  quantity: number;
  listPrice: Money;
  extendedListPrice: Money;
}

export interface CartDiscount {
  entityId: number;
  discountedAmount: Money;
}

export interface CartSelectedOption {
  entityId: number;
  name: string;
  value: string;
}

// ---------------------------------------------------------------------------
// Checkout Redirect
// ---------------------------------------------------------------------------

export interface CheckoutRedirectResult {
  redirectedCheckoutUrl: string;
}

// ---------------------------------------------------------------------------
// Sort / Filter Enums (for query variables)
// ---------------------------------------------------------------------------

export type ProductSortInput =
  | "A_TO_Z"
  | "Z_TO_A"
  | "BEST_SELLING"
  | "BEST_REVIEWED"
  | "LOWEST_PRICE"
  | "HIGHEST_PRICE"
  | "NEWEST"
  | "FEATURED"
  | "RELEVANCE";

// ---------------------------------------------------------------------------
// Query Response Types (map to raw GraphQL responses)
// ---------------------------------------------------------------------------

export interface GetProductsResponse {
  site: {
    products: ProductConnection;
  };
}

export interface GetProductByPathResponse {
  site: {
    route: {
      node: Product | null;
    };
  };
}

export interface GetFeaturedProductsResponse {
  site: {
    featuredProducts: ProductConnection;
  };
}

export interface SearchProductsResponse {
  site: {
    search: {
      searchProducts: {
        products: ProductConnection;
      };
    };
  };
}

export interface GetCategoryTreeResponse {
  site: {
    categoryTree: CategoryTreeItem[];
  };
}

export interface GetCategoryByPathResponse {
  site: {
    route: {
      node: Category & {
        products: ProductConnection;
      };
    };
  };
}

export interface GetCartResponse {
  site: {
    cart: Cart | null;
  };
}

export interface CreateCartResponse {
  cart: {
    createCart: {
      cart: Cart;
    };
  };
}

export interface AddCartLineItemsResponse {
  cart: {
    addCartLineItems: {
      cart: Cart;
    };
  };
}

export interface UpdateCartLineItemResponse {
  cart: {
    updateCartLineItem: {
      cart: Cart;
    };
  };
}

export interface DeleteCartLineItemResponse {
  cart: {
    deleteCartLineItem: {
      cart: Cart;
    };
  };
}

export interface CreateCartRedirectUrlsResponse {
  cart: {
    createCartRedirectUrls: {
      redirectUrls: {
        redirectedCheckoutUrl: string;
        embeddedCheckoutUrl: string;
      };
    };
  };
}

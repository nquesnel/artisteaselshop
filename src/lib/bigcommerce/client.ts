// =============================================================================
// BigCommerce API Client
// Thin wrappers for Storefront GraphQL and Management REST APIs.
// Designed for Next.js Server Components / Route Handlers (no Apollo needed).
// =============================================================================

import type { GraphQLResponse, GraphQLError } from "./types";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH;
const CHANNEL_ID = process.env.BIGCOMMERCE_CHANNEL_ID || "1";
const CI_TOKEN = process.env.BIGCOMMERCE_CUSTOMER_IMPERSONATION_TOKEN;
const ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN;

const STOREFRONT_API_URL = `https://store-${STORE_HASH}.mybigcommerce.com/graphql`;
const MANAGEMENT_API_URL = `https://api.bigcommerce.com/stores/${STORE_HASH}`;

// ---------------------------------------------------------------------------
// Error
// ---------------------------------------------------------------------------

export class BigCommerceAPIError extends Error {
  public status: number;
  public graphqlErrors: GraphQLError[];

  constructor(
    message: string,
    status: number = 500,
    graphqlErrors: GraphQLError[] = []
  ) {
    super(message);
    this.name = "BigCommerceAPIError";
    this.status = status;
    this.graphqlErrors = graphqlErrors;
  }
}

// ---------------------------------------------------------------------------
// Storefront GraphQL Client
// ---------------------------------------------------------------------------

interface GQLOptions {
  /** ISR revalidation interval in seconds. Defaults to 3600 (1 hour). */
  revalidate?: number;
  /** Override fetch cache behavior. */
  cache?: RequestCache;
  /** Additional headers. */
  headers?: Record<string, string>;
}

/**
 * Execute a query against the BigCommerce Storefront GraphQL API.
 *
 * Uses the Customer Impersonation token for bearer auth and supports
 * Next.js ISR caching via `next.revalidate`.
 *
 * @example
 * ```ts
 * const data = await bigcommerceGQL<GetProductsResponse>(GET_PRODUCTS, {
 *   first: 12,
 *   sort: "FEATURED",
 * });
 * ```
 */
export async function bigcommerceGQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  options: GQLOptions = {}
): Promise<T> {
  if (!STORE_HASH) {
    throw new BigCommerceAPIError(
      "Missing BIGCOMMERCE_STORE_HASH environment variable",
      500
    );
  }
  if (!CI_TOKEN) {
    throw new BigCommerceAPIError(
      "Missing BIGCOMMERCE_CUSTOMER_IMPERSONATION_TOKEN environment variable",
      500
    );
  }

  const { revalidate = 3600, cache, headers: extraHeaders } = options;

  const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CI_TOKEN}`,
      ...extraHeaders,
    },
    body: JSON.stringify({ query, variables }),
  };

  // Next.js-specific caching. When `cache` is explicitly set it takes
  // priority; otherwise we rely on ISR revalidation.
  if (cache) {
    fetchOptions.cache = cache;
  } else {
    fetchOptions.next = { revalidate };
  }

  const response = await fetch(STOREFRONT_API_URL, fetchOptions);

  const json: GraphQLResponse<T> = await response.json();

  if (!response.ok) {
    const errMessages = json.errors?.map((e) => e.message).join("; ") ?? "";
    throw new BigCommerceAPIError(
      `BigCommerce Storefront API error: ${response.status} ${response.statusText} - ${errMessages}`,
      response.status,
      json.errors ?? []
    );
  }

  if (json.errors && json.errors.length > 0) {
    const messages = json.errors.map((e) => e.message).join("; ");
    throw new BigCommerceAPIError(
      `BigCommerce GraphQL error: ${messages}`,
      400,
      json.errors
    );
  }

  return json.data;
}

// ---------------------------------------------------------------------------
// Management REST API Client
// ---------------------------------------------------------------------------

interface ManagementOptions {
  /** HTTP method. Defaults to GET. */
  method?: "GET" | "POST" | "PUT" | "DELETE";
  /** Request body (will be JSON-serialized). */
  body?: unknown;
  /** Query-string parameters. */
  params?: Record<string, string | number | boolean>;
  /** ISR revalidation in seconds. Defaults to 3600. Set to 0 to skip caching. */
  revalidate?: number;
}

/**
 * Call the BigCommerce Management V3 REST API.
 *
 * The `path` should start with `/v3/...` (e.g. `/v3/catalog/products`).
 *
 * @example
 * ```ts
 * const { data } = await managementAPI<{ data: Product[] }>("/v3/catalog/products", {
 *   params: { limit: 10 },
 * });
 * ```
 */
export async function managementAPI<T>(
  path: string,
  options: ManagementOptions = {}
): Promise<T> {
  if (!STORE_HASH) {
    throw new BigCommerceAPIError(
      "Missing BIGCOMMERCE_STORE_HASH environment variable",
      500
    );
  }
  if (!ACCESS_TOKEN) {
    throw new BigCommerceAPIError(
      "Missing BIGCOMMERCE_ACCESS_TOKEN environment variable",
      500
    );
  }

  const { method = "GET", body, params, revalidate = 3600 } = options;

  let url = `${MANAGEMENT_API_URL}${path}`;

  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, val] of Object.entries(params)) {
      searchParams.set(key, String(val));
    }
    url += `?${searchParams.toString()}`;
  }

  const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": ACCESS_TOKEN,
      Accept: "application/json",
    },
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  if (method === "GET" && revalidate > 0) {
    fetchOptions.next = { revalidate };
  } else {
    fetchOptions.cache = "no-store";
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new BigCommerceAPIError(
      `BigCommerce Management API error: ${response.status} ${response.statusText} - ${text}`,
      response.status
    );
  }

  // Some DELETE responses return 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Get the current channel ID for multi-storefront setups.
 * Falls back to "1" (default channel).
 */
export function getChannelId(): number {
  return parseInt(CHANNEL_ID, 10);
}

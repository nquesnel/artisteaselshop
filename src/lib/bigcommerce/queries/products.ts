// =============================================================================
// Product Queries - BigCommerce Storefront GraphQL API
// =============================================================================

import { PRODUCT_FIELDS, PRODUCT_DETAIL_FIELDS } from "../fragments";

/**
 * Fetch a paginated list of products.
 *
 * Variables:
 *   - first: Int (default 12)
 *   - after: String (cursor for next page)
 *   - sort: ProductSortInput (e.g. "FEATURED", "NEWEST", "A_TO_Z")
 *   - categoryEntityId: Int (optional, filter by category)
 *   - brandEntityIds: [Int!] (optional, filter by brands)
 */
export const GET_PRODUCTS = /* GraphQL */ `
  query GetProducts(
    $first: Int = 12
    $after: String
  ) {
    site {
      products(
        first: $first
        after: $after
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            ...ProductFields
          }
        }
      }
    }
  }
  ${PRODUCT_FIELDS}
`;

/**
 * Fetch a single product by its URL path.
 * Used on product detail pages via dynamic [slug] routes.
 *
 * Variables:
 *   - path: String! (e.g. "/french-field-easel/")
 */
export const GET_PRODUCT_BY_PATH = /* GraphQL */ `
  query GetProductByPath($path: String!) {
    site {
      route(path: $path) {
        node {
          ... on Product {
            ...ProductDetailFields
          }
        }
      }
    }
  }
  ${PRODUCT_DETAIL_FIELDS}
`;

/**
 * Fetch featured / popular products.
 * Used on the homepage hero and featured sections.
 *
 * Variables:
 *   - first: Int (default 8)
 */
export const GET_FEATURED_PRODUCTS = /* GraphQL */ `
  query GetFeaturedProducts($first: Int = 8) {
    site {
      featuredProducts(first: $first) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            ...ProductFields
          }
        }
      }
    }
  }
  ${PRODUCT_FIELDS}
`;

/**
 * Search products by text query.
 *
 * Variables:
 *   - searchTerm: String!
 *   - first: Int (default 12)
 *   - after: String
 *   - sort: SearchProductsSortInput (e.g. "RELEVANCE", "A_TO_Z")
 */
export const SEARCH_PRODUCTS = /* GraphQL */ `
  query SearchProducts(
    $searchTerm: String!
    $first: Int = 12
    $after: String
    $sort: SearchProductsSortInput
  ) {
    site {
      search {
        searchProducts(
          filters: { searchTerm: $searchTerm }
          sort: $sort
        ) {
          products(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            edges {
              cursor
              node {
                ...ProductFields
              }
            }
          }
        }
      }
    }
  }
  ${PRODUCT_FIELDS}
`;

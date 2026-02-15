// =============================================================================
// Category Queries - BigCommerce Storefront GraphQL API
// =============================================================================

import { PRODUCT_FIELDS } from "../fragments";

/**
 * Fetch the full category tree.
 * Returns a nested structure with children for building navigation.
 *
 * No variables required.
 */
export const GET_CATEGORY_TREE = /* GraphQL */ `
  query GetCategoryTree {
    site {
      categoryTree {
        entityId
        name
        path
        description
        children {
          entityId
          name
          path
          description
          children {
            entityId
            name
            path
            description
          }
        }
      }
    }
  }
`;

/**
 * Fetch a single category by its URL path, including its products.
 * Used on collection pages via dynamic [slug] routes.
 *
 * Variables:
 *   - path: String! (e.g. "/easels/")
 *   - first: Int (default 12)
 *   - after: String
 */
export const GET_CATEGORY_BY_PATH = /* GraphQL */ `
  query GetCategoryByPath(
    $path: String!
    $first: Int = 12
    $after: String
  ) {
    site {
      route(path: $path) {
        node {
          ... on Category {
            entityId
            name
            path
            description
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
  }
  ${PRODUCT_FIELDS}
`;

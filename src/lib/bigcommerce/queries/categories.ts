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
        productCount
        image {
          url(width: 400, height: 400)
          altText
        }
        children {
          entityId
          name
          path
          description
          productCount
          image {
            url(width: 400, height: 400)
            altText
          }
          children {
            entityId
            name
            path
            description
            productCount
            image {
              url(width: 400, height: 400)
              altText
            }
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
 *   - sort: ProductSortInput
 */
export const GET_CATEGORY_BY_PATH = /* GraphQL */ `
  query GetCategoryByPath(
    $path: String!
    $first: Int = 12
    $after: String
    $sort: ProductSortInput
  ) {
    site {
      route(path: $path) {
        node {
          ... on Category {
            entityId
            name
            path
            description
            productCount
            image {
              url(width: 800, height: 400)
              altText
            }
            products(first: $first, after: $after, sortBy: $sort) {
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

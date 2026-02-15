// =============================================================================
// Cart Mutations & Query - BigCommerce Storefront GraphQL API
// =============================================================================

import { CART_FIELDS } from "../fragments";

/**
 * Get an existing cart by its entity ID.
 *
 * Variables:
 *   - entityId: String!
 */
export const GET_CART = /* GraphQL */ `
  query GetCart($entityId: String!) {
    site {
      cart(entityId: $entityId) {
        ...CartFields
      }
    }
  }
  ${CART_FIELDS}
`;

/**
 * Create a new cart with one or more physical line items.
 *
 * Variables:
 *   - lineItems: [CartLineItemInput!]!
 *     Each item: { productEntityId: Int!, quantity: Int!, variantEntityId: Int, selectedOptions: ... }
 */
export const CREATE_CART = /* GraphQL */ `
  mutation CreateCart($lineItems: [CartLineItemInput!]!) {
    cart {
      createCart(input: { lineItems: $lineItems }) {
        cart {
          ...CartFields
        }
      }
    }
  }
  ${CART_FIELDS}
`;

/**
 * Add line items to an existing cart.
 *
 * Variables:
 *   - cartEntityId: String!
 *   - lineItems: [CartLineItemInput!]!
 */
export const ADD_CART_LINE_ITEMS = /* GraphQL */ `
  mutation AddCartLineItems(
    $cartEntityId: String!
    $lineItems: [CartLineItemInput!]!
  ) {
    cart {
      addCartLineItems(
        input: { cartEntityId: $cartEntityId, data: { lineItems: $lineItems } }
      ) {
        cart {
          ...CartFields
        }
      }
    }
  }
  ${CART_FIELDS}
`;

/**
 * Update a single line item's quantity in an existing cart.
 *
 * Variables:
 *   - cartEntityId: String!
 *   - lineItemEntityId: String!
 *   - quantity: Int!
 *   - productEntityId: Int!
 */
export const UPDATE_CART_LINE_ITEM = /* GraphQL */ `
  mutation UpdateCartLineItem(
    $cartEntityId: String!
    $lineItemEntityId: String!
    $quantity: Int!
    $productEntityId: Int!
  ) {
    cart {
      updateCartLineItem(
        input: {
          cartEntityId: $cartEntityId
          lineItemEntityId: $lineItemEntityId
          data: {
            lineItem: {
              productEntityId: $productEntityId
              quantity: $quantity
            }
          }
        }
      ) {
        cart {
          ...CartFields
        }
      }
    }
  }
  ${CART_FIELDS}
`;

/**
 * Remove a line item from an existing cart.
 *
 * Variables:
 *   - cartEntityId: String!
 *   - lineItemEntityId: String!
 */
export const DELETE_CART_LINE_ITEM = /* GraphQL */ `
  mutation DeleteCartLineItem(
    $cartEntityId: String!
    $lineItemEntityId: String!
  ) {
    cart {
      deleteCartLineItem(
        input: {
          cartEntityId: $cartEntityId
          lineItemEntityId: $lineItemEntityId
        }
      ) {
        cart {
          ...CartFields
        }
      }
    }
  }
  ${CART_FIELDS}
`;

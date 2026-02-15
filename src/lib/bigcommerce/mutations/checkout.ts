// =============================================================================
// Checkout Mutations - BigCommerce Storefront GraphQL API
// =============================================================================

/**
 * Create redirect URLs for a cart so the customer can be sent to
 * the BigCommerce-hosted checkout (or embedded checkout).
 *
 * Variables:
 *   - cartEntityId: String!
 */
export const CREATE_CHECKOUT_REDIRECT = /* GraphQL */ `
  mutation CreateCartRedirectUrls($cartEntityId: String!) {
    cart {
      createCartRedirectUrls(input: { cartEntityId: $cartEntityId }) {
        redirectUrls {
          redirectedCheckoutUrl
          embeddedCheckoutUrl
        }
      }
    }
  }
`;

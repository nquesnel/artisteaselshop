// =============================================================================
// Shared GraphQL Fragments for BigCommerce Storefront API
// =============================================================================

/**
 * Core product fields used in list views, search results, and cards.
 * Keeps payloads small for collection pages.
 */
export const PRODUCT_FIELDS = /* GraphQL */ `
  fragment ProductFields on Product {
    entityId
    name
    sku
    path
    plainTextDescription(characterLimit: 200)
    defaultImage {
      url(width: 600, height: 600)
      urlOriginal
      altText
      isDefault
    }
    prices {
      price {
        value
        currencyCode
      }
      salePrice {
        value
        currencyCode
      }
      retailPrice {
        value
        currencyCode
      }
      basePrice {
        value
        currencyCode
      }
      bulkPricing {
        minimumQuantity
        maximumQuantity
        discount
        type
      }
    }
    brand {
      entityId
      name
      path
    }
    availabilityV2 {
      status
      description
    }
    reviewSummary {
      summationOfRatings
      numberOfReviews
      averageRating
    }
  }
`;

/**
 * Extended product fields for the product detail page.
 * Includes full HTML description, all images, variants, related products,
 * and custom fields.
 */
export const PRODUCT_DETAIL_FIELDS = /* GraphQL */ `
  fragment ProductDetailFields on Product {
    entityId
    name
    sku
    path
    plainTextDescription(characterLimit: 500)
    description
    defaultImage {
      url(width: 800, height: 800)
      urlOriginal
      altText
      isDefault
    }
    images(first: 20) {
      edges {
        cursor
        node {
          url(width: 800, height: 800)
          urlOriginal
          altText
          isDefault
        }
      }
    }
    prices {
      price {
        value
        currencyCode
      }
      salePrice {
        value
        currencyCode
      }
      retailPrice {
        value
        currencyCode
      }
      basePrice {
        value
        currencyCode
      }
      bulkPricing {
        minimumQuantity
        maximumQuantity
        discount
        type
      }
    }
    brand {
      entityId
      name
      path
    }
    availabilityV2 {
      status
      description
    }
    reviewSummary {
      summationOfRatings
      numberOfReviews
      averageRating
    }
    customFields(first: 50) {
      edges {
        cursor
        node {
          entityId
          name
          value
        }
      }
    }
    productOptions(first: 50) {
      edges {
        cursor
        node {
          entityId
          displayName
          ... on MultipleChoiceOption {
            values(first: 50) {
              edges {
                cursor
                node {
                  entityId
                  label
                  isDefault
                }
              }
            }
          }
        }
      }
    }
    variants(first: 100) {
      edges {
        cursor
        node {
          entityId
          sku
          isPurchasable
          defaultImage {
            url(width: 600, height: 600)
            urlOriginal
            altText
            isDefault
          }
          prices {
            price {
              value
              currencyCode
            }
            salePrice {
              value
              currencyCode
            }
            basePrice {
              value
              currencyCode
            }
            bulkPricing {
              minimumQuantity
              maximumQuantity
              discount
              type
            }
          }
          options(first: 50) {
            edges {
              cursor
              node {
                entityId
                displayName
                values(first: 50) {
                  edges {
                    cursor
                    node {
                      entityId
                      label
                    }
                  }
                }
              }
            }
          }
          inventory {
            isInStock
            aggregated {
              availableToSell
              warningLevel
            }
          }
        }
      }
    }
    relatedProducts(first: 8) {
      edges {
        cursor
        node {
          entityId
          name
          path
          plainTextDescription(characterLimit: 200)
          defaultImage {
            url(width: 600, height: 600)
            urlOriginal
            altText
            isDefault
          }
          prices {
            price {
              value
              currencyCode
            }
            salePrice {
              value
              currencyCode
            }
            bulkPricing {
              minimumQuantity
              maximumQuantity
              discount
              type
            }
          }
          brand {
            entityId
            name
            path
          }
          availabilityV2 {
            status
            description
          }
          reviewSummary {
            summationOfRatings
            numberOfReviews
            averageRating
          }
        }
      }
    }
    categories(first: 10) {
      edges {
        cursor
        node {
          entityId
          name
          path
        }
      }
    }
  }
`;

/**
 * Cart line-item fields shared across cart mutations.
 */
export const CART_FIELDS = /* GraphQL */ `
  fragment CartFields on Cart {
    entityId
    currencyCode
    isTaxIncluded
    baseAmount {
      value
      currencyCode
    }
    discountedAmount {
      value
      currencyCode
    }
    amount {
      value
      currencyCode
    }
    lineItems {
      physicalItems {
        entityId
        parentEntityId
        variantEntityId
        productEntityId
        sku
        name
        url
        imageUrl
        brand
        quantity
        isTaxable
        discounts {
          entityId
          discountedAmount {
            value
            currencyCode
          }
        }
        discountedAmount {
          value
          currencyCode
        }
        couponAmount {
          value
          currencyCode
        }
        listPrice {
          value
          currencyCode
        }
        originalPrice {
          value
          currencyCode
        }
        salePrice {
          value
          currencyCode
        }
        extendedListPrice {
          value
          currencyCode
        }
        extendedSalePrice {
          value
          currencyCode
        }
        selectedOptions {
          entityId
          name
          ... on CartSelectedMultipleChoiceOption {
            value
          }
        }
      }
      digitalItems {
        entityId
        parentEntityId
        variantEntityId
        productEntityId
        sku
        name
        url
        imageUrl
        brand
        quantity
        isTaxable
        discounts {
          entityId
          discountedAmount {
            value
            currencyCode
          }
        }
        discountedAmount {
          value
          currencyCode
        }
        couponAmount {
          value
          currencyCode
        }
        listPrice {
          value
          currencyCode
        }
        originalPrice {
          value
          currencyCode
        }
        salePrice {
          value
          currencyCode
        }
        extendedListPrice {
          value
          currencyCode
        }
        extendedSalePrice {
          value
          currencyCode
        }
        selectedOptions {
          entityId
          name
          ... on CartSelectedMultipleChoiceOption {
            value
          }
        }
      }
      giftCertificates {
        entityId
        name
        amount {
          value
          currencyCode
        }
        isTaxable
        sender {
          name
          email
        }
        recipient {
          name
          email
        }
        message
      }
      customItems {
        entityId
        sku
        name
        quantity
        listPrice {
          value
          currencyCode
        }
        extendedListPrice {
          value
          currencyCode
        }
      }
      totalQuantity
    }
    createdAt {
      utc
    }
    updatedAt {
      utc
    }
  }
`;

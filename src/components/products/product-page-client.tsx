"use client";

import { useCartStore } from "@/stores/cart-store";
import { ProductInfo } from "@/components/products/product-info";

interface ProductForCart {
  entityId: number;
  name: string;
  path: string;
  description: string;
  plainTextDescription?: string;
  defaultImage?: { url: string; altText: string } | null;
  prices: {
    price: { value: number; currencyCode: string };
    salePrice?: { value: number; currencyCode: string } | null;
    bulkPricing?: Array<{
      minimumQuantity: number;
      maximumQuantity: number | null;
    }> | null;
  };
  brand?: { name: string; path?: string; entityId?: number } | null;
  reviewSummary?: {
    summationOfRatings: number;
    numberOfReviews: number;
    averageRating?: number;
  } | null;
  customFields?:
    | Array<{ name: string; value: string; entityId?: number }>
    | null;
  availabilityV2?: { status: "Available" | "Unavailable" | "Preorder"; description: string } | null;
}

export function ProductPageClient({ product }: { product: ProductForCart }) {
  const { addItem, openCart } = useCartStore();

  function handleAddToCart(quantity: number) {
    addItem({
      entityId: `product-${product.entityId}-${Date.now()}`,
      productEntityId: product.entityId,
      name: product.name,
      quantity,
      price: product.prices.price.value,
      salePrice: product.prices.salePrice?.value,
      imageUrl: product.defaultImage?.url,
      path: product.path,
    });
    openCart();
  }

  return (
    <ProductInfo product={product} onAddToCart={handleAddToCart} />
  );
}

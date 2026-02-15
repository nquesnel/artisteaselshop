"use client";

import { create } from "zustand";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CartLineItem {
  entityId: string;
  productEntityId: number;
  variantEntityId?: number;
  name: string;
  quantity: number;
  price: number;
  salePrice?: number;
  imageUrl?: string;
  path: string;
  sku?: string;
}

interface CartState {
  items: CartLineItem[];
  cartEntityId: string | null;
  isOpen: boolean;
  isLoading: boolean;

  // API-backed actions
  fetchCart: () => Promise<void>;
  addItem: (productEntityId: number, quantity: number) => Promise<void>;
  updateQuantity: (entityId: string, quantity: number) => Promise<void>;
  removeItem: (entityId: string) => Promise<void>;
  checkout: () => Promise<string | null>;

  // UI actions
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  totalItems: () => number;
  subtotal: () => number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Convert a BigCommerce product URL to our frontend path.
 * BC cart items have URLs like "https://store-xxx.mybigcommerce.com/products/slug/"
 * or just "/products/slug/". We strip the trailing slash to match our routes.
 */
function bcUrlToPath(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.pathname.replace(/\/+$/, "") || "/";
  } catch {
    return url.replace(/\/+$/, "") || "/";
  }
}

/** Transform a BigCommerce cart response into our CartLineItem array. */
function transformCart(cart: Record<string, unknown> | null): CartLineItem[] {
  if (!cart) return [];

  const lineItems = cart.lineItems as {
    physicalItems?: Array<{
      entityId: string;
      productEntityId: number;
      variantEntityId: number;
      name: string;
      quantity: number;
      sku: string;
      imageUrl: string;
      url: string;
      listPrice: { value: number };
      salePrice: { value: number };
    }>;
    digitalItems?: Array<{
      entityId: string;
      productEntityId: number;
      variantEntityId: number;
      name: string;
      quantity: number;
      sku: string;
      imageUrl: string;
      url: string;
      listPrice: { value: number };
      salePrice: { value: number };
    }>;
  };

  const items: CartLineItem[] = [];

  for (const item of lineItems.physicalItems ?? []) {
    const hasSale =
      item.salePrice &&
      item.listPrice &&
      item.salePrice.value < item.listPrice.value;
    items.push({
      entityId: item.entityId,
      productEntityId: item.productEntityId,
      variantEntityId: item.variantEntityId,
      name: item.name,
      quantity: item.quantity,
      price: item.listPrice.value,
      salePrice: hasSale ? item.salePrice.value : undefined,
      imageUrl: item.imageUrl,
      path: bcUrlToPath(item.url),
      sku: item.sku,
    });
  }

  for (const item of lineItems.digitalItems ?? []) {
    const hasSale =
      item.salePrice &&
      item.listPrice &&
      item.salePrice.value < item.listPrice.value;
    items.push({
      entityId: item.entityId,
      productEntityId: item.productEntityId,
      variantEntityId: item.variantEntityId,
      name: item.name,
      quantity: item.quantity,
      price: item.listPrice.value,
      salePrice: hasSale ? item.salePrice.value : undefined,
      imageUrl: item.imageUrl,
      path: bcUrlToPath(item.url),
      sku: item.sku,
    });
  }

  return items;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  cartEntityId: null,
  isOpen: false,
  isLoading: false,

  fetchCart: async () => {
    try {
      const res = await fetch("/api/cart");
      const { cart } = await res.json();
      if (cart) {
        set({
          items: transformCart(cart),
          cartEntityId: (cart as { entityId: string }).entityId,
        });
      }
    } catch {
      // Silently fail — cart is optional
    }
  },

  addItem: async (productEntityId, quantity) => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineItems: [{ productEntityId, quantity }],
        }),
      });
      const { cart } = await res.json();
      if (cart) {
        set({
          items: transformCart(cart),
          cartEntityId: (cart as { entityId: string }).entityId,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (entityId, quantity) => {
    if (quantity <= 0) {
      return get().removeItem(entityId);
    }

    const item = get().items.find((i) => i.entityId === entityId);
    if (!item) return;

    // Optimistic update
    set((state) => ({
      items: state.items.map((i) =>
        i.entityId === entityId ? { ...i, quantity } : i,
      ),
      isLoading: true,
    }));

    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineItemEntityId: entityId,
          quantity,
          productEntityId: item.productEntityId,
        }),
      });
      const { cart } = await res.json();
      if (cart) {
        set({ items: transformCart(cart), isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      // Revert optimistic update by re-fetching
      set({ isLoading: false });
      get().fetchCart();
    }
  },

  removeItem: async (entityId) => {
    // Optimistic removal
    const previousItems = get().items;
    set((state) => ({
      items: state.items.filter((i) => i.entityId !== entityId),
      isLoading: true,
    }));

    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineItemEntityId: entityId }),
      });
      const { cart } = await res.json();
      if (cart) {
        set({ items: transformCart(cart), isLoading: false });
      } else {
        set({ items: [], cartEntityId: null, isLoading: false });
      }
    } catch {
      // Revert
      set({ items: previousItems, isLoading: false });
    }
  },

  checkout: async () => {
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const { checkoutUrl } = await res.json();
      return checkoutUrl ?? null;
    } catch {
      return null;
    }
  },

  clearCart: () => set({ items: [], cartEntityId: null }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  subtotal: () =>
    get().items.reduce(
      (sum, i) => sum + (i.salePrice ?? i.price) * i.quantity,
      0,
    ),
}));

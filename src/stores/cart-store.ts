"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  selectedOptions?: Record<string, string>;
}

interface CartState {
  items: CartLineItem[];
  cartEntityId: string | null;
  isOpen: boolean;
  isLoading: boolean;

  // Actions
  setCart: (items: CartLineItem[], cartEntityId: string) => void;
  addItem: (item: CartLineItem) => void;
  updateQuantity: (entityId: string, quantity: number) => void;
  removeItem: (entityId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setLoading: (loading: boolean) => void;

  // Computed
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      cartEntityId: null,
      isOpen: false,
      isLoading: false,

      setCart: (items, cartEntityId) => set({ items, cartEntityId }),

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productEntityId === item.productEntityId &&
              i.variantEntityId === item.variantEntityId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.entityId === existing.entityId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      updateQuantity: (entityId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.entityId !== entityId)
              : state.items.map((i) =>
                  i.entityId === entityId ? { ...i, quantity } : i
                ),
        })),

      removeItem: (entityId) =>
        set((state) => ({
          items: state.items.filter((i) => i.entityId !== entityId),
        })),

      clearCart: () => set({ items: [], cartEntityId: null }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setLoading: (isLoading) => set({ isLoading }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce(
          (sum, i) => sum + (i.salePrice ?? i.price) * i.quantity,
          0
        ),
    }),
    {
      name: "artist-easel-cart",
      partialize: (state) => ({
        items: state.items,
        cartEntityId: state.cartEntityId,
      }),
    }
  )
);

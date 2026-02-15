"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore, type CartLineItem } from "@/stores/cart-store";
import { formatCurrency } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CartItem({ item }: { item: CartLineItem }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const displayPrice = item.salePrice ?? item.price;

  return (
    <div className="flex gap-4 py-4 border-b border-stone-100 last:border-b-0">
      {/* Thumbnail */}
      <Link href={item.path} className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-stone-100">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-stone-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={item.path}
            className="text-[14px] font-medium text-charcoal leading-snug line-clamp-2 hover:text-terracotta transition-colors"
          >
            {item.name}
          </Link>
          <button
            type="button"
            onClick={() => removeItem(item.entityId)}
            aria-label={`Remove ${item.name} from cart`}
            className="flex-shrink-0 p-1 text-stone-400 hover:text-error transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity stepper */}
          <div className="inline-flex items-center border border-stone-200 rounded overflow-hidden">
            <button
              type="button"
              onClick={() =>
                updateQuantity(item.entityId, Math.max(1, item.quantity - 1))
              }
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="flex items-center justify-center w-8 h-8 text-stone-500 hover:bg-stone-50 active:bg-stone-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
              </svg>
            </button>
            <span className="flex items-center justify-center w-8 h-8 text-[13px] font-medium tabular-nums text-charcoal border-x border-stone-200 select-none">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.entityId, item.quantity + 1)}
              aria-label="Increase quantity"
              className="flex items-center justify-center w-8 h-8 text-stone-500 hover:bg-stone-50 active:bg-stone-100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </button>
          </div>

          {/* Line total */}
          <span className="price text-[14px] font-semibold text-charcoal">
            {formatCurrency(displayPrice * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center px-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-stone-200 mb-6"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <p className="text-[18px] font-heading font-semibold text-charcoal">
        Your cart is empty
      </p>
      <p className="mt-2 text-[14px] text-stone-500">
        Discover our curated selection of premium artist supplies.
      </p>
      <Link
        href="/products"
        onClick={onClose}
        className="mt-6 inline-flex items-center justify-center rounded-lg border border-charcoal px-6 py-3 text-[14px] font-medium text-charcoal transition-all hover:bg-charcoal hover:text-white"
      >
        Browse Products
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const fetchCart = useCartStore((s) => s.fetchCart);
  const checkout = useCartStore((s) => s.checkout);
  const panelRef = useRef<HTMLElement>(null);
  const [checkingOut, setCheckingOut] = useState(false);

  // Hydrate cart from BigCommerce on first mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleCheckout = useCallback(async () => {
    setCheckingOut(true);
    const url = await checkout();
    if (url) {
      window.location.href = url;
    } else {
      setCheckingOut(false);
      alert("Could not start checkout. Please try again.");
    }
  }, [checkout]);

  // Lock body scroll when drawer is open -----------------------------------
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key ----------------------------------------------------
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    },
    [closeCart],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Focus trap within the cart drawer --------------------------------------
  const handleFocusTrap = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || !panelRef.current || e.key !== "Tab") return;

      const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    [isOpen],
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleFocusTrap);
    return () => window.removeEventListener("keydown", handleFocusTrap);
  }, [isOpen, handleFocusTrap]);

  // Focus the close button when drawer opens
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const closeButton = panelRef.current.querySelector<HTMLElement>('button[aria-label="Close cart"]');
      closeButton?.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/30"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            ref={panelRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-elevated"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
              <h2 className="font-heading text-[20px] font-semibold text-charcoal">
                Your Cart
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex items-center justify-center w-9 h-9 rounded-lg text-stone-500 hover:text-charcoal hover:bg-stone-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            {items.length === 0 ? (
              <EmptyCart onClose={closeCart} />
            ) : (
              <>
                {/* Item list */}
                <div className="flex-1 overflow-y-auto px-6">
                  {items.map((item) => (
                    <CartItem key={item.entityId} item={item} />
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-stone-200 px-6 py-5 space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] text-stone-500">Subtotal</span>
                    <span className="price text-[18px] font-semibold text-charcoal">
                      {formatCurrency(subtotal())}
                    </span>
                  </div>

                  <p className="text-[12px] text-stone-400">
                    Shipping and taxes calculated at checkout.
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={handleCheckout}
                      disabled={checkingOut}
                      className="flex items-center justify-center rounded-lg bg-terracotta px-8 py-3.5 text-[15px] font-medium text-white shadow-soft transition-all hover:bg-terracotta-dark hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {checkingOut ? "Redirecting..." : "Checkout"}
                    </button>
                    <button
                      type="button"
                      onClick={closeCart}
                      className="flex items-center justify-center rounded-lg border border-stone-200 px-8 py-3.5 text-[15px] font-medium text-charcoal transition-all hover:border-stone-300 hover:bg-stone-50"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

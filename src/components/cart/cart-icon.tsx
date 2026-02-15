"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/stores/cart-store";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CartIcon() {
  const openCart = useCartStore((s) => s.openCart);
  const totalItems = useCartStore((s) => s.totalItems);

  const count = totalItems();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={count > 0 ? `Open cart, ${count} items` : "Open cart"}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg text-charcoal hover:bg-stone-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
    >
      {/* Shopping bag icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      {/* Badge */}
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key="cart-badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 400 }}
            className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[20px] h-5 rounded-full bg-terracotta px-1.5 text-[11px] font-semibold tabular-nums text-white shadow-soft pointer-events-none"
            aria-live="polite"
            aria-atomic="true"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

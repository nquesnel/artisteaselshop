"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cart-store";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import Link from "next/link";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, fetchCart, checkout } =
    useCartStore();
  const total = subtotal();
  const [checkingOut, setCheckingOut] = useState(false);

  // Hydrate cart from BigCommerce on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  async function handleCheckout() {
    setCheckingOut(true);
    const url = await checkout();
    if (url) {
      window.location.href = url;
    } else {
      setCheckingOut(false);
      alert("Could not start checkout. Please try again.");
    }
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl text-charcoal mb-8">
            Your Cart
          </h1>

          {items.length === 0 ? (
            /* Empty state */
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-stone-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
              <h2 className="font-heading text-2xl text-charcoal mb-2">
                Your cart is empty
              </h2>
              <p className="text-[15px] text-stone-600 mb-8">
                Looks like you haven&apos;t added anything yet.
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center bg-terracotta text-white font-medium rounded-lg px-6 py-3 text-[15px] hover:bg-terracotta-dark transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="border-b border-stone-200 pb-2 mb-4 hidden sm:grid grid-cols-12 gap-4 text-[12px] font-medium text-stone-500 uppercase tracking-wider">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <div className="divide-y divide-stone-200">
                  {items.map((item) => (
                    <div
                      key={item.entityId}
                      className="py-4 grid grid-cols-12 gap-4 items-center"
                    >
                      {/* Product */}
                      <div className="col-span-12 sm:col-span-6 flex items-center gap-4">
                        <div className="w-20 h-20 rounded-lg bg-stone-100 overflow-hidden shrink-0 relative">
                          {item.imageUrl && (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          )}
                        </div>
                        <div>
                          <Link
                            href={item.path}
                            className="text-[15px] font-medium text-charcoal hover:text-terracotta transition-colors"
                          >
                            {item.name}
                          </Link>
                          {item.sku && (
                            <p className="text-[12px] text-stone-400 mt-0.5">
                              SKU: {item.sku}
                            </p>
                          )}
                          <button
                            onClick={() => removeItem(item.entityId)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="text-[12px] text-stone-400 hover:text-error transition-colors mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-4 sm:col-span-2 flex items-center justify-center">
                        <div className="flex items-center border border-stone-200 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.entityId,
                                item.quantity - 1,
                              )
                            }
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-charcoal transition-colors"
                          >
                            <span aria-hidden="true">&minus;</span>
                          </button>
                          <span
                            className="w-8 text-center text-[14px] font-medium tabular-nums"
                            aria-label={`Quantity: ${item.quantity}`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.entityId,
                                item.quantity + 1,
                              )
                            }
                            aria-label={`Increase quantity of ${item.name}`}
                            className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-charcoal transition-colors"
                          >
                            <span aria-hidden="true">+</span>
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-4 sm:col-span-2 text-right">
                        <span className="text-[14px] text-stone-600 tabular-nums">
                          {formatCurrency(item.salePrice ?? item.price)}
                        </span>
                      </div>

                      {/* Total */}
                      <div className="col-span-4 sm:col-span-2 text-right">
                        <span className="text-[14px] font-medium text-charcoal tabular-nums">
                          {formatCurrency(
                            (item.salePrice ?? item.price) * item.quantity,
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-stone-50 rounded-lg border border-stone-200 p-6 sticky top-32">
                  <h2 className="font-heading text-xl text-charcoal mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-[14px]">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Subtotal</span>
                      <span className="font-medium tabular-nums">
                        {formatCurrency(total)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Shipping</span>
                      <span className="text-stone-400 text-[13px]">
                        Calculated at checkout
                      </span>
                    </div>
                    {total >= 75 && (
                      <div className="flex justify-between text-sage">
                        <span>Free Shipping</span>
                        <span className="font-medium">Eligible!</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-stone-200 mt-4 pt-4 flex justify-between text-[16px] font-semibold">
                    <span>Total</span>
                    <span className="tabular-nums">
                      {formatCurrency(total)}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={checkingOut}
                    className="mt-6 w-full bg-terracotta text-white font-medium rounded-lg px-6 py-3.5 text-[15px] hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {checkingOut ? "Redirecting..." : "Proceed to Checkout"}
                  </button>

                  <Link
                    href="/collections"
                    className="block mt-3 text-center text-[13px] text-stone-500 hover:text-charcoal transition-colors"
                  >
                    Continue Shopping
                  </Link>

                  {/* Trust signals */}
                  <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-center gap-2 text-[12px] text-stone-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                    Secure Checkout
                  </div>
                </div>

                {/* B2B callout */}
                <div className="mt-4 p-4 rounded-lg bg-sage/10 border border-sage/20 text-center">
                  <p className="text-[13px] text-stone-600">
                    Buying in bulk?{" "}
                    <Link
                      href="/quote"
                      className="text-terracotta font-medium hover:text-terracotta-dark"
                    >
                      Request a quote
                    </Link>{" "}
                    for volume pricing.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

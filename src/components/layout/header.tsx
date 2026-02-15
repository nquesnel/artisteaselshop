"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { MobileNav } from "./mobile-nav";

const navLinks = [
  { href: "/collections", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/quote", label: "Quote" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const itemCount = items.length;

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50" role="banner">
        {/* Announcement Bar */}
        <div className="bg-stone-800 text-cream text-[13px] font-body text-center py-2 px-4">
          <p>
            Free Shipping on Orders Over $75{" "}
            <span className="hidden sm:inline">|</span>{" "}
            <span className="hidden sm:inline">
              Bulk Pricing for Schools &amp; Studios
            </span>
          </p>
        </div>

        {/* Main Header */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-warm-white border-b border-stone-200 shadow-soft"
              : "bg-warm-white/80 backdrop-blur-md"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-18">
              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileNavOpen(true)}
                className="lg:hidden p-2 -ml-2 text-charcoal hover:text-terracotta transition-colors"
                aria-label="Open navigation menu"
                aria-expanded={mobileNavOpen}
                aria-controls="mobile-navigation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>

              {/* Logo */}
              <Link
                href="/"
                className="font-heading text-xl sm:text-2xl text-charcoal hover:text-terracotta transition-colors"
              >
                Artist Easel Shop
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-body text-[15px] text-stone-700 hover:text-terracotta transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Cart Icon */}
              <Link
                href="/cart"
                className="relative p-2 -mr-2 text-charcoal hover:text-terracotta transition-colors"
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {itemCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 bg-terracotta text-white text-[11px] font-body font-semibold rounded-full"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </>
  );
}

export { Header };

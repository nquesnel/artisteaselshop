import Link from "next/link";

const quickLinks = [
  { href: "/collections", label: "Shop All" },
  { href: "/collections/easels", label: "Easels" },
  { href: "/collections/brushes", label: "Brushes" },
  { href: "/collections/canvas", label: "Canvas" },
  { href: "/about", label: "About" },
  { href: "/about#contact", label: "Contact" },
];

function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Column 1: Brand */}
          <div>
            <Link
              href="/"
              className="font-heading text-2xl text-charcoal"
            >
              Artist Easel Shop
            </Link>
            <p className="mt-3 font-body text-[15px] text-stone-500 leading-relaxed max-w-xs">
              Premium easels, brushes, and studio supplies for artists who
              demand the best.
            </p>
            {/* Social links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="text-stone-400 hover:text-terracotta transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="text-stone-400 hover:text-terracotta transition-colors"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-stone-400 hover:text-terracotta transition-colors"
                aria-label="Pinterest"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" />
                  <path d="M12 16l-2 6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="font-heading text-lg text-charcoal mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-[15px] text-stone-600 hover:text-terracotta transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Studios & Schools */}
          <div>
            <h3 className="font-heading text-lg text-charcoal mb-4">
              For Studios &amp; Schools
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/collections?bulk=true"
                  className="font-body text-[15px] text-stone-600 hover:text-terracotta transition-colors"
                >
                  Bulk Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="font-body text-[15px] text-stone-600 hover:text-terracotta transition-colors"
                >
                  Request a Quote
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@artisteaselshop.com"
                  className="font-body text-[15px] text-stone-600 hover:text-terracotta transition-colors"
                >
                  hello@artisteaselshop.com
                </a>
              </li>
            </ul>
            <p className="mt-4 font-body text-[13px] text-stone-400 leading-relaxed">
              Dedicated support for educators and studio managers. Volume
              discounts on orders of 10+ units.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-[13px] text-stone-400">
              &copy; {new Date().getFullYear()} Artist Easel Shop. All rights
              reserved.
            </p>
            {/* Payment icons placeholder */}
            <div className="flex items-center gap-3">
              {["Visa", "MC", "Amex", "PayPal"].map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center justify-center w-10 h-6 bg-stone-200 rounded text-[10px] font-body font-medium text-stone-500"
                  aria-label={name}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };

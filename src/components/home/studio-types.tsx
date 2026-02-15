"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const STUDIOS = [
  {
    name: "Home Studio",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    features: [
      "Compact tabletop easels",
      "Space-saving storage solutions",
      "Starter paint sets",
      "Essential brush collections",
    ],
    cta: "Shop Home Studio",
    href: "/collections?studio=home",
  },
  {
    name: "Professional Studio",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    features: [
      "Heavy-duty H-frame easels",
      "Professional-grade pigments",
      "Large format canvases",
      "Specialized mediums & solvents",
    ],
    cta: "Shop Professional",
    href: "/collections?studio=professional",
  },
  {
    name: "School & University",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
    features: [
      "Classroom easel packs (10+)",
      "Student-grade supply bundles",
      "Volume discounts up to 30%",
      "NET-30 payment terms",
    ],
    cta: "Request Bulk Quote",
    href: "/quote",
  },
];

export function StudioTypes() {
  return (
    <section aria-label="Studio types and solutions" className="py-16 sm:py-24 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal">
            Built for Every Studio
          </h2>
          <p className="mt-3 text-[15px] text-stone-600 max-w-xl mx-auto">
            Whether you&apos;re setting up your first home studio or outfitting
            an entire art department, we have you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STUDIOS.map((studio, i) => (
            <motion.div
              key={studio.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-warm-white rounded-lg border border-stone-200 p-6 sm:p-8 shadow-soft hover:shadow-medium transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-terracotta/10 flex items-center justify-center text-terracotta mb-5">
                {studio.icon}
              </div>
              <h3 className="font-heading text-xl text-charcoal mb-4">
                {studio.name}
              </h3>
              <ul className="space-y-2.5 mb-6">
                {studio.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-[14px] text-stone-600"
                  >
                    <svg
                      className="w-4 h-4 text-sage mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={studio.href}
                className="inline-flex items-center text-[14px] font-medium text-terracotta hover:text-terracotta-dark transition-colors group"
              >
                {studio.cta}
                <svg
                  className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

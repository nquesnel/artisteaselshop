"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const COLLECTIONS = [
  {
    name: "Easels",
    slug: "easels",
    description: "Studio, plein air & tabletop",
    image: "https://images.unsplash.com/photo-1747311585699-d7a659864cac?w=600&h=750&fit=crop",
  },
  {
    name: "Brushes & Tools",
    slug: "brushes-tools",
    description: "Professional grade bristles",
    image: "https://images.unsplash.com/photo-1758522276630-8ebdf55d7619?w=600&h=750&fit=crop",
  },
  {
    name: "Paints & Mediums",
    slug: "paints-mediums",
    description: "Oils, acrylics & watercolors",
    image: "https://images.unsplash.com/photo-1752649937266-1900d9e176c3?w=600&h=750&fit=crop",
  },
  {
    name: "Canvas & Surfaces",
    slug: "canvas-surfaces",
    description: "Stretched, panels & paper",
    image: "https://images.unsplash.com/photo-1580493113011-ad79f792a7c2?w=600&h=750&fit=crop",
  },
];

export function FeaturedCollections() {
  return (
    <section aria-label="Shop by category" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal">
            Shop by Category
          </h2>
          <p className="mt-3 text-[15px] text-stone-600 max-w-xl mx-auto">
            Everything you need for your creative practice, curated by artists.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {COLLECTIONS.map((collection, i) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/collections/${collection.slug}`}
                className="group relative block aspect-[4/5] rounded-lg overflow-hidden"
              >
                <Image
                  src={collection.image}
                  alt={`${collection.name} - ${collection.description}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="font-heading text-xl sm:text-2xl text-white">
                    {collection.name}
                  </h3>
                  <p className="mt-1 text-[13px] text-white/90">
                    {collection.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative h-svh min-h-[600px] flex items-center justify-center overflow-hidden"
      aria-label="Hero banner featuring premium artist easels and studio supplies"
    >
      {/* Background image - decorative, content conveyed via aria-label on section */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        role="img"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1747311585699-d7a659864cac?w=1920&q=80')",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/20" />
      <div className="absolute inset-0 bg-charcoal/30" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.h1
          className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          The Art of the
          <br />
          Right Easel
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Premium easels, brushes, and studio supplies for artists who demand
          the best.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <Link
            href="/collections"
            className="inline-flex items-center justify-center bg-terracotta text-white font-medium rounded-lg px-8 py-4 text-[15px] hover:bg-terracotta-dark transition-colors duration-200 min-w-[200px]"
          >
            Shop Easels
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center bg-white/90 text-charcoal font-medium rounded-lg px-8 py-4 text-[15px] hover:bg-white transition-colors duration-200 min-w-[200px] backdrop-blur-sm"
          >
            Request Wholesale Pricing
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator - decorative */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <section aria-label="Newsletter signup" className="py-16 sm:py-24 bg-cream relative texture-canvas">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal">
            Join Our Studio
          </h2>
          <p className="mt-3 text-[15px] text-stone-600">
            Get 10% off your first order, plus early access to new arrivals and
            exclusive studio tips.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-4 rounded-lg bg-sage/10 text-sage-dark text-[15px] font-medium"
              role="status"
              aria-live="polite"
            >
              Welcome to the studio! Check your inbox for your 10% off code.
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                aria-required="true"
                autoComplete="email"
                className="flex-1 px-4 py-3 rounded-lg border border-stone-200 bg-white text-[15px] text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-terracotta text-white font-medium rounded-lg text-[15px] hover:bg-terracotta-dark transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="mt-4 text-[12px] text-stone-400">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "The quality of easels from Artist Easel Shop is unmatched. We&apos;ve outfitted our entire painting department and the bulk pricing saved us thousands.",
    name: "Dr. Sarah Chen",
    title: "Department Chair, School of Visual Arts",
    initials: "SC",
  },
  {
    quote:
      "As a professional artist, I need equipment I can rely on. Their studio easels are built to last and the customer service is exceptional.",
    name: "Marcus Rivera",
    title: "Professional Artist & Instructor",
    initials: "MR",
  },
  {
    quote:
      "We switched our entire studio supply chain to Artist Easel Shop. The NET-30 terms and dedicated account manager make it effortless.",
    name: "Jennifer Park",
    title: "Director, Riverside Art Academy",
    initials: "JP",
  },
];

export function Testimonials() {
  return (
    <section aria-label="Customer testimonials" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal">
            Trusted by Artists & Educators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.blockquote
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-warm-white rounded-lg border border-stone-200 p-6 sm:p-8 shadow-soft relative"
            >
              {/* Decorative quote mark */}
              <span className="absolute top-4 right-6 font-heading text-6xl text-stone-200 leading-none select-none" aria-hidden="true">
                &ldquo;
              </span>

              <p className="text-[15px] text-stone-600 leading-relaxed relative z-10">
                {testimonial.quote}
              </p>

              <footer className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta text-[13px] font-semibold" aria-hidden="true">
                  {testimonial.initials}
                </div>
                <div>
                  <cite className="not-italic text-[14px] font-medium text-charcoal block">
                    {testimonial.name}
                  </cite>
                  <span className="text-[12px] text-stone-500">
                    {testimonial.title}
                  </span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

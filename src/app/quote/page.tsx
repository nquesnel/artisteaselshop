"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

interface QuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  organizationName: string;
  organizationType: string;
  estimatedSpend: string;
  productsOfInterest: string;
  notes: string;
}

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>();

  async function onSubmit(data: QuoteFormData) {
    // In production, this would call /api/quote
    console.log("Quote request:", data);
    await new Promise((r) => setTimeout(r, 1000)); // Simulate API call
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main id="main-content" className="pt-32 pb-16 sm:pb-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-sage"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>
            <h1 className="font-heading text-4xl text-charcoal mb-4">
              Quote Request Received
            </h1>
            <p className="text-[15px] text-stone-600 mb-8 max-w-md mx-auto">
              Thank you for your interest! Our team will review your request and
              get back to you within 1 business day with a custom quote.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center justify-center bg-terracotta text-white font-medium rounded-lg px-6 py-3 text-[15px] hover:bg-terracotta-dark transition-colors"
            >
              Continue Browsing
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8 text-[13px] text-stone-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-charcoal transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">
                <span className="text-terracotta">Request a Quote</span>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h1 className="font-heading text-4xl text-charcoal mb-3">
                Request a Quote
              </h1>
              <p className="text-[15px] text-stone-600 mb-8">
                Tell us about your needs and we&apos;ll put together a custom
                quote with volume pricing.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="quote-fullName" className="block text-[13px] font-medium text-stone-700 mb-1.5">
                      Full Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="quote-fullName"
                      {...register("fullName", { required: "Name is required" })}
                      aria-required="true"
                      aria-invalid={errors.fullName ? "true" : undefined}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      autoComplete="name"
                      className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-[15px] text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                      placeholder="Jane Smith"
                    />
                    {errors.fullName && (
                      <p id="fullName-error" role="alert" className="mt-1 text-[12px] text-error">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="quote-email" className="block text-[13px] font-medium text-stone-700 mb-1.5">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email",
                        },
                      })}
                      aria-required="true"
                      aria-invalid={errors.email ? "true" : undefined}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      autoComplete="email"
                      className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-[15px] text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                      placeholder="jane@school.edu"
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="mt-1 text-[12px] text-error">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone + Org row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="quote-phone" className="block text-[13px] font-medium text-stone-700 mb-1.5">
                      Phone
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      {...register("phone")}
                      autoComplete="tel"
                      className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-[15px] text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-orgName" className="block text-[13px] font-medium text-stone-700 mb-1.5">
                      Organization Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="quote-orgName"
                      {...register("organizationName", {
                        required: "Organization name is required",
                      })}
                      aria-required="true"
                      aria-invalid={errors.organizationName ? "true" : undefined}
                      aria-describedby={errors.organizationName ? "orgName-error" : undefined}
                      autoComplete="organization"
                      className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-[15px] text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                      placeholder="Riverside Art Academy"
                    />
                    {errors.organizationName && (
                      <p id="orgName-error" role="alert" className="mt-1 text-[12px] text-error">
                        {errors.organizationName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Org Type + Budget row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="quote-orgType" className="block text-[13px] font-medium text-stone-700 mb-1.5">
                      Organization Type <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="quote-orgType"
                      {...register("organizationType", {
                        required: "Please select a type",
                      })}
                      aria-required="true"
                      aria-invalid={errors.organizationType ? "true" : undefined}
                      aria-describedby={errors.organizationType ? "orgType-error" : undefined}
                      className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-[15px] text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                    >
                      <option value="">Select type...</option>
                      <option value="school-k12">School (K-12)</option>
                      <option value="university">University / College</option>
                      <option value="art-studio">Art Studio</option>
                      <option value="gallery">Gallery</option>
                      <option value="retail">Retail Store</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.organizationType && (
                      <p id="orgType-error" role="alert" className="mt-1 text-[12px] text-error">
                        {errors.organizationType.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="quote-spend" className="block text-[13px] font-medium text-stone-700 mb-1.5">
                      Estimated Annual Spend
                    </label>
                    <select
                      id="quote-spend"
                      {...register("estimatedSpend")}
                      className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-[15px] text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                    >
                      <option value="">Select range...</option>
                      <option value="under-500">Under $500</option>
                      <option value="500-2000">$500 - $2,000</option>
                      <option value="2000-10000">$2,000 - $10,000</option>
                      <option value="10000-plus">$10,000+</option>
                    </select>
                  </div>
                </div>

                {/* Products of interest */}
                <div>
                  <label htmlFor="quote-products" className="block text-[13px] font-medium text-stone-700 mb-1.5">
                    Products of Interest
                  </label>
                  <input
                    id="quote-products"
                    {...register("productsOfInterest")}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-[15px] text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                    placeholder="e.g., Studio easels, student brush sets, canvas packs"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="quote-notes" className="block text-[13px] font-medium text-stone-700 mb-1.5">
                    Additional Notes
                  </label>
                  <textarea
                    id="quote-notes"
                    {...register("notes")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-[15px] text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors resize-none"
                    placeholder="Any specific requirements, delivery timeline, or questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-terracotta text-white font-medium rounded-lg px-8 py-3.5 text-[15px] hover:bg-terracotta-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                </button>
              </form>
            </div>

            {/* Benefits panel */}
            <div className="lg:col-span-2">
              <div className="bg-cream rounded-lg border border-stone-200 p-6 sm:p-8 sticky top-32">
                <h2 className="font-heading text-xl text-charcoal mb-5">
                  Why Request a Quote?
                </h2>

                <ul className="space-y-4">
                  {[
                    {
                      title: "Volume Discounts up to 30%",
                      desc: "The more you order, the more you save. Special pricing for orders of 10+ units.",
                    },
                    {
                      title: "Dedicated Account Manager",
                      desc: "A single point of contact who knows your needs and can expedite orders.",
                    },
                    {
                      title: "NET-30 Payment Terms",
                      desc: "Flexible payment terms for qualified organizations. No upfront payment required.",
                    },
                    {
                      title: "Priority Shipping",
                      desc: "Bulk orders ship within 2-3 business days with free freight on qualifying orders.",
                    },
                    {
                      title: "Free Samples",
                      desc: "Try before you buy. We'll send samples of any product for qualifying orders.",
                    },
                  ].map((benefit) => (
                    <li key={benefit.title} className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-sage mt-0.5 shrink-0"
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
                      <div>
                        <p className="text-[14px] font-medium text-charcoal">
                          {benefit.title}
                        </p>
                        <p className="text-[13px] text-stone-500 mt-0.5">
                          {benefit.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Testimonial */}
                <div className="mt-8 pt-6 border-t border-stone-200">
                  <blockquote className="text-[13px] text-stone-600 italic leading-relaxed">
                    &ldquo;We outfitted three classrooms last fall. Bulk pricing
                    saved us almost $2,000 and every single easel arrived in
                    perfect condition.&rdquo;
                  </blockquote>
                  <p className="mt-2 text-[12px] text-stone-500">
                    — Brenda K., College Art Department
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

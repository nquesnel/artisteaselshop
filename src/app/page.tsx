import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { StudioTypes } from "@/components/home/studio-types";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function FeaturedProductsSkeleton() {
  return (
    <section className="py-16 sm:py-24 bg-cream/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-5 w-80 mx-auto mt-3" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden bg-white shadow-soft">
              <Skeleton className="aspect-[4/5] w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Artist Easel Shop",
    url: "https://artisteaselshop.com",
    description:
      "Premium easels, brushes, and studio supplies for artists who demand the best. Bulk pricing available for schools and studios.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://artisteaselshop.com/quote",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <Header />
      <main id="main-content">
        <Hero />
        <ValueProps />
        <FeaturedCollections />
        <StudioTypes />
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

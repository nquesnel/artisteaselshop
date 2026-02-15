import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { StudioTypes } from "@/components/home/studio-types";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <ValueProps />
        <FeaturedCollections />
        <StudioTypes />
        {/* TODO: Featured products grid from BigCommerce */}
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

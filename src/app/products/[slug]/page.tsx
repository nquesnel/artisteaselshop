import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductPageClient } from "@/components/products/product-page-client";
import { RelatedProducts } from "@/components/products/related-products";
import Link from "next/link";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  CATEGORIES,
} from "@/lib/sample-products";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({
    slug: p.path.replace("/products/", ""),
  }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const product = getProductBySlug(slug);
    if (!product) return { title: "Not Found" };
    return {
      title: product.name,
      description: product.plainTextDescription,
      openGraph: {
        images: [{ url: product.defaultImage.url }],
      },
    };
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);
  const category = CATEGORIES[product.category];

  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8 text-[13px] text-stone-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-charcoal transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/collections/${product.category}`}
                  className="hover:text-charcoal transition-colors"
                >
                  {category?.name ?? "Shop"}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">
                <span className="text-terracotta">{product.name}</span>
              </li>
            </ol>
          </nav>

          {/* Product layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Gallery */}
            <ProductGallery images={product.images} />

            {/* Right: Info + Add to Cart */}
            <ProductPageClient product={product} />
          </div>

          {/* Related products */}
          <div className="mt-16 sm:mt-24">
            <RelatedProducts products={related} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

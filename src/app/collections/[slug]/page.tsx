import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";
import Link from "next/link";
import { CATEGORIES, getProductsByCategory } from "@/lib/sample-products";

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const category = CATEGORIES[slug];
    if (!category) return { title: "Not Found" };
    return {
      title: category.name,
      description: category.description,
    };
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORIES[slug];

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(slug);

  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-stone-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-charcoal transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/collections"
                  className="hover:text-charcoal transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">
                <span className="text-terracotta">{category.name}</span>
              </li>
            </ol>
          </nav>

          {/* Category header */}
          <div className="mb-8">
            <h1 className="font-heading text-4xl sm:text-5xl text-charcoal">
              {category.name}
            </h1>
            <p className="mt-3 text-[15px] text-stone-600 max-w-2xl">
              {category.description}
            </p>
          </div>

          {/* Filters */}
          <ProductFilters productCount={products.length} />

          {/* B2B banner */}
          <div className="my-6 p-4 rounded-lg bg-sage/10 border border-sage/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-[14px] font-medium text-charcoal">
                Buying for a school or studio?
              </p>
              <p className="text-[13px] text-stone-500">
                Get volume discounts up to 30% on bulk orders.
              </p>
            </div>
            <Link
              href="/quote"
              className="text-[13px] font-medium text-terracotta hover:text-terracotta-dark transition-colors shrink-0"
            >
              Request a Quote &rarr;
            </Link>
          </div>

          {/* Product grid */}
          <ProductGrid products={products} />
        </div>
      </main>
      <Footer />
    </>
  );
}

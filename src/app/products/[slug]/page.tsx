import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductPageClient } from "@/components/products/product-page-client";
import { RelatedProducts } from "@/components/products/related-products";
import Link from "next/link";
import { bigcommerceGQL } from "@/lib/bigcommerce/client";
import { GET_PRODUCT_BY_PATH } from "@/lib/bigcommerce/queries/products";
import type { GetProductByPathResponse, Product } from "@/lib/bigcommerce/types";

/** Convert a BigCommerce product path (e.g. "/products/slug/") to our frontend path */
function toFrontendPath(bcPath: string): string {
  return bcPath.replace(/\/+$/, "");
}

/** Fetch a product from BigCommerce by its slug */
async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    // BC product paths include the /products/ prefix
    const data = await bigcommerceGQL<GetProductByPathResponse>(
      GET_PRODUCT_BY_PATH,
      { path: `/products/${slug}/` },
      { revalidate: 300 },
    );
    return (data.site.route?.node as Product) ?? null;
  } catch (err: unknown) {
    const apiErr = err as { graphqlErrors?: Array<{ message: string }> };
    if (apiErr.graphqlErrors) {
      console.error(`[PDP] GraphQL errors for "${slug}":`, apiErr.graphqlErrors.map(e => e.message));
    } else {
      console.error(`[PDP] Failed to fetch product "${slug}":`, err);
    }
    return null;
  }
}

/** Transform BC product images (Connection) to a flat array */
function flattenImages(product: Product) {
  const images = (product.images?.edges ?? []).map((e) => e.node);
  // If no images in the connection, use defaultImage
  if (images.length === 0 && product.defaultImage) {
    return [{ ...product.defaultImage, isDefault: true }];
  }
  return images;
}

/** Transform BC customFields (Connection) to a flat array */
function flattenCustomFields(product: Product) {
  return (product.customFields?.edges ?? []).map((e) => e.node);
}

/** Get the first category for breadcrumb */
function getCategory(product: Product) {
  const cat = product.categories?.edges?.[0]?.node;
  if (!cat) return null;
  return {
    name: cat.name,
    path: `/collections/${cat.path.replace(/^\/|\/$/g, "")}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: product.name,
    description: product.plainTextDescription,
    openGraph: {
      images: product.defaultImage
        ? [{ url: product.defaultImage.url }]
        : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProduct(slug);

  if (!product) {
    notFound();
  }

  const images = flattenImages(product);
  const customFields = flattenCustomFields(product);
  const category = getCategory(product);

  // Related products from the BC response
  const relatedProducts = (product.relatedProducts?.edges ?? []).map((e) => ({
    entityId: e.node.entityId,
    name: e.node.name,
    path: toFrontendPath(e.node.path),
    plainTextDescription: e.node.plainTextDescription,
    defaultImage: e.node.defaultImage,
    prices: e.node.prices,
    brand: e.node.brand,
  }));

  // Build the product data for the client component
  const productForClient = {
    entityId: product.entityId,
    name: product.name,
    path: toFrontendPath(product.path),
    description: product.description,
    plainTextDescription: product.plainTextDescription,
    defaultImage: product.defaultImage,
    prices: product.prices,
    brand: product.brand,
    reviewSummary: product.reviewSummary,
    customFields,
    availabilityV2: product.availabilityV2,
  };

  // JSON-LD structured data
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.plainTextDescription,
    image: product.defaultImage?.url,
    sku: product.sku,
    brand: product.brand
      ? { "@type": "Brand", name: product.brand.name }
      : undefined,
    offers: {
      "@type": "Offer",
      url: `https://artisteaselshop.com/products/${slug}`,
      priceCurrency: product.prices?.price?.currencyCode ?? "USD",
      price: product.prices?.price?.value,
      availability:
        product.availabilityV2?.status === "Available"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    ...(product.reviewSummary?.numberOfReviews > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.reviewSummary.averageRating,
            reviewCount: product.reviewSummary.numberOfReviews,
          },
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://artisteaselshop.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category?.name ?? "Shop",
        item: `https://artisteaselshop.com${category?.path ?? "/collections"}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://artisteaselshop.com/products/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main id="main-content" className="pt-32 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-[13px] text-stone-500"
          >
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-charcoal transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={category?.path ?? "/collections"}
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
            <ProductGallery images={images} />

            {/* Right: Info + Add to Cart */}
            <ProductPageClient product={productForClient} />
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 sm:mt-24">
              <RelatedProducts products={relatedProducts} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

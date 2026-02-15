import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { bigcommerceGQL } from "@/lib/bigcommerce/client";
import { CREATE_CHECKOUT_REDIRECT } from "@/lib/bigcommerce/mutations/checkout";
import type { CreateCartRedirectUrlsResponse } from "@/lib/bigcommerce/types";

// POST /api/checkout — Get BigCommerce hosted checkout redirect URL
export async function POST() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("bc_cart_id")?.value;

  if (!cartId) {
    return NextResponse.json({ error: "No cart found" }, { status: 404 });
  }

  try {
    const data = await bigcommerceGQL<CreateCartRedirectUrlsResponse>(
      CREATE_CHECKOUT_REDIRECT,
      { cartEntityId: cartId },
      { cache: "no-store" },
    );

    return NextResponse.json({
      checkoutUrl:
        data.cart.createCartRedirectUrls.redirectUrls.redirectedCheckoutUrl,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Checkout failed" },
      { status: 500 },
    );
  }
}

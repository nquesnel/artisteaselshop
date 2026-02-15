import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { bigcommerceGQL } from "@/lib/bigcommerce/client";
import {
  GET_CART,
  CREATE_CART,
  ADD_CART_LINE_ITEMS,
  UPDATE_CART_LINE_ITEM,
  DELETE_CART_LINE_ITEM,
} from "@/lib/bigcommerce/mutations/cart";
import type {
  GetCartResponse,
  CreateCartResponse,
  AddCartLineItemsResponse,
  UpdateCartLineItemResponse,
  DeleteCartLineItemResponse,
} from "@/lib/bigcommerce/types";

const CART_COOKIE = "bc_cart_id";

function setCartCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  cartId: string,
) {
  cookieStore.set(CART_COOKIE, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}

// GET /api/cart — Fetch existing cart
export async function GET() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;

  if (!cartId) {
    return NextResponse.json({ cart: null });
  }

  try {
    const data = await bigcommerceGQL<GetCartResponse>(
      GET_CART,
      { entityId: cartId },
      { cache: "no-store" },
    );
    return NextResponse.json({ cart: data.site.cart });
  } catch {
    // Cart expired or invalid
    cookieStore.delete(CART_COOKIE);
    return NextResponse.json({ cart: null });
  }
}

// POST /api/cart — Create cart or add items
export async function POST(request: Request) {
  const body = await request.json();
  const { lineItems } = body; // [{ productEntityId: number, quantity: number }]

  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;

  let cart;

  if (cartId) {
    try {
      const data = await bigcommerceGQL<AddCartLineItemsResponse>(
        ADD_CART_LINE_ITEMS,
        { cartEntityId: cartId, lineItems },
        { cache: "no-store" },
      );
      cart = data.cart.addCartLineItems.cart;
    } catch {
      // Cart may have expired — create a new one
      const data = await bigcommerceGQL<CreateCartResponse>(
        CREATE_CART,
        { lineItems },
        { cache: "no-store" },
      );
      cart = data.cart.createCart.cart;
    }
  } else {
    const data = await bigcommerceGQL<CreateCartResponse>(
      CREATE_CART,
      { lineItems },
      { cache: "no-store" },
    );
    cart = data.cart.createCart.cart;
  }

  setCartCookie(cookieStore, cart.entityId);
  return NextResponse.json({ cart });
}

// PUT /api/cart — Update a line item's quantity
export async function PUT(request: Request) {
  const body = await request.json();
  const { lineItemEntityId, quantity, productEntityId } = body;

  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;

  if (!cartId) {
    return NextResponse.json({ error: "No cart found" }, { status: 404 });
  }

  try {
    const data = await bigcommerceGQL<UpdateCartLineItemResponse>(
      UPDATE_CART_LINE_ITEM,
      { cartEntityId: cartId, lineItemEntityId, quantity, productEntityId },
      { cache: "no-store" },
    );
    return NextResponse.json({ cart: data.cart.updateCartLineItem.cart });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Update failed" },
      { status: 500 },
    );
  }
}

// DELETE /api/cart — Remove a line item
export async function DELETE(request: Request) {
  const body = await request.json();
  const { lineItemEntityId } = body;

  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;

  if (!cartId) {
    return NextResponse.json({ error: "No cart found" }, { status: 404 });
  }

  try {
    const data = await bigcommerceGQL<DeleteCartLineItemResponse>(
      DELETE_CART_LINE_ITEM,
      { cartEntityId: cartId, lineItemEntityId },
      { cache: "no-store" },
    );

    const cart = data.cart.deleteCartLineItem.cart;

    if (!cart || cart.lineItems.totalQuantity === 0) {
      cookieStore.delete(CART_COOKIE);
    }

    return NextResponse.json({ cart });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Delete failed" },
      { status: 500 },
    );
  }
}

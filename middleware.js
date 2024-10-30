import { NextResponse } from "next/server";
import { VERCEL_CHECKOUT_AB_FLAG } from "./config";

export const config = {
  matcher: ["/:path*"],
};

const THRESHOLD = 0.5; // initial threshold for the new variant (100%)

export function middleware(req) {
  // get the variant from the cookie
  // if not found, randomly set a variant based on threshold
  const variant =
    req.cookies.get(VERCEL_CHECKOUT_AB_FLAG) ||
    (Math.random() < THRESHOLD ? "gk_checkout" : "bw_checkout");

  const url = req.nextUrl.clone();

  const res = NextResponse.rewrite(url);

  // set the variant in the cookie if not already set
  if (!req.cookies.get(VERCEL_CHECKOUT_AB_FLAG)) {
    res.cookies.set(VERCEL_CHECKOUT_AB_FLAG, variant);
  }

  return res;
}

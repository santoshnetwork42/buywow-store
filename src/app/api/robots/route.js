import { NextResponse } from "next/server";

const STORE_ENV = process.env.STORE_ENV;

export async function GET() {
  let content;

  if (STORE_ENV !== "production") {
    content = ["User-agent: *", "Disallow: /"].join("\n");
  } else {
    content = [
      "User-agent: Googlebot",
      "Disallow:",

      "User-agent: Googlebot-Image",
      "Disallow:",

      "User-agent: *",
      "Disallow:",
      "Disallow: /*bag$",
      "Disallow: /bundles/*",
      "Disallow: /public/*",
      "Disallow: /search",
      "Disallow: /pages/account",
      "Disallow: /pages/addresses",
      "Disallow: /pages/account-details",
      "Disallow: /pages/loyalty",
      "Disallow: /order/*",
      "Disallow: /pages/orders",
      "Disallow: /offers/*",

      "User-agent: Amazonbot",
      "Disallow: /",

      "Sitemap: https://www.buywow.in/sitemap.xml",
      "Sitemap: https://www.buywow.in/blog/sitemap.xml",
    ].join("\n");
  }

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

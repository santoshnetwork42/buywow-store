import { NextResponse } from "next/server";
// This function handles GET requests
export async function GET(req) {
  const content = [
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

  // Return the content with a text response
  return new NextResponse(content, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

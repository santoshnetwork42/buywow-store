// app/api/getInitialData.js (or wherever your API route is located)

import { STORE_ID } from "@/config";
import { getInitialData } from "@/graphql/api";
import { errorHandler } from "@/utils/errorHandler";
import fetchData from "@/utils/fetchData";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(req, res) {
  try {
    const cache = caches.default;
    const { ctx } = getCloudflareContext();

    const { origin, pathname, search } = new URL(req.url);
    const cacheKey = new Request(origin + pathname + search, {
      method: req.method,
      headers: req.headers,
    });

    // Try cache first - Enable subrequest caching
    let response;
    if (cache) {
      response = await cache.match(cacheKey);
      if (response) {
        console.log("Cache HIT for preload API");
        return response;
      }
    }

    console.log("Cache MISS for preload API - fetching fresh data");
    const data = await fetchData(
      getInitialData,
      {
        storeId: STORE_ID,
        deviceType: "WEB",
        getStoreSettingInput: {
          storeId: STORE_ID,
          deviceType: "WEB",
        },
        shippingTierFilter: {
          storeId: { eq: STORE_ID },
        },
        ltoProductFilter: {
          storeId: { eq: STORE_ID },
          isArchive: { eq: false },
        },
        ltoProductSort: [{ field: "priority", direction: "asc" }],
      },
      {
        next: { revalidate: 300 }, // 5 minutes revalidation
      },
    );

    response = new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300, s-maxage=600", // Browser: 5min, Cloudflare: 10min
        "Vary": "Accept-Encoding",
      },
    });

    // Cache the response for subrequests
    if (ctx && cache) {
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
      console.log("Cached preload API response");
    }

    return response;
  } catch (error) {
    console.error("Detailed error in getInitialData:", error);
    errorHandler("Error Fetching Initial Data", error);
    return Response.json(
      { error: error.message || "Error fetching data" },
      { status: 500 },
    );
  }
}

// app/api/getInitialData.js (or wherever your API route is located)

import { STORE_ID } from "@/config";
import { getInitialData } from "@/graphql/api";
import { errorHandler } from "@/utils/errorHandler";
import fetchData from "@/utils/fetchData";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  try {
    const cache = caches.default;

    const { ctx } = getCloudflareContext();

    const { origin, pathname } = new URL(request.url);
    const cacheKey = new Request(origin + pathname, request);

    // Try cache
    let response = await cache.match(cacheKey);
    if (response) return response;

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
        next: { revalidate: 0 },
      },
    );

    response = Response.json(data, {
      headers: {
        "Cache-Control": "public, max-age=300", // 5 minutes TTL
      },
    });

    ctx.waitUntil(cache.put(cacheKey, response.clone()));

    return response;
  } catch (error) {
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
        next: { revalidate: 0 },
      },
    );

    return Response.json(data);
    console.error("Detailed error in getInitialData:", error);
    // errorHandler("Error Fetching Initial Data", error);
    // return Response.json(
    //   { error: error.message || "Error fetching data" },
    //   { status: 500 },
    // );
  }
}

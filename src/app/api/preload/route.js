// app/api/getInitialData.js (or wherever your API route is located)

import { STORE_ID } from "@/config";
import { getInitialData } from "@/graphql/api";
import { errorHandler } from "@/utils/errorHandler";
import fetchData from "@/utils/fetchData";

export async function GET() {
  try {
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
  } catch (error) {
    console.error("Detailed error in getInitialData:", error);
    errorHandler("Error Fetching Initial Data", error);
    return Response.json(
      { error: error.message || "Error fetching data" },
      { status: 500 },
    );
  }
}

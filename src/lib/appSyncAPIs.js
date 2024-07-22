import { generateClient } from "aws-amplify/api";
import { getPageBySlug, searchCMSProducts } from "@/graphql/appSync/api";
import { STORE_ID } from "../../config";
import { cache } from "react";

const client = generateClient();

export const searchCMSProductsAPI = cache(
  async (
    productSlugs = [
      "brightening-vitamin-c-foaming-face-wash-with-built-in-brush",
    ],
  ) => {
    try {
      const response = await client.graphql({
        query: searchCMSProducts,
        authMode: "apiKey",
        variables: {
          storeId: STORE_ID,
          products: productSlugs,
        },
      });

      const products = response?.data?.searchCMSProducts?.items || [];
      return products;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
);

export const getPageBySlugAPI = cache(async (slugId) => {
  try {
    const response = await client.graphql({
      query: getPageBySlug,
      authMode: "apiKey",
      variables: {
        storeId: STORE_ID,
        pageType: "",
        slug: slugId,
      },
    });

    return JSON.parse(response?.data?.getPageBySlug || "[]");
  } catch (err) {
    console.error(err);
    return null;
  }
});

import { generateClient } from "aws-amplify/api";
import { searchCMSProducts } from "@/graphql/appSync/api";
import { STORE_ID } from "../../config";

const client = generateClient();

export const searchCMSProductsAPI = async (
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
};

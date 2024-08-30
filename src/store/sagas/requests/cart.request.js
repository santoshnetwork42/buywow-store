import { createShoppingCart, manageShoppingCart } from "@/graphql/api";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

export const manageShoppingCartAPI = async (payload, authMode) => {
  try {
    const response = await client.graphql({
      query: manageShoppingCart,
      variables: {
        input: { ...payload },
      },
      authMode,
    });

    const data = "data" in response ? response.data : response;
    return data?.manageShoppingCart;
  } catch (error) {
    console.error("Error updating shopping cart:", error);
    return null;
  }
};

export const createShoppingCartAPI = async (payload, authMode) => {
  try {
    const response = await client.graphql({
      query: createShoppingCart,
      variables: {
        input: { ...payload },
      },
      authMode,
    });

    const data = "data" in response ? response.data : response;
    return data?.createShoppingCart;
  } catch (error) {
    console.error("Error creating shopping cart:", error);
    return null;
  }
};

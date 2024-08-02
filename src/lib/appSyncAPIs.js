import {
  ensureUserAndDispatchOTP,
  getNavbarAndFooter,
  getOrder,
  getPageBySlug,
  getUser,
  searchCMSProducts,
  verifyCustomOTP,
} from "@/graphql/appSync/api";
import { generateClient } from "aws-amplify/api";
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

export const getPageBySlugAPI = async (slugId) => {
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
};

export const getNavbarAndFooterAPI = async () => {
  try {
    const response = await client.graphql({
      query: getNavbarAndFooter,
      authMode: "apiKey",
      variables: {
        storeId: STORE_ID,
      },
    });

    return JSON.parse(response?.data?.getNavbarAndFooter || "{}");
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getUserAPI = async () => {
  try {
    const response = await client.graphql({
      query: getUser,
      authMode: "userPool",
    });

    console.log("response :>> ", response);
    return response?.data?.getUser || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const checkIfExistingUserAPI = async ({ phone }) => {
  try {
    const { data } = await client.graphql({
      query: ensureUserAndDispatchOTP,
      variables: { storeId: STORE_ID, phone },
      authMode: "apiKey",
    });

    return !!data?.ensureUserAndDispatchOTP?.isExistingUser;
  } catch (error) {
    console.error("Error checking existing user:", error);
    return false;
  }
};

export const verifyCustomOTPAPI = async ({ phone, otp }) => {
  try {
    const { data } = await client.graphql({
      query: verifyCustomOTP,
      variables: { storeId: STORE_ID, phone, otp },
      authMode: "apiKey",
    });

    return !!data?.verifyCustomOTP?.isVerified;
  } catch (error) {
    console.error("Error verifying custom OTP:", error);
    return false;
  }
};

export const getOrderByIdAPI = async ({ id }) => {
  try {
    const { data } = await client.graphql({
      query: getOrder,
      variables: { id },
      authMode: "apiKey",
    });

    return data;
  } catch (error) {
    console.error("Error verifying custom OTP:", error);
    return false;
  }
};

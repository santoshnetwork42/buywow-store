import { STORE_ID } from "@/config";
import {
  applyCoupon,
  createUserAddress,
  deleteUserAddress,
  ensureUserAndDispatchOTP,
  findUserAddresses,
  getLoyalty,
  getNavbarAndFooter,
  getOrder,
  getPageBySlug,
  getUser,
  searchCMSProducts,
  updateUserAddress,
  verifyCustomOTP,
} from "@/graphql/appSync/api";
import { generateClient } from "aws-amplify/api";

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

    return response?.data?.getUser || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getLoyaltyAPI = async ({ user }) => {
  try {
    const response = await client.graphql({
      query: getLoyalty,
      variables: { input: { storeId: STORE_ID, userId: user?.id } },
      authMode: "userPool",
    });

    return response || null;
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

export const getUserAddressAPI = async ({ id, userID }) => {
  try {
    const {
      data: { searchUserAddresses: userAddresses },
    } = await client.graphql({
      query: findUserAddresses,
      variables: {
        filter: { userID: { eq: id } },
      },
      authMode: "userPool",
    });

    return userAddresses;
  } catch (error) {
    console.error("Error Fetching user address:", error);
    return false;
  }
};

export const removeUserAddressAPI = async ({ id, userID }) => {
  try {
    const result = await client.graphql({
      query: deleteUserAddress,
      variables: { input: { id, userID } },
      authMode: "userPool",
    });

    return result;
  } catch (error) {
    console.error("Error Fetching user address:", error);
    return false;
  }
};

export const createUserAddressAPI = async (input) => {
  try {
    const result = await client.graphql({
      query: createUserAddress,
      variables: { input },
      authMode: "userPool",
    });

    return result;
  } catch (error) {
    console.error("Error Creating User Address:", error);
    return error;
  }
};

export const updateUserAddressAPI = async (input) => {
  try {
    const result = await client.graphql({
      query: updateUserAddress,
      variables: { input },
      authMode: "userPool",
    });

    return result;
  } catch (error) {
    console.error("Error Updating User Address:", error);
    return error;
  }
};

export const applyCouponAPI = async (couponCode) => {
  try {
    const response = await client.graphql({
      query: applyCoupon,
      authMode: "apiKey",
      variables: {
        storeId: STORE_ID,
        code: couponCode,
        deviceType: "WEB",
        variantFilter: { status: { ne: "DISABLED" } },
        imageLimit: 1,
      },
    });

    return response;
  } catch (error) {
    console.error("Error applying coupon:", error);
    return null;
  }
};

export const fetchProductDetailsAPI = async (id) => {
  try {
    const response = await client.graphql({
      query: getProductById,
      variables: {
        id: id,
      },
      authMode: "apiKey",
    });

    const data = "data" in response ? response.data : response;
    return data?.getProduct;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

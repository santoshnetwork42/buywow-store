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
  searchCMSCollectionProducts,
  searchCMSProducts,
  updateUserAddress,
  verifyCustomOTP,
} from "@/graphql/appSync/api";
import { errorHandler } from "@/utils/errorHandler";
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
    errorHandler(err, "Search CMS Products API");
    return null;
  }
};

export const searchCMSCollectionProductsAPI = async ({
  collectionSlug,
  tabSelected,
  defaultSorting,
  page = 1,
  limit = 20,
}) => {
  try {
    const response = await client.graphql({
      query: searchCMSCollectionProducts,
      authMode: "apiKey",
      variables: {
        storeId: STORE_ID,
        collectionSlug,
        tabSelected,
        defaultSorting,
        page,
        limit,
      },
    });

    // console.log(response);

    return JSON.parse(response?.data?.searchCMSCollectionProducts || {});
  } catch (err) {
    errorHandler(err, "Search CMS Collection Products API");
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
    errorHandler(err, "Get Page By Slug API");
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
    errorHandler(err, "Get Navbar And Footer API");
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
    errorHandler(err, "Get User API");
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
    errorHandler(err, "Get Loyalty API");
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
    errorHandler(error, "Check If Existing User API");
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
    errorHandler(error, "Verify Custom OTP API");
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
    errorHandler(error, "Get Order By Id API");
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
    errorHandler(error, "Get User Address API");
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
    errorHandler(error, "Remove User Address API");
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
    errorHandler(error, "Create User Address API");
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
    errorHandler(error, "Update User Address API");
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
    errorHandler(error, "Apply Coupon API");
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
    errorHandler(error, "Fetch Product Details API");
    return null;
  }
};

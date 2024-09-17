import awsExport from "@/aws-exports";
import { AWS_CLIENT_ID, STORE_ID } from "@/config";
import {
  applyCoupon,
  createRedirects,
  createReview,
  createUserAddress,
  deleteUserAddress,
  ensureUserAndDispatchOTP,
  findUserAddresses,
  getCartUpsellProducts,
  getCMSPages,
  getCouponRule,
  getInitialData,
  getLoyalty,
  getNavbarAndFooter,
  getOrder,
  getPageBySlug,
  getPageMetadataBySlug,
  getProductById,
  getRedirects,
  getReviews,
  getReviewsAnalytics,
  getStore,
  getUser,
  getUserRewards,
  searchCMSCollectionProducts,
  searchOrders,
  updateRedirects,
  updateReview,
  updateUser,
  updateUserAddress,
  validateTransaction,
  verifyCustomOTP,
} from "@/graphql/api";
import { errorHandler } from "@/utils/errorHandler";
import fetchData from "@/utils/fetchData";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";

Amplify.configure({
  ...awsExport,
  ssr: true,
  aws_user_pools_web_client_id: AWS_CLIENT_ID,
});

const client = generateClient();

export const getStoreAPI = async () => {
  const data = await fetchData(getStore, {
    id: STORE_ID,
    deviceType: "WEB",
  });

  return data?.getStore || {};
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

    return JSON.parse(response?.data?.searchCMSCollectionProducts || {});
  } catch (err) {
    errorHandler(err, "Search CMS Collection Products API");
    return null;
  }
};

export const getPageBySlugAPI = async (slugId) => {
  const data = await fetchData(getPageBySlug, {
    storeId: STORE_ID,
    pageType: "",
    slug: slugId,
    collectionDataLimit: 100,
  });

  return JSON.parse(data?.getPageBySlug || "{}");
};

export const getPageMetadataBySlugAPI = async (slugId) => {
  try {
    const response = await fetchData(
      getPageMetadataBySlug,
      {
        storeId: STORE_ID,
        slug: slugId,
      },
      {
        next: { revalidate: 86400 },
      },
    );

    return JSON.parse(response?.getPageMetadataBySlug || "{}");
  } catch (err) {
    errorHandler(err, "Get Page By Slug API");
    return null;
  }
};

export const getNavbarAndFooterAPI = async () => {
  const data = await fetchData(
    getNavbarAndFooter,
    { storeId: STORE_ID },
    {
      next: { revalidate: 86400, tags: ["header"] },
    },
  );
  return JSON.parse(data?.getNavbarAndFooter || "{}");
};

export const getUserAPI = async () => {
  try {
    const response = await client.graphql({
      query: getUser,
      authMode: "userPool",
    });

    return response?.data?.getUser || null;
  } catch (err) {
    errorHandler(err, "Get User API", true);
    return null;
  }
};

export const getLoyaltyAPI = async ({ userId }) => {
  try {
    const response = await client.graphql({
      query: getLoyalty,
      variables: { input: { storeId: STORE_ID, userId: userId } },
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

export const getOrderByIdAPI = async ({ id, userId }) => {
  try {
    const response = await client.graphql({
      query: getOrder,
      variables: { id },
      authMode: userId ? "userPool" : "apiKey",
    });

    return response?.data?.getOrder || null;
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

export const getCartUpsellProductsAPI = async () => {
  const data = await fetchData(
    getCartUpsellProducts,
    { storeId: STORE_ID },
    {
      next: { revalidate: 3600, tags: ["cartUpsell"] },
    },
  );
  return JSON.parse(data?.getCartUpsellProducts || "{}");
};

export const getCMSPagesAPI = async (pageType) => {
  const data = await fetchData(getCMSPages, {
    storeId: STORE_ID,
    type: pageType,
  });

  return JSON.parse(data?.getCMSPages || "[]");
};

export const getCMSPagesForSitemapAPI = async (pageType) => {
  const data = await fetchData(
    getCMSPages,
    {
      storeId: STORE_ID,
      type: pageType,
    },
    {
      next: { revalidate: 86400 },
    },
  );

  return JSON.parse(data?.getCMSPages || "[]");
};

export const getPagesToPrebuildAPI = async () => {
  const data = await fetchData(getCMSPages, {
    storeId: STORE_ID,
  });

  return JSON.parse(data?.getCMSPages || "[]");
};

export const getUserRewardsAPI = async () => {
  try {
    const response = await client.graphql({
      query: getUserRewards,
      variables: { storeId: STORE_ID },
      authMode: "userPool",
    });
    const data = "data" in response ? response.data : response;
    return data?.getUser;
  } catch (error) {
    errorHandler(error, "Get User Rewards API");
    return null;
  }
};

export const fetchCouponRuleAPI = async (code, id) => {
  try {
    const response = await client.graphql({
      query: getCouponRule,
      variables: { code, storeId: STORE_ID },
      authMode: id ? "userPool" : "apiKey",
    });
    const data = "data" in response ? response.data : response;
    return data?.getCouponRule;
  } catch (error) {
    errorHandler(error, "Fetch Coupon Rule API");
    return null;
  }
};

export const getReviewsAnalyticsAPI = async (productId, userId) => {
  try {
    const response = await client.graphql({
      query: getReviewsAnalytics,
      variables: {
        filter: {
          productId: { eq: productId },
          verified: { eq: true },
          userId: { ne: userId },
        },
        aggregates: [
          {
            name: "perStartGrouping",
            type: "terms",
            field: "rating",
          },
        ],
      },
      authMode: "apiKey",
    });

    const {
      data: {
        searchReviews: {
          aggregateItems: [item],
        },
      },
    } = response;

    return item;
  } catch (error) {
    errorHandler(error, "Get Reviews Analytics API");
    return null;
  }
};

export const getProductReviewsAPI = async (
  productId,
  userId,
  nextToken = null,
  limit = 10,
) => {
  try {
    const filter = { productId: { eq: productId }, verified: { eq: true } };
    if (userId) {
      filter.userId = { ne: userId };
    }

    const response = await client.graphql({
      query: getReviews,
      variables: {
        filter,
        sort: [{ field: "createdAt", direction: "desc" }],
        nextToken,
        limit,
      },
      authMode: "apiKey",
    });

    const {
      data: {
        searchReviews: { items, total, nextToken: newNextToken },
      },
    } = response;

    return { items, total, nextToken: newNextToken };
  } catch (error) {
    errorHandler(error, "Get Product Reviews API");
    return null;
  }
};

export const getUserReviewAPI = async (productId, userId) => {
  try {
    const response = await client.graphql({
      query: getReviews,
      variables: {
        filter: {
          productId: { eq: productId },
          userId: { eq: userId },
        },
        limit: 1,
      },
      authMode: "apiKey",
    });

    return response.data.searchReviews.items[0];
  } catch (error) {
    errorHandler(error, "Get User Review API");
    return null;
  }
};

export const submitReviewAPI = async (reviewData, userId, productId) => {
  try {
    const { reviewId, rating, comment, name, email, images } = reviewData;

    if (reviewId) {
      const response = await client.graphql({
        query: updateReview,
        authMode: "userPool",
        variables: {
          input: {
            id: reviewId,
            rating,
            comment,
            reviewer: { name, email },
            userId,
            productId,
            storeId: STORE_ID,
            images: images.slice(0, 10),
          },
        },
      });

      return {
        ...response.data.updateReview,
        rating,
        comment,
        reviewer: { name, email },
        images,
      };
    } else {
      const response = await client.graphql({
        query: createReview,
        authMode: "userPool",
        variables: {
          input: {
            rating,
            comment,
            reviewer: { name, email },
            userId,
            productId,
            storeId: STORE_ID,
            images,
          },
        },
      });

      return response.data.createReview;
    }
  } catch (error) {
    errorHandler(error, "Submit Review API");
  }
};

export const updateUserAPI = async (user) => {
  try {
    const response = await client.graphql({
      query: updateUser,
      variables: {
        input: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
      authMode: "userPool",
    });

    return response;
  } catch (error) {
    errorHandler("Error Updating User", error);
    return error;
  }
};

export const validateTransactionAPI = async (orderId, paymentId) => {
  try {
    const response = await client.graphql({
      query: validateTransaction,
      variables: { orderId, razorpayPaymentId: paymentId },
      authMode: "apiKey",
    });

    return response?.data?.validateTransaction || null;
  } catch (error) {
    errorHandler(error, "Validate Transaction API");
    return null;
  }
};

// export const getInitialDataAPI = async (storeId, deviceType) => {
//   return await fetchData(
//     getInitialData,
//     {
//       storeId,
//       deviceType,
//       getStoreSettingInput: {
//         storeId: storeId,
//         deviceType: deviceType,
//       },
//       shippingTierFilter: {
//         storeId: { eq: storeId },
//       },
//     },
//     1,
//     "Get Initial Data API",
//   );
// };

export const getInitialDataAPI = async (deviceType) => {
  try {
    const data = await fetchData(getInitialData, {
      storeId: STORE_ID,
      deviceType,
      getStoreSettingInput: {
        storeId: STORE_ID,
        deviceType,
      },
      shippingTierFilter: {
        storeId: { eq: STORE_ID },
      },
      ltoProductFilter: {
        storeId: { eq: STORE_ID },
        recommended: { eq: true },
      },
      ltoProductSort: [{ field: "recommendPriority", direction: "asc" }],
    });
    return data;
  } catch (error) {
    errorHandler("Error Fetching Initial Data", error);
    return error;
  }
};

export const getOrdersAPI = async (userId, token = null, perPage = 10) => {
  try {
    const response = await client.graphql({
      query: searchOrders,
      variables: {
        filter: {
          userId: { eq: userId },
          storeId: { eq: STORE_ID },
          and: [{ status: { ne: "TIMEDOUT" } }, { status: { ne: "PENDING" } }],
        },
        sort: [{ field: "orderDate", direction: "desc" }],
        limit: perPage,
        nextToken: token,
      },
      authMode: "userPool",
    });

    return response?.data?.searchOrders;
  } catch (error) {
    errorHandler(error, "Get Orders API");
    return null;
  }
};

export const getRedirectsAPI = async (path) => {
  try {
    const data = await fetchData(getRedirects, {
      slug: path,
      storeId: STORE_ID,
    });
    return data?.getRedirects || null;
  } catch (err) {
    errorHandler(err, "Get Redirects API");
    return null;
  }
};

export const updateRedirectsAPI = async (path, hitCount) => {
  try {
    const data = await fetchData(updateRedirects, {
      input: {
        storeId: STORE_ID,
        slug: path,
        hitCount: hitCount,
      },
    });
    return data?.updateRedirects || null;
  } catch (err) {
    errorHandler(err, "Update Redirects API");
    return null;
  }
};

export const createRedirectsAPI = async (path) => {
  try {
    const data = await fetchData(createRedirects, {
      input: {
        storeId: STORE_ID,
        slug: path,
        hitCount: 1,
      },
    });
    return data?.createRedirects || null;
  } catch (err) {
    errorHandler(err, "Create Redirects API");
    return null;
  }
};

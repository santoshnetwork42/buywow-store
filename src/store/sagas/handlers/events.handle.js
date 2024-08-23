import { errorHandler } from "@/utils/errorHandler";
import {
  getClientSource,
  initializeMoengageAndAddInfo,
  moEngagedOrderMapper,
  orderMapper,
  trackClickStream,
  trackEvent,
  userMapper,
} from "@/utils/events";
import {
  analyticsMetaDataMapper,
  getRecordKey,
  getSource,
} from "@/utils/helpers";
import { select } from "redux-saga/effects";
import { v4 as uuid } from "uuid";

const eventSource = getSource();

export function* outOfStockEventHandler({ payload }) {
  try {
    const { products, inventory } = payload || {};

    if (!Array.isArray(products) || !inventory) {
      console.warn("Invalid payload structure in outOfStockHandler");
      return;
    }

    for (const product of products) {
      if (product && typeof product === "object") {
        try {
          const recordKey = getRecordKey(product, product.variantId);
          const payload = {
            productId: product.id,
            variantId: product.variantId,
            cartQty: product.qty,
            inventoryQty: inventory[recordKey],
          };

          if (typeof window !== "undefined" && window.dataLayer) {
            window.dataLayer.push({
              event: "out_of_stock",
              eventID: uuid(),
              ...payload,
            });
          }
        } catch (productError) {
          console.error("Error processing individual product:", productError);
        }
      }
    }
  } catch (error) {
    console.error("Error in outOfStockHandler:", error);
  }
}

export function* proceedToCheckoutEventHandler({ payload }) {
  try {
    const eventSource = getClientSource();
    const { source } = payload || {};
    const userData = yield select((state) => state.user.data);
    const user = userMapper(userData) || {};
    if (window && window.dataLayer) {
      window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
      window.dataLayer.push({
        event: "proceed_to_checkout",
        eventID: uuid(),
        login: userData ? 1 : 0,
      });
    }
    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "proceed_to_checkout",
      eventID: uuid(),
      userId: user?.id || "",
      user: user || {},
      source: eventSource,
      ...analyticsMeta,
    });
  } catch (error) {
    errorHandler(error);
  }
}

export function* searchEventHandler({ payload }) {
  try {
    const eventSource = getClientSource();
    const { term } = payload || {};
    const { user: userToMap } = yield select((state) => state.user);
    const user = userMapper(userToMap);
    if (window && window.dataLayer) {
      window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
      window.dataLayer.push({
        event: "search",
        eventID: uuid(),
        attribute: { search_term: term },
      });
    }
    const analyticsMeta = analyticsMetaDataMapper();
    trackClickStream({
      event: "search",
      eventID: uuid(),
      userId: user?.id || "",
      user: user || {},
      search_term: term,
      source: eventSource,
      ...analyticsMeta,
    });
  } catch (error) {
    console.error("Error in searchHandler:", error);
  }
}

export function* authEventHandler({ payload = {} }) {
  try {
    const eventSource = getClientSource();
    const { action } = payload;
    const { userId } = payload;
    const utmData = yield select((state) => state.system.meta);
    const { utmMedium: medium, utmSource: source } = utmData;
    const analyticsMeta = analyticsMetaDataMapper();

    if (action === "signup") {
      const { phone } = e.payload;
      const mobile = phone?.split("+91")[1];
      initializeMoengageAndAddInfo({
        phone,
      });

      trackEvent("Customer Registered", {
        "Customer ID": userId,
        "Mobile Number": mobile,
        "Utm Source": source,
        "Utm Medium": medium,
        URL: window.location.href,
        Source: eventSource,
      });

      trackClickStream({
        event: "customer_registered",
        eventID: uuid(),
        userId: userId,
        mobile_number: mobile,
        source: eventSource,
        ...analyticsMeta,
      });
    } else if (action === "login") {
      if (userId) {
        const {
          data: { getUser: getUserResponse },
        } = yield call([client, client.graphql], {
          query: getUser,
          authMode: "userPool",
        });

        if (getUserResponse) {
          const {
            firstName = null,
            lastName = null,
            email = null,
            phone = null,
          } = getUserResponse;
          initializeMoengageAndAddInfo({
            firstName,
            lastName,
            email,
            phone,
          });
          const mobile = phone?.split("+91")[1];

          trackEvent("Customer Logged In", {
            "Customer ID": userId,
            "Mobile Number": mobile,
            "Utm Source": source,
            "Utm Medium": medium,
            URL: window.location.href,
            "First Time User": false,
            Source: eventSource,
          });

          trackClickStream({
            event: "customer_logged_in",
            eventID: uuid(),
            userId: userId,
            mobile_number: mobile,
            first_time_user: false,
            source: eventSource,
            ...analyticsMeta,
          });
        }
      }
    } else if (action == "logout") {
      const Moengage = window?.Moengage;
      if (Moengage) Moengage.destroy_session();
    }
    if (window && window.dataLayer) {
      window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
      window.dataLayer.push({ event: action, eventID: uuid() });
    }
  } catch (error) {
    console.error("Error in authHandler:", error);
  }
}

export function* viewCartEventHandler() {
  try {
    const { data, coupon } = yield select((state) => ({
      data: state.cart.data,
      coupon: state.cart.coupon,
    }));

    const userData = yield select((state) => state.user.user);
    const user = userMapper(userData);
    const { ga, value, pixel } = orderMapper(data, coupon, user);
    const { cartViewed } = moEngagedOrderMapper(data, coupon);

    trackEvent("Cart Viewed", cartViewed);

    if (window && window.dataLayer) {
      window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
      window.dataLayer.push({
        event: "view_cart",
        eventID: uuid(),
        attribute: pixel,
        ecommerce: {
          value,
          currency: "INR",
          coupon: coupon?.code || "",
          items: ga,
        },
      });
    }

    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "view_cart",
      eventID: uuid(),
      userId: user?.id || "",
      user: user || {},
      items: ga,
      value,
      currency: "INR",
      coupon: coupon?.code || "",
      source: eventSource,
      ...analyticsMeta,
    });

    // Analytics.record({
    //   name: "view_cart",
    //   attributes: {
    //     currency: "INR",
    //     coupon: coupon?.code || "",
    //   },
    //   metrics: { value },
    // });

    // vercelAnalytics.track("view_cart", {
    //   currency: "INR",
    //   coupon: coupon?.code || "",
    // });

    // pinpoint.forEach((attr) => {
    //   Analytics.record({
    //     name: "view_cart_item",
    //     attributes: {
    //       ...attr,
    //       value: value.toString(),
    //       currency: "INR",
    //       coupon: coupon?.code || "",
    //     },
    //   });
    // });

    // vercel.forEach((attr) => {
    //   vercelAnalytics.track("view_cart_item", {
    //     ...attr,
    //     value,
    //     currency: "INR",
    //     coupon: coupon?.code || "",
    //   });
    // });
  } catch (e) {
    errorHandler(e);
  }
}

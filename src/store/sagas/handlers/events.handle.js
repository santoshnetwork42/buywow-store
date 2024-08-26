import { getUser } from "@/graphql/appSync/api";
import { errorHandler } from "@/utils/errorHandler";
import {
  addressMapper,
  getClientSource,
  initializeMoengageAndAddInfo,
  itemMapper,
  moEngagedOrderMapper,
  moEngageItemPurchasedMapper,
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
import { generateClient } from "aws-amplify/api";
import { call, select } from "redux-saga/effects";
import { v4 as uuid, v4 as uuidv4 } from "uuid";

const eventSource = getSource();
const client = generateClient();

export function* outOfStockEventHandler({ payload }) {
  try {
    const { products, inventory } = payload || {};

    console.log(products, inventory, "OUT OF STOCK_____");
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
              eventID: uuidv4(),
              ...payload,
            });
          }
        } catch (e) {
          console.error("Error processing individual product:", e);
        }
      }
    }
  } catch (e) {
    console.error("Error in outOfStockHandler:", e);
  }
}

export function* proceedToCheckoutEventHandler({ payload }) {
  try {
    const eventSource = getClientSource();
    const { source } = payload || {};

    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const currentAddress = yield select(
      (state) => state.address.currentAddress || state.address.addressList?.[0],
    );

    const user = userMapper(userData, currentAddress) || {};
    if (window && window.dataLayer) {
      window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
      window.dataLayer.push({
        event: "proceed_to_checkout",
        eventID: uuidv4(),
        login: userData ? 1 : 0,
      });
    }

    console.log(userData, user, "PROCEED TO CHECKOUT");
    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "proceed_to_checkout",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      source: eventSource,
      ...analyticsMeta,
    });
  } catch (e) {
    errorHandler(e);
  }
}

export function* searchEventHandler({ payload }) {
  try {
    const eventSource = getClientSource();
    const { term } = payload || {};
    const { user: userToMap } = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const currentAddress = yield select(
      (state) => state.address.currentAddress || state.address.addressList?.[0],
    );

    const user = userMapper(userToMap, currentAddress);
    if (window && window.dataLayer) {
      window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
      window.dataLayer.push({
        event: "search",
        eventID: uuidv4(),
        attribute: { search_term: term },
      });
    }
    const analyticsMeta = analyticsMetaDataMapper();
    trackClickStream({
      event: "search",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      search_term: term,
      source: eventSource,
      ...analyticsMeta,
    });

    console.log(term, "userSEArched", user);
  } catch (e) {
    console.error("Error in searchHandler:", e);
  }
}

export function* authEventHandler({ payload }) {
  try {
    console.log("payload auth+++", payload);
    const eventSource = getClientSource();
    const { action } = payload;
    const { userId } = payload;
    // const utmData = yield select((state) => state.system.meta);
    // const { utmMedium: medium, utmSource: source } = utmData;
    const analyticsMeta = analyticsMetaDataMapper();

    if (action === "signup") {
      const { phone } = payload;
      const mobile = phone?.split("+91")[1];
      initializeMoengageAndAddInfo({
        phone,
      });

      trackEvent("Customer Registered", {
        "Customer ID": userId,
        "Mobile Number": mobile,
        // "Utm Source": source,
        // "Utm Medium": medium,
        URL: window.location.href,
        Source: eventSource,
      });

      trackClickStream({
        event: "customer_registered",
        eventID: uuidv4(),
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
            // "Utm Source": source,
            // "Utm Medium": medium,
            URL: window.location.href,
            "First Time User": false,
            Source: eventSource,
          });

          trackClickStream({
            event: "customer_logged_in",
            eventID: uuidv4(),
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
      window.dataLayer.push({ event: action, eventID: uuidv4() });
    }
  } catch (e) {
    console.error("Error in authHandler:", e);
  }
}

export function* viewCartEventHandler() {
  try {
    const { data, coupon } = yield select((state) => state.cart);

    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const currentAddress = yield select(
      (state) => state.address.currentAddress || state.address.addressList?.[0],
    );
    const user = userMapper(userData, currentAddress);
    const { ga, value, pixel } = orderMapper(data, coupon, user);
    const { cartViewed } = moEngagedOrderMapper(data, coupon);

    const eventSource = getClientSource();

    console.log("cartViewed", cartViewed);
    trackEvent("Cart Viewed", cartViewed);

    if (window && window.dataLayer) {
      window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
      window.dataLayer.push({
        event: "view_cart",
        eventID: uuidv4(),
        attribute: pixel,
        ecommerce: {
          value,
          currency: "INR",
          coupon: coupon?.code || "",
          items: ga,
        },
      });
    }

    console.log("Viewed  cart", ga, value, pixel);

    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "view_cart",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      items: ga,
      value,
      currency: "INR",
      coupon: coupon?.code || "",
      source: eventSource,
      ...analyticsMeta,
    });
    console.log("CLKICK", {
      event: "view_cart",
      eventID: uuidv4(),
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

export function* viewItemEventHandler({ payload }) {
  try {
    const { product } = payload;
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const currentAddress = yield select(
      (state) => state.address.currentAddress || state.address.addressList?.[0],
    );
    const user = userMapper(userData, currentAddress) || {};
    const { value, pixel, vercel, ga, moengage } = itemMapper(
      product,
      null,
      user,
    );
    console.log("Product Viewed", moengage.productViewed);
    trackEvent("Product Viewed", moengage.productViewed);
    const eventSource = getClientSource();

    if (window && window.dataLayer) {
      window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
      window.dataLayer.push({
        event: "view_item",
        eventID: uuidv4(),
        attribute: pixel,
        ecommerce: {
          currency: "INR",
          value,
          items: ga,
        },
      });
    }

    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "view_item",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      items: ga,
      currency: "INR",
      value,
      source: eventSource,
      ...analyticsMeta,
    });

    // Analytics.record({ name: "view_item", pinpoint, metrics: { value } });
    // vercelAnalytics.track("view_item", vercel);
  } catch (e) {
    errorHandler(e);
  }
}

export function* viewListItemEventHandler({ payload }) {
  try {
    const { id, name, products } = payload;
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const currentAddress = yield select(
      (state) => state.address.currentAddress || state.address.addressList?.[0],
    );
    const user = userMapper(userData, currentAddress);
    const { ga, pixel } = orderMapper(products, null, user);

    const eventSource = getClientSource();
    if (window && window.dataLayer) {
      window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
      window.dataLayer.push({
        event: "view_item_list",
        eventID: uuidv4(),
        attribute: pixel,
        ecommerce: {
          item_list_id: id,
          item_list_name: name,
          items: ga,
        },
      });
    }
    console.log(
      {
        event: "view_item_list",
        eventID: uuidv4(),
        attribute: pixel,
        ecommerce: {
          item_list_id: id,
          item_list_name: name,
          items: ga,
        },
      },
      "viewList",
    );

    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "view_item_list",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      items: ga,
      item_list_id: id,
      item_list_name: name,
      source: eventSource,
      ...analyticsMeta,
    });

    // Analytics.record({
    //   name: "view_item_list",
    //   attributes: {
    //     item_list_id: id,
    //     item_list_name: name,
    //   },
    // });

    // vercelAnalytics.track("view_item_list", {
    //   item_list_id: id,
    //   item_list_name: name,
    // });

    // pinpoint.forEach((attr) => {
    //   Analytics.record({
    //     name: "view_item_list_item",
    //     attributes: {
    //       ...attr,
    //       item_list_id: id,
    //       item_list_name: name,
    //     },
    //   });
    // });

    // vercel.forEach((attr) => {
    //   vercelAnalytics.track("view_item_list_item", {
    //     ...attr,
    //     item_list_id: id,
    //     item_list_name: name,
    //   });
    // });
  } catch (e) {
    errorHandler(e);
  }
}

export function* placeOrderEventHandler({ payload }) {
  try {
    const {
      order,
      products,
      coupon,
      address,
      paymentType,
      checkoutSource = "BUYWOW",
    } = payload;

    const {
      id,
      totalShippingCharges,
      totalAmount,
      totalDiscount,
      code,
      orderDate = "",
    } = order;

    const productsLocal = yield select((state) => state.cart.data);

    const productsData =
      checkoutSource === "BUYWOW"
        ? [...products, ...productsLocal]
        : [...products];

    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );

    const user = userMapper(userData, address);
    const isFirstTimeUser = user?.totalOrders > 0 ? false : true;
    const { ga, pixel, vercel } = orderMapper(
      productsData,
      coupon,
      user,
      checkoutSource,
    );
    const { orderCreated } = moEngagedOrderMapper(
      productsData,
      coupon,
      paymentType,
      order,
      isFirstTimeUser,
      checkoutSource,
    );

    const itemPurchasedEvents = moEngageItemPurchasedMapper(
      productsData,
      coupon,
      paymentType,
      order,
      isFirstTimeUser,
      checkoutSource,
    );

    const {
      first_name,
      last_name,
      firstName,
      lastName,
      name = "",
      email,
      phone,
      city,
      pinCode,
    } = address;

    initializeMoengageAndAddInfo({
      firstName: first_name || firstName || name.split(" ")?.[0],
      lastName: last_name || lastName || name.split(" ")?.[1],
      email,
      phone,
    });

    console.log("Order Created", orderCreated);
    trackEvent("Order Created", orderCreated);
    itemPurchasedEvents.forEach((itemPurchased) => {
      console.log("Item Purchased", itemPurchased);
      trackEvent("Item Purchased", itemPurchased);
    });

    if (window && window.dataLayer) {
      window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
      window.dataLayer.push({
        event: "purchase",
        eventID: uuidv4(),
        user,
        attribute: {
          ...pixel,
          order_id: id,
          value: totalAmount,
          fn: firstName,
          ln: lastName,
          em: email,
          ph: phone,
          city,
          postal_code: pinCode,
        },
        ecommerce: {
          transaction_id: id,
          order_code: code,
          value: totalAmount,
          tax: 0,
          discount: totalDiscount,
          shipping: totalShippingCharges,
          currency: "INR",
          coupon: coupon?.code || "",
          items: ga,
        },
      });
    }

    // track("purchase_final_v1", {
    //   transaction_id: id,
    //   value: totalAmount,
    //   tax: 0,
    //   code: code,
    //   discount: totalDiscount,
    //   shipping: totalShippingCharges,
    //   currency: "INR",
    //   coupon: coupon?.code || "",
    //   source: checkoutSource,
    //   orderDate,
    // });

    const eventSource = getClientSource();
    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "purchase",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      transaction_id: id,
      order_code: code,
      value: totalAmount,
      tax: 0,
      discount: totalDiscount,
      shipping: totalShippingCharges,
      currency: "INR",
      coupon: coupon?.code || "",
      items: ga,
      source: checkoutSource === "GOKWIK" ? "GoKwik" : eventSource,
      ...analyticsMeta,
    });

    // posthog.capture("Order Created", {
    //   source: checkoutSource,
    //   paymentType,
    // });

    // Analytics.record({
    //   name: "purchase",
    //   attributes: {
    //     transaction_id: id,
    //     value: totalAmount.toString(),
    //     tax: "0",
    //     discount: totalDiscount.toString(),
    //     shipping: totalShippingCharges.toString(),
    //     currency: "INR",
    //     coupon: coupon?.code || "",
    //   },
    //   metrics: { value: totalAmount },
    // });

    // pinpoint.forEach((attr) => {
    //   Analytics.record({
    //     name: "purchase_item",
    //     attributes: {
    //       ...attr,
    //       transaction_id: id,
    //       value: totalAmount.toString(),
    //       tax: "0",
    //       shipping: totalShippingCharges.toString(),
    //       currency: "INR",
    //       coupon: coupon?.code || "",
    //     },
    //   });
    // });

    // vercel.forEach((attr) => {
    //   vercelAnalytics.track("purchase_item", {
    //     ...attr,
    //     transaction_id: id,
    //     value: totalAmount,
    //     tax: 0,
    //     shipping: totalShippingCharges,
    //     currency: "INR",
    //     coupon: coupon?.code || "",
    //   });
    // });
  } catch (e) {
    errorHandler(e);
  }
}

export function* checkoutStartedEventHandler({ payload }) {
  try {
    const { source = "BUYWOW" } = payload;
    const { data, coupon } = yield select((state) => state.cart);
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const currentAddress = yield select(
      (state) => state.address.currentAddress || state.address.addressList?.[0],
    );

    const user = userMapper(userData, currentAddress);

    console.log("+++++checkoutStartedEventHandler", data, coupon, user, source);
    const { pinpoint, ga, value, pixel, vercel } = orderMapper(
      data,
      coupon,
      user,
      source,
    );

    const { checkoutStarted } = moEngagedOrderMapper(
      data,
      coupon,
      null,
      null,
      null,
      source,
    );

    console.log("Checkout Started", checkoutStarted);
    trackEvent("Checkout Started", checkoutStarted);
    if (window && window.dataLayer) {
      window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
      window.dataLayer.push({
        event: "begin_checkout",
        eventID: uuidv4(),
        attribute: pixel,
        ecommerce: {
          value,
          currency: "INR",
          coupon: coupon?.code || "",
          items: ga,
        },
      });
    }

    const eventSource = getClientSource();
    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "begin_checkout",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      items: ga,
      value,
      currency: "INR",
      coupon: coupon?.code || "",
      source: source === "GOKWIK" ? "GoKwik" : eventSource,
      ...analyticsMeta,
    });
    console.log("Checkout Started CLICK STREAM", {
      event: "begin_checkout",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      items: ga,
      value,
      currency: "INR",
      coupon: coupon?.code || "",
      source: source === "GOKWIK" ? "GoKwik" : eventSource,
      ...analyticsMeta,
    });

    // Analytics.record({
    //   name: "begin_checkout",
    //   attributes: {
    //     currency: "INR",
    //     coupon: coupon?.code || "",
    //   },
    //   metrics: { value },
    // });

    // vercelAnalytics.track("begin_checkout", {
    //   currency: "INR",
    //   coupon: coupon?.code || "",
    // });

    // pinpoint.forEach((attr) => {
    //   Analytics.record({
    //     name: "begin_chekout_item",
    //     attributes: {
    //       ...attr,
    //       value: value.toString(),
    //       currency: "INR",
    //       coupon: coupon?.code || "",
    //     },
    //   });
    // });

    // vercel.forEach((attr) => {
    //   vercelAnalytics.track("begin_chekout_item", {
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

export function* addressAddedEventHandler({ payload }) {
  try {
    const eventSource = getClientSource();
    const { address, totalPrice, checkoutSource = "BUYWOW" } = payload;
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const user = userMapper(userData);
    const { name, email, phone } = address;
    initializeMoengageAndAddInfo({
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      email,
      phone,
    });
    const { addressAdded } = addressMapper(address, totalPrice, checkoutSource);

    console.log("addressAdded", addressAdded);
    trackEvent("Address Added", addressAdded);
    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "address_added",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      items: [addressAdded],
      source: checkoutSource === "GOKWIK" ? "Gokwik" : eventSource,
      ...analyticsMeta,
    });
  } catch (e) {
    errorHandler(e);
  }
}

export function* addressSelectedEventHandler({ payload }) {
  try {
    const { address, totalPrice, checkoutSource = "BUYWOW" } = payload;
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const user = userMapper(userData, address);
    if (address) {
      const { addressSelected } = addressMapper(
        address,
        totalPrice,
        checkoutSource,
      );

      const { name, email, phone } = address;
      initializeMoengageAndAddInfo({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
        email,
        phone,
      });

      const eventSource = getClientSource();
      trackEvent("Address Selected", addressSelected);
      const analyticsMeta = analyticsMetaDataMapper();

      console.log("ADDRESS_SELECTED", addressSelected);
      trackClickStream({
        event: "address_selected",
        eventID: uuidv4(),
        userId: user?.id || "",
        user: user || {},
        items: [addressSelected],
        source: checkoutSource === "GOKWIK" ? "Gokwik" : eventSource,
        ...analyticsMeta,
      });
    }
  } catch (e) {
    errorHandler(e);
  }
}

export function* categoryViewedEventHandler({ payload }) {
  try {
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const user = userMapper(userData);
    trackEvent("Category Viewed", {
      ...payload,
    });

    const eventSource = getClientSource();
    const analyticsMeta = analyticsMetaDataMapper();
    console.log(
      {
        ...payload,
      },
      "category_viewed",
    );

    trackClickStream({
      event: "category_viewed",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      category_name: payload["Category Name"],
      item_count: payload["Item Count"],
      source: eventSource,
      ...analyticsMeta,
    });
  } catch (e) {
    errorHandler(e);
  }
}

export function* homeViewedEventHandler(e) {
  try {
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const eventSource = getClientSource();
    const user = userMapper(userData);
    trackEvent("Home Viewed", {
      URL: window.location.href,
      Source: eventSource,
    });

    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "home_viewed",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      URL: window.location.href,
      source: eventSource,
      ...analyticsMeta,
    });

    console.log("Home Viewed", {
      URL: window.location.href,
      Source: eventSource,
    });
  } catch (e) {
    errorHandler(e);
  }
}

export function* addPaymentInfoEventHandler({ payload }) {
  try {
    const { checkoutSource = "BUYWOW" } = payload;
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const currentAddress = yield select(
      (state) => state.address.currentAddress || state.address.addressList?.[0],
    );
    const user = userMapper(userData, currentAddress);
    const eventSource = getClientSource();
    trackEvent("Add Payment Info", {
      URL: window.location.href,
      Source: checkoutSource === "GOKWIK" ? "Gokwik" : eventSource,
    });

    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "add_payment_info",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      source: checkoutSource === "GOKWIK" ? "Gokwik" : eventSource,
      ...analyticsMeta,
    });
    console.log(
      {
        event: "add_payment_info",
        eventID: uuidv4(),
        userId: user?.id || "",
        user: user || {},
        source: checkoutSource === "GOKWIK" ? "Gokwik" : eventSource,
        ...analyticsMeta,
      },
      "ADD PAYMENT INFO",
    );
  } catch (e) {
    errorHandler(e);
  }
}

export function* bannerClickedEventHandler({ payload }) {
  try {
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const user = userMapper(userData);
    trackEvent("Banner Clicked", {
      ...payload,
    });

    const eventSource = getClientSource();
    const analyticsMeta = analyticsMetaDataMapper();
    console.log("BANNER clicked", payload);
    trackClickStream({
      event: "banner_clicked",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      item_id: payload.item_id,
      banner_name: payload.banner_name,
      source: eventSource,
      ...analyticsMeta,
    });
  } catch (e) {
    errorHandler(e);
  }
}

export function* otpRequestedEventHandler({ payload }) {
  try {
    trackEvent("OTP requested", {
      ...payload,
    });

    console.log("OTP requested", payload);
    const eventSource = getClientSource();
    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "otp_requested",
      eventID: uuidv4(),
      userId: "",
      user: {},
      ...payload,
      source: eventSource,
      ...analyticsMeta,
    });
  } catch (e) {
    errorHandler(e);
  }
}

export function* addToCartEventHandler({ payload }) {
  try {
    const { product } = payload;
    const { qty } = product;
    const userData = yield select((state) => state.user.user);
    const user = userMapper(userData);
    const { value, pixel, vercel, ga, moengage } = itemMapper(
      product,
      null,
      user,
    );

    const eventName = qty > 0 ? "add_to_cart" : "remove_from_cart";

    trackEvent("Add To Cart", moengage.addToCart);
    console.log("add to cart", value, pixel, vercel, ga, moengage);
    if (window && window.dataLayer) {
      window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
      window.dataLayer.push({
        event: eventName,
        eventID: uuid(),
        attribute: pixel,
        user,
        ecommerce: {
          currency: "INR",
          value,
          items: ga,
        },
      });
    }
    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "add_to_cart",
      eventID: uuid(),
      userId: user?.id || "",
      user: user || {},
      currency: "INR",
      value,
      items: ga,
      source: eventSource,
      ...analyticsMeta,
    });
    // Analytics.record({ name: eventName, pinpoint, metrics: { value } });
    // vercelAnalytics.track(eventName, vercel);
  } catch (e) {
    errorHandler(e);
  }
}

export function* removeFromCartEventHandler({ payload }) {
  try {
    const { product } = payload;
    const userData = yield select((state) => state.user.user);
    const user = userMapper(userData);
    const { value, pixel, vercel, ga, moengage } = itemMapper(
      product,
      null,
      user,
    );

    trackEvent("Removed From Cart", moengage.removedFromCart);
    console.log("Removed From Cart", value, pixel, vercel, ga, moengage);
    if (window && window.dataLayer) {
      window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
      window.dataLayer.push({
        event: "remove_from_cart",
        eventID: uuid(),
        attribute: pixel,
        ecommerce: {
          currency: "INR",
          value,
          items: ga,
        },
      });
    }
    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "remove_from_cart",
      eventID: uuid(),
      userId: user?.id || "",
      user: user || {},
      currency: "INR",
      value,
      items: ga,
      source: eventSource,
      ...analyticsMeta,
    });
    // Analytics.record({
    //   name: "remove_from_cart",
    //   pinpoint,
    //   metrics: { value },
    // });
    // vercelAnalytics.track("remove_from_cart", vercel);
  } catch (e) {
    errorHandler(e);
  }
}

// export function* productSearchedEventHandler({ payload }) {
//   try {
// const userData = yield select((state) =>
//   state.user.user?.phone ? state.user.user : state.user.customUser,
// );
// const currentAddress = yield select(
//   (state) => state.address.currentAddress || state.address.addressList?.[0],
// );
//     const user = userMapper(userData);
//     if (window && window.dataLayer) {
//       window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
//       window.dataLayer.push({
//         event: "search",
//         eventID: uuidv4(),
//         attribute: {
//           search_term: payload["search term"],
//           item_count: payload["Item Count"],
//         },
//       });

//       trackEvent("Product Searched", {
//         ...payload,
//       });
//     }

//     const eventSource = getClientSource();
//     const analyticsMeta = analyticsMetaDataMapper();

//     trackClickStream({
//       event: "product_searched",
//       eventID: uuidv4(),
//       userId: user?.id || "",
//       user: user || {},
//       search_term: payload["search term"],
//       item_count: payload["Item Count"],
//       source: eventSource,
//       ...analyticsMeta,
//     });
//   } catch (e) {
//     errorHandler(e);
//   }
// }

export function* tileClickedEventHandler({ payload }) {
  try {
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const user = userMapper(userData);
    trackEvent("Tile Clicked", {
      ...payload,
    });

    const eventSource = getClientSource();
    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "tile_clicked",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      banner_name: payload.banner_name,
      item_id: payload.item_id,
      item_count: payload["Item Count"],
      section_name: payload["Section Name"],
      source: eventSource,
      ...analyticsMeta,
    });
  } catch (e) {
    errorHandler(e);
  }
}

export function* logOutEventHandler({ payload }) {
  try {
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const currentAddress = yield select(
      (state) => state.address.currentAddress || state.address.addressList?.[0],
    );
    const eventSource = getClientSource();
    const user = userMapper(userData, currentAddress);
    trackEvent("Customer Logged Out", {
      ...payload,
      Source: eventSource,
    });
    const analyticsMeta = analyticsMetaDataMapper();

    console.log(
      {
        event: "customer_logged_out",
        eventID: uuidv4(),
        userId: user?.phone || user?.id || "",
        user: user || {},
        source: eventSource,
        ...analyticsMeta,
      },
      "LOG________________OUT",
    );
    trackClickStream({
      event: "customer_logged_out",
      eventID: uuidv4(),
      userId: user?.phone || user?.id || "",
      user: user || {},
      source: eventSource,
      ...analyticsMeta,
    });
    // Cookie.remove(`${STORE_PREFIX}_session_id`);
  } catch (e) {
    errorHandler(e);
  }
}

export function* topNavbarClickedEventHandler({ payload }) {
  try {
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const eventSource = getClientSource();
    const user = userMapper(userData);
    trackEvent("Top Navbar Clicked", {
      ...payload,
    });

    console.log(payload, "Top Navbar Clicked");
    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "top_navbar_clicked",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      banner_name: payload.banner_name,
      item_id: payload.item_id,
      section_name: payload["Section Name"],
      source: eventSource,
      ...analyticsMeta,
    });
  } catch (e) {
    errorHandler(e);
  }
}

export function* shopByClickEventHandler({ payload }) {
  try {
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const eventSource = getClientSource();
    const user = userMapper(userData);

    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "shop_by_clicked",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      ...payload,
      source: eventSource,
      ...analyticsMeta,
    });
    console.log("shop_by_clicked", {
      event: "shop_by_clicked",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      ...payload,
      source: eventSource,
      ...analyticsMeta,
    });
  } catch (e) {
    errorHandler(e);
  }
}

export function* blogClickEventHandler({ payload }) {
  try {
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const user = userMapper(userData);
    const eventSource = getClientSource();
    const analyticsMeta = analyticsMetaDataMapper();

    trackClickStream({
      event: "blogs_clicked",
      eventID: uuidv4(),
      userId: user?.id || "",
      user: user || {},
      ...payload,
      source: eventSource,
      ...analyticsMeta,
    });
  } catch (e) {
    errorHandler(e);
  }
}

export function* applyCouponsEventHandler({ payload }) {
  const { coupon } = payload;
  const checkoutSource = coupon.checkoutSource || "BUYWOW";

  try {
    const data = yield select((state) => state.cart.data);
    const userData = yield select((state) =>
      state.user.user?.phone ? state.user.user : state.user.customUser,
    );
    const user = userMapper(userData);
    const { pixel } = orderMapper(data, coupon, user, checkoutSource);

    if (window && window.dataLayer) {
      window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
      window.dataLayer.push({
        event: "add_coupon_code",
        eventID: uuidv4(),
        attribute: pixel,
      });
    }

    console.log("COUPON APPLIED ", {
      event: "add_coupon_code",
      eventID: uuidv4(),
      attribute: pixel,
    });
  } catch (e) {
    errorHandler(e);
  }
}

export function* spinTheWheelPlayedEventHandler({ payload }) {
  try {
    trackEvent("Spin The Wheel Played", {
      ...payload,
    });
  } catch (e) {
    errorHandler(e);
  }
}

export function* spinTheWheelRewardEventHandler({ payload }) {
  try {
    trackEvent("Spin The Wheel Reward", {
      ...payload,
    });
  } catch (e) {
    errorHandler(e);
  }
}

export function* customEventVercelEventHandler({ payload }) {
  try {
    const { title, data } = payload;
    // track(title, {
    //   ...data,
    //   date: getFormattedDate(),
    // });
  } catch (e) {
    errorHandler(e);
  }
}

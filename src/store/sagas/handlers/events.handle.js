import {
  analyticsMetaDataMapper,
  getRecordKey,
  getSource,
} from "@/utils/helpers";

export function* outOfStockHandler({ payload }) {
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

export function* proceedToCheckoutHandler({ payload }) {
  try {
    const eventSource = getSource();
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
    console.error("Error in proceedToCheckoutHandler:", error);
  }
}

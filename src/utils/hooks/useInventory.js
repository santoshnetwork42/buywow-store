import { useCallback, useEffect, useMemo, useState } from "react";
import { isDiffArray } from "../helpers";
import { checkInventory } from "@/graphql/api";
import { useNavbar } from "@wow-star/utils-cms";

export const useInventory = (params) => {
  const { validateCart } = params || {};
  const { cartItems, resolve, storeId } = useNavbar();
  const [isLoading, setIsLoading] = useState(false);
  const [returnObj, setReturnObj] = useState({
    ready: false,
    success: false,
    outOfStockItems: [],
    inventoryMapping: {},
    productWithPrice: {},
  });

  const processInventoryData = useCallback(
    (cartListMapping, currentCartItems) => {
      const nonCouponItems = currentCartItems.filter(
        (item) => item?.cartItemSource !== "COUPON",
      );

      const inventoryMapping = Object.entries(cartListMapping).reduce(
        (acc, [recordKey, { inventory }]) => ({
          ...acc,
          [recordKey]: inventory,
        }),
        {},
      );

      const productWithPrice = Object.entries(cartListMapping).reduce(
        (
          acc,
          [
            recordKey,
            { price, collections, maximumOrderQuantity, minimumOrderQuantity },
          ],
        ) => ({
          ...acc,
          [recordKey]: {
            price,
            collections,
            maximumOrderQuantity,
            minimumOrderQuantity,
          },
        }),
        {},
      );

      const isPriceMisMatch = nonCouponItems.some(
        (item) =>
          cartListMapping[item.recordKey] &&
          Number(cartListMapping[item.recordKey].price) !== Number(item.price),
      );

      const isCollectionListChanged = nonCouponItems.some(
        (item) =>
          cartListMapping[item.recordKey] &&
          isDiffArray(
            cartListMapping[item.recordKey].collections || [],
            item.collections || [],
          ),
      );

      const isMoqChanged = nonCouponItems.some(
        (item) =>
          cartListMapping[item.recordKey] &&
          (Number(cartListMapping[item.recordKey].maximumOrderQuantity) !==
            Number(item.maximumOrderQuantity) ||
            Number(cartListMapping[item.recordKey].minimumOrderQuantity) !==
              Number(item.minimumOrderQuantity) ||
            !(
              Number(item.qty || 1) >=
                Number(cartListMapping[item.recordKey].minimumOrderQuantity) &&
              Number(item.qty || 1) <=
                Number(cartListMapping[item.recordKey].maximumOrderQuantity)
            )),
      );

      const outOfStockItems = currentCartItems.filter(
        (item) =>
          Number(item.qty) > (cartListMapping[item.recordKey]?.inventory || 0),
      );

      return {
        isPriceMisMatch,
        isCollectionListChanged,
        isMoqChanged,
        outOfStockItems,
        inventoryMapping,
        productWithPrice,
      };
    },
    [],
  );

  const fetchInventory = useCallback(async () => {
    if (!cartItems?.length) {
      setReturnObj((prev) => ({ ...prev, ready: false }));
      return;
    }

    try {
      setIsLoading(true);

      const inventoryPayload = cartItems.map((product) => ({
        recordKey: product.recordKey,
        productId: product.id,
        variantId: product.variantId,
        source: product.cartItemSource || null,
      }));

      const {
        data: { checkInventory: response },
      } = await resolve(checkInventory, {
        storeId,
        items: inventoryPayload,
      });

      const cartListMapping = response.reduce(
        (acc, item) => ({
          ...acc,
          [item.recordKey]: {
            inventory: item.inventory,
            price: item.price,
            collections: item.collections,
            maximumOrderQuantity: item.maximumOrderQuantity,
            minimumOrderQuantity: item.minimumOrderQuantity,
          },
        }),
        {},
      );

      const {
        isPriceMisMatch,
        isCollectionListChanged,
        isMoqChanged,
        outOfStockItems,
        inventoryMapping,
        productWithPrice,
      } = processInventoryData(cartListMapping, cartItems);

      const needsValidation =
        isPriceMisMatch || isCollectionListChanged || isMoqChanged;

      if (needsValidation && typeof validateCart === "function") {
        validateCart(productWithPrice);
      }

      setReturnObj({
        ready: true,
        success:
          !outOfStockItems.length &&
          !isPriceMisMatch &&
          !isCollectionListChanged &&
          !isMoqChanged,
        outOfStockItems,
        inventoryMapping,
        productWithPrice,
      });
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
      setReturnObj((prev) => ({ ...prev, ready: true, success: false }));
    } finally {
      setIsLoading(false);
    }
  }, [cartItems, resolve, storeId, processInventoryData, validateCart]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // Return memoized value to prevent unnecessary re-renders
  return useMemo(
    () => ({
      ...returnObj,
      isLoading,
    }),
    [returnObj, isLoading],
  );
};

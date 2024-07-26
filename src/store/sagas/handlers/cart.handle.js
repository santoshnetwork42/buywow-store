import { setCart } from "@/store/slices/cart/cartSlice";
import { getFirstVariant } from "@/utils/helpers";
import { put, select } from "redux-saga/effects";

export function* addToCartHandler(action) {
  try {
    let tmpProduct = { ...action.payload.product };
    const variant = getFirstVariant(tmpProduct, tmpProduct.variantId);

    if (variant) {
      tmpProduct.variantId = variant.id;
      tmpProduct.price = variant.price;
      tmpProduct.listingPrice = variant.listingPrice;
    }
    let recordKey = tmpProduct.id;
    if (tmpProduct.variantId) {
      recordKey = `${tmpProduct.id}-${tmpProduct.variantId}`;
    }

    if (tmpProduct.cartItemSource) {
      recordKey = `${recordKey}-${tmpProduct.cartItemSource}`;
      tmpProduct.listingPrice = tmpProduct.price;
    }

    // // Always at last
    if (tmpProduct.cartItemSource === "LIMITED_TIME_DEAL") {
      tmpProduct.price = tmpProduct.recommendPrice;
    }

    const state = yield select((state) => state.cart);
    const existingItem = state.data.find(
      (item) => item.recordKey === recordKey,
    );

    if (existingItem) {
      const updatedData = state.data.map((item) =>
        item.recordKey === recordKey
          ? { ...item, qty: parseInt(item.qty) + parseInt(tmpProduct.qty) }
          : item,
      );

      yield put(setCart([...updatedData]));
    } else {
      const currentATC = {
        ...tmpProduct,
        recordKey,
        addedAt: new Date().toISOString(),
      };

      yield put(setCart([...state.data, currentATC]));

      // yield put({
      //   type: "ADD_TO_CART",
      //   payload: {
      //     ...state,
      //     data: [...state.data, currentATC],
      //   },
      // });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: "ADD_TO_CART_ERROR", payload: error.message });
  }
}

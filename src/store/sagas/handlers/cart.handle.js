import {
  emptyCart,
  setCart,
  updateSubTotal,
} from "@/store/slices/cart/cartSlice";
import { getFirstVariant, getProductSubTotal } from "@/utils/helpers";
import { put, select } from "redux-saga/effects";

export function* addToCartHandler(action) {
  try {
    let tmpProduct = { ...action.payload.product };
    const variant = getFirstVariant(tmpProduct, tmpProduct.variantId);

    if (variant) {
      tmpProduct = {
        ...tmpProduct,
        variantId: variant.id,
        price: variant.price,
        listingPrice: variant.listingPrice,
      };
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

    const cartState = yield select((state) => state.cart);
    const existingItem = cartState?.data?.find(
      (item) => item.recordKey === recordKey,
    );

    if (existingItem) {
      const updatedData = cartState?.data?.map((item) =>
        item.recordKey === recordKey
          ? {
              ...item,
              qty:
                parseInt(item.qty) + parseInt(tmpProduct.qty),
            }
          : item,
      );

      const subTotal = getProductSubTotal(updatedData);

      yield put(updateSubTotal(subTotal));
      yield put(setCart([...updatedData]));
    } else {
      const currentATC = {
        ...tmpProduct,
        recordKey,
        addedAt: new Date().toISOString(),
      };

      yield put(
        updateSubTotal(
          cartState.subTotal + currentATC.price * currentATC.qty,
        ),
      );
      yield put(setCart([...cartState.data, currentATC]));
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: "ADD_TO_CART_ERROR", payload: error.message });
  }
}

export function* emptyCartHandler() {
  yield put(emptyCart());
}

export function* updateCartHandler(action) {
  const { data = [] } = action.payload;
  const subTotal = getProductSubTotal(data);

  yield put(updateSubTotal(subTotal));
  yield put(setCart(data));
}

export function* removeFromCartHandler(action) {
  const { product: tmpProduct = {} } = action.payload;
  const { data: cartData = [] } = yield select((state) => state.cart);

  const filteredCart = cartData.filter(
    (product) =>
      tmpProduct.recordKey !== product.recordKey &&
      product.parentRecordKey !== tmpProduct.recordKey,
  );

  const subTotal = getProductSubTotal(filteredCart);

  yield put(updateSubTotal(subTotal));
  yield put(setCart(filteredCart));
}

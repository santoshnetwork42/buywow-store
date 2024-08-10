import { fetchProductDetailsAPI } from "@/lib/appSyncAPIs";
import {
  emptyCart,
  setCart,
  setCoupon,
  setStoredCouponCode,
  setSubTotal,
} from "@/store/slices/cart/cart.slice";
import { getFirstVariant, getProductSubTotal } from "@/utils/helpers";
import { getCouponDiscount } from "@wow-star/utils";
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
              qty: parseInt(item.qty) + parseInt(tmpProduct.qty),
            }
          : item,
      );

      const subTotal = getProductSubTotal(updatedData);

      yield put(setSubTotal(subTotal));
      yield put(setCart([...updatedData]));
    } else {
      const currentATC = {
        ...tmpProduct,
        recordKey,
        addedAt: new Date().toISOString(),
      };

      yield put(
        setSubTotal(cartState.subTotal + currentATC.price * currentATC.qty),
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
  const { coupon } = yield select((state) => state.cart);
  const { allowed } = getCouponDiscount(coupon, data);

  let updatedData = data;
  if (!allowed) {
    updatedData = data.filter((item) => item?.cartItemSource !== "COUPON");
    yield put(setCoupon(null));
  }

  const subTotal = getProductSubTotal(updatedData);

  yield put(setSubTotal(subTotal));
  yield put(setCart(updatedData));
}

export function* validateCartHandler(action) {
  const { payload } = action;
  const { data: cartData = [] } = yield select((state) => state.cart);

  const data = cartData.map((item) => {
    if (typeof payload[item.recordKey] === "number") {
      return {
        ...item,
        price: payload[item.recordKey],
      };
    }
    return item;
  });

  yield put(setCart(data));
}

export function* removeFromCartHandler(action) {
  const { product: tmpProduct } = action.payload;
  const { data: cartData } = yield select((state) => state.cart);

  const filteredCart = cartData.filter(
    (product) =>
      product.recordKey !== tmpProduct.recordKey &&
      product.parentRecordKey !== tmpProduct.recordKey,
  );

  const subTotal = getProductSubTotal(filteredCart);

  yield put(setSubTotal(subTotal));
  yield put(setCart(filteredCart));
}

export function* applyCouponHandler(action) {
  const { coupon } = action.payload;
  yield put(setCoupon(coupon));
}

export function* removeCouponHandler() {
  yield put(setCoupon(null));
}

export function* storedCouponCodeHandler(action) {
  const { couponCode } = action.payload;
  yield put(setStoredCouponCode(couponCode));
}

export function* fetchAndAddProductsFromEncodedCartHandler(action) {
  try {
    const { _cx } = action.payload;
    if (!_cx) return;

    const cart = JSON.parse(atob(_cx));
    yield put(emptyCart());

    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];

      if (element.product_id) {
        const product = yield call(fetchProductDetailsAPI, element.product_id);

        let tmpName, tmpPrice;
        try {
          if (product) {
            if (
              element.variant_id &&
              element.variant_id !== element.product_id
            ) {
              const variant = product.variants.items.find(
                (i) => i.id === element.variant_id,
              );
              if (variant) {
                tmpName = `${tmpName} - ${variant.title}`;
                tmpPrice = variant.price;

                yield put(
                  addToCart({
                    ...product,
                    name: tmpName,
                    qty: Number(element.qty),
                    price: tmpPrice,
                    variantId: variant.id,
                  }),
                );
                yield put(setCartModal({ isCartOpen: true }));
              }
            } else {
              yield put(
                addToCart({
                  ...product,
                  qty: Number(element.qty),
                  price: product?.price,
                }),
              );
              yield put(handleCartVisibility(true));
            }
          }
        } catch (error) {
          console.error("Error adding cart limechat :", error);
        }
      }
    }
  } catch (error) {
    console.error("Error adding cart from encoded data:", error);
  }
}

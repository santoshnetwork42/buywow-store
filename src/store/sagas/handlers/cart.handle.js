import { fetchProductDetailsAPI } from "@/lib/appSyncAPIs";
import {
  emptyCart,
  setCart,
  setCartError,
  setCartId,
  setCoupon,
  setIsRewardApplied,
  setStoredCouponCode,
  setSubTotal,
} from "@/store/slices/cart.slice";
import { getFirstVariant, getProductSubTotal } from "@/utils/helpers";
import { getCouponDiscount } from "@wow-star/utils";
import { all, call, put, select } from "redux-saga/effects";
import { setCartModalHandler } from "./modal.handle";

export function* addToCartHandler(action) {
  try {
    const { product } = action.payload;
    const cartState = yield select((state) => state.cart);

    const variant = getFirstVariant(product, product.variantId);

    const updatedProduct = {
      ...product,
      ...(variant && {
        variantId: variant.id,
        price: variant.price,
        listingPrice: variant.listingPrice,
      }),
    };

    const recordKey = [
      updatedProduct.id,
      updatedProduct.variantId,
      updatedProduct.cartItemSource,
    ]
      .filter(Boolean)
      .join("-");

    if (updatedProduct.cartItemSource) {
      updatedProduct.listingPrice = updatedProduct.price;
    }

    if (updatedProduct.cartItemSource === "LIMITED_TIME_DEAL") {
      updatedProduct.price = updatedProduct.recommendPrice;
    }

    const existingItemIndex = cartState.data.findIndex(
      (item) => item.recordKey === recordKey,
    );

    let updatedCart;
    if (existingItemIndex !== -1) {
      updatedCart = [...cartState.data];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        qty:
          parseInt(updatedCart[existingItemIndex].qty) +
          parseInt(updatedProduct.qty),
      };
    } else {
      updatedCart = [
        ...cartState.data,
        {
          ...updatedProduct,
          recordKey,
          addedAt: new Date().toISOString(),
        },
      ];
    }

    const subTotal = getProductSubTotal(updatedCart);
    yield put(setSubTotal(subTotal));
    yield put(setCart(updatedCart));
  } catch (error) {
    console.error("Error in addToCartHandler:", error);
    // yield put(setCartError(error));
  }
}

export function* removeFromCartHandler(action) {
  const { product: removedProduct } = action.payload;
  const { cart, coupon } = yield select((state) => ({
    cart: state.cart.data,
    coupon: state.cart.coupon,
  }));

  const { product: tmpProduct } = action.payload;

  const filteredCart = cart.filter(
    (product) =>
      product.recordKey !== removedProduct.recordKey &&
      product.parentRecordKey !== removedProduct.recordKey,
  );

  const subTotal = getProductSubTotal(filteredCart);
  const { allowed: allowedCoupon } = getCouponDiscount(coupon, filteredCart);

  yield put(setSubTotal(subTotal));
  yield put(setCart(filteredCart));

  if (!allowedCoupon) {
    yield put(setCoupon(null));
  }
}

export function* updateCartHandler(action) {
  const { data = [] } = action.payload;
  const { coupon } = yield select((state) => state.cart);

  const { allowed: isCouponAllowed } = getCouponDiscount(coupon, data);

  const updatedData = isCouponAllowed
    ? data
    : data.filter((item) => item?.cartItemSource !== "COUPON");

  const subTotal = getProductSubTotal(updatedData);

  yield put(setSubTotal(subTotal));
  yield put(setCart(updatedData));

  if (!isCouponAllowed) {
    yield put(setCoupon(null));
  }
}

export function* applyRewardPointHandler(action) {
  const { isRewardApplied = false } = action.payload;
  yield put(setIsRewardApplied(isRewardApplied));
}

export function* applyCouponHandler(action) {
  const { coupon } = action.payload;
  yield put(setCoupon(coupon));
}

export function* removeCouponHandler() {
  yield put(setCoupon(null));
}

export function* emptyCartHandler() {
  yield put(emptyCart());
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

export function* updateCartIdHandler(action) {
  const { cartId } = action.payload;
  yield put(setCartId(cartId));
}

export function* updateCartIdLoadingHandler(action) {
  const { isLoading } = action.payload;
  yield put(setIsShoppingCartIdLoading(isLoading));
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

    const productRequests = cart
      .filter((item) => item.product_id)
      .map((item) => call(fetchProductDetailsAPI, item.product_id));

    const products = yield all(productRequests);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const element = cart[i];

      if (!product) continue;

      let cartProduct = {
        ...product,
        qty: Number(element.qty),
        price: product.price,
      };

      if (element.variant_id && element.variant_id !== element.product_id) {
        const variant = product.variants.items.find(
          (v) => v.id === element.variant_id,
        );
        if (variant) {
          cartProduct = {
            ...cartProduct,
            name: `${product.name} - ${variant.title}`,
            price: variant.price,
            variantId: variant.id,
          };
        }
      }

      yield call(addToCartHandler, {
        payload: { product: cartProduct },
      });
    }

    yield call(setCartModalHandler, {
      payload: { isCartOpen: true },
    });
  } catch (error) {
    console.error("Error adding cart from encoded data:", error);
  }
}

import { STORE_ID, STORE_PREFIX } from "@/config";
import { fetchProductDetailsAPI } from "@/lib/appSyncAPIs";
import { setCartModalHandler } from "@/store/sagas/handlers/modal.handle";
import {
  createShoppingCartAPI,
  manageShoppingCartAPI,
} from "@/store/sagas/requests/cart.request";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import {
  emptyCart,
  setCart,
  setCartId,
  setCoupon,
  setIsRewardApplied,
  setIsShoppingCartIdLoading,
  setStoredCouponCode,
  setSubTotal,
} from "@/store/slices/cart.slice";
import { errorHandler } from "@/utils/errorHandler";
import {
  checkAffiseValidity,
  getFirstVariant,
  getProductSubTotal,
} from "@/utils/helpers";
import { getCouponDiscount } from "@wow-star/utils";
import { all, call, put, select } from "redux-saga/effects";

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

      let newQty =
        parseInt(updatedCart[existingItemIndex].qty) +
        parseInt(updatedProduct.qty);

      if (
        updatedProduct.maximumOrderQuantity &&
        newQty > updatedProduct.maximumOrderQuantity
      ) {
        newQty = updatedProduct.maximumOrderQuantity;
      }
      if (newQty > updatedProduct.currentInventory) {
        newQty = updatedProduct.currentInventory;
      }

      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        qty: newQty,
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
    yield put({ type: cartSagaActions.MANAGE_CART });
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
  yield put({ type: cartSagaActions.MANAGE_CART });
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
  yield put({ type: cartSagaActions.MANAGE_CART });
}

export function* applyRewardPointHandler(action) {
  const { isRewardApplied = false } = action.payload;
  yield put(setIsRewardApplied(isRewardApplied));
  yield put({ type: cartSagaActions.MANAGE_CART });
}

export function* applyCouponHandler(action) {
  const { coupon } = action.payload;
  yield put(setCoupon(coupon));
  yield put({ type: cartSagaActions.MANAGE_CART });
}

export function* removeCouponHandler() {
  yield put(setCoupon(null));
  yield put({ type: cartSagaActions.MANAGE_CART });
}

export function* emptyCartHandler() {
  yield put(emptyCart());
  yield put({ type: cartSagaActions.MANAGE_CART });
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
  yield put(setCartId(action.payload));
}

export function* updateCartIdLoadingHandler(action) {
  yield put(setIsShoppingCartIdLoading(action.payload));
}

export function* storedCouponCodeHandler(action) {
  const { couponCode } = action.payload;
  yield put(setStoredCouponCode(couponCode));
}

export function* manageCartHandler(action) {
  try {
    if (action.type === "EMPTY_CART") {
      localStorage.removeItem(`${STORE_PREFIX}-cartId`);
      yield put({ type: cartSagaActions.UPDATE_CART_ID, payload: null });
      return;
    }

    yield put({ type: cartSagaActions.UPDATE_CART_ID_LOADING, payload: true });

    const { user, cart, system } = yield select();
    let { coupon, data: products, isRewardApplied } = cart;
    const { user: userData, isLoggedinViaGokwik } = user;
    const { id: couponCode, code } = coupon || {};

    const data = products.map(({ id, variantId, qty, cartItemSource }) => ({
      productId: id,
      variantId,
      quantity: qty,
      source: cartItemSource || null,
    }));

    const isAffiseTrackingValid = checkAffiseValidity();

    const cartInput = {
      couponCodeId: couponCode || null,
      couponCode: code || "",
      storeId: STORE_ID,
      isRewardApplied:
        userData?.id && !isLoggedinViaGokwik ? isRewardApplied : false,
      data,
      metadata: { ...system?.meta, isAffiseTrackingValid },
    };

    if (cart.cartId) {
      cartInput.shoppingCartId = cart.cartId;
    }

    const methodToCall = userData?.id
      ? manageShoppingCartAPI
      : createShoppingCartAPI;

    const authMode = userData?.id ? "userPool" : "apiKey";

    const response = yield call(methodToCall, cartInput, authMode);

    const cartId = response?.shoppingCartId || null;
    localStorage.setItem(`${STORE_PREFIX}-cartId`, cartId);

    yield put({ type: cartSagaActions.UPDATE_CART_ID, payload: cartId });
    yield put({ type: cartSagaActions.UPDATE_CART_ID_LOADING, payload: false });
  } catch (error) {
    errorHandler(error, "Error while managing cart");
  }
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

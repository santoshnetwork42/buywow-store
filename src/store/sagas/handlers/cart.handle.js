import { showToast } from "@/components/common/ToastComponent";
import { STORE_ID, STORE_PREFIX } from "@/config";
import {
  checkInventoryAPI,
  fetchCouponRuleAPI,
  fetchProductDetailsAPI,
  fetchShoppingCartAPI,
} from "@/lib/appSyncAPIs";
import { setCartModalHandler } from "@/store/sagas/handlers/modal.handle";
import {
  createShoppingCartAPI,
  manageShoppingCartAPI,
} from "@/store/sagas/requests/cart.request";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import {
  clearStoredCoupon,
  emptyCart,
  setCart,
  setCartCreatedAt,
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
  isDiffArray,
} from "@/utils/helpers";
import {
  errorComsOnPlaceOrder,
  errorTypeOnPlaceOrder,
} from "@/utils/helpers/communication";
import { getCouponDiscount } from "@wow-star/utils-cms";
import { product } from "platform";
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
        price:
          product.cartItemSource === "LIMITED_TIME_DEAL"
            ? product.price
            : variant.price,
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

    if (
      updatedProduct.cartItemSource &&
      updatedProduct.cartItemSource !== "LIMITED_TIME_DEAL"
    ) {
      updatedProduct.listingPrice = updatedProduct.price;
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
    (product) => product.recordKey !== removedProduct.recordKey,
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

export function* updateCartCouponHandler(action) {
  const { coupon } = action.payload;
  yield put(setCoupon(coupon));
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
  try {
    const { payload } = action;

    const { data: cartData = [], coupon } = yield select((state) => state.cart);

    let error = "";
    if (!!coupon && coupon?.isArchive) {
      error = errorComsOnPlaceOrder[errorTypeOnPlaceOrder.COUPON_ARCHIVED];
    } else if (
      !!appliedCoupon &&
      !!coupon &&
      appliedCoupon?.isRewardApplicable !== coupon?.isRewardApplicable
    ) {
      error =
        errorComsOnPlaceOrder[errorTypeOnPlaceOrder.COUPON_LOYALTY_CHANGE];
    }

    const data = cartData.map((item) => {
      const {
        price = 0,
        collections = [],
        minimumOrderQuantity = 1,
        maximumOrderQuantity = 1,
      } = payload[item.recordKey] || {};

      if (!payload[item.recordKey]) {
        return item;
      }

      if (item.price !== price) {
        error = errorComsOnPlaceOrder[errorTypeOnPlaceOrder.PRICE_CHANGE];
      }
      const isDiffer = isDiffArray(item?.collections || [], collections || []);

      const currentQty = Math.min(
        Math.max(item?.qty || 1, minimumOrderQuantity || 1),
        maximumOrderQuantity,
      );

      if (isDiffer) {
        const isCouponApplicable = (coupon?.applicableCollections || []).some(
          (c) => collections?.includes(c),
        );
        if (
          !isCouponApplicable &&
          !!coupon?.applicableCollections &&
          !!collections?.length
        )
          error = errorComsOnPlaceOrder[errorTypeOnPlaceOrder.COUPON_CHANGE];
      } else if (item?.qty !== currentQty) {
        error = errorComsOnPlaceOrder[errorTypeOnPlaceOrder.MOQ_CHANGE];
      }

      return {
        ...item,
        ...payload[item.recordKey],
        qty: currentQty,
        ...(item?.variantId && {
          variants: {
            items: item?.variants?.items?.map((i) => {
              if (i.id === item.variantId) {
                return {
                  ...i,
                  price,
                  minimumOrderQuantity,
                  maximumOrderQuantity,
                };
              }
              return i;
            }),
          },
        }),
      };
    });

    const { allowed: isCouponAllowed } = getCouponDiscount(coupon, data);

    const updatedData = isCouponAllowed
      ? data
      : data?.filter((item) => item?.cartItemSource !== "COUPON");

    const subTotal = getProductSubTotal(updatedData);

    yield put(setSubTotal(subTotal));
    yield put(setCart(updatedData));

    if (!isCouponAllowed) {
      yield put(setCoupon(null));
    }
    yield put({ type: cartSagaActions.MANAGE_CART });

    if (error) {
      showToast.custom(
        error,
        {},
        "text-center", // textClassName
        "!flex-row", //mainClassName
      );
    }
  } catch (e) {
    console.error(e);
    yield put(emptyCart());
    yield put({ type: cartSagaActions.MANAGE_CART });
  }
}

export function* updateCartIdHandler(action) {
  const cartId = yield select((state) => state.cart.cartId);
  if (!cartId) {
    yield put(setCartCreatedAt(new Date().toISOString()));
  }
  yield put(setCartId(action.payload));
}

export function* updateCartIdLoadingHandler(action) {
  yield put(setIsShoppingCartIdLoading(action.payload));
}

export function* storedCouponCodeHandler(action) {
  const { couponCode, couponExpiry } = action.payload;
  yield put(setStoredCouponCode({ couponCode, couponExpiry }));
}

export function* clearStoredCouponCodeHandler() {
  yield put(clearStoredCoupon());
}

export function* validateCartOnErrorHandler(action) {
  try {
    const { inventoryDetails } = action?.payload;

    const { data: cartData = [], coupon: appliedCoupon } = yield select(
      (state) => state.cart,
    );
    // get upto date inventory
    const updatedInventoryDetails = yield call(
      checkInventoryAPI,
      STORE_ID,
      inventoryDetails,
    );

    let coupon = null;

    if (!!appliedCoupon?.code)
      coupon = yield call(fetchCouponRuleAPI, appliedCoupon?.code);

    let error = "";
    if (!!appliedCoupon?.code && (!coupon?.code || coupon?.isArchive)) {
      error = errorComsOnPlaceOrder[errorTypeOnPlaceOrder.COUPON_ARCHIVED];
    } else if (
      !!appliedCoupon &&
      !!coupon &&
      appliedCoupon?.isRewardApplicable !== coupon?.isRewardApplicable
    ) {
      error =
        errorComsOnPlaceOrder[errorTypeOnPlaceOrder.COUPON_LOYALTY_CHANGE];
    }

    const updatedCart = cartData?.map((i) => {
      const updatedProduct = updatedInventoryDetails?.find(
        (p) => p.recordKey === i.recordKey,
      );
      if (!updatedProduct) {
        return i;
      }

      const isDiffer = isDiffArray(
        i?.collections || [],
        updatedProduct?.collections || [],
      );

      const currentQty = Math.min(
        Math.max(i?.qty || 1, updatedProduct?.minimumOrderQuantity || 1),
        updatedProduct?.maximumOrderQuantity,
      );

      if (currentQty !== i?.qty) {
        error = errorComsOnPlaceOrder[errorTypeOnPlaceOrder.MOQ_CHANGE];
      } else if (i.price !== updatedProduct?.price) {
        error = errorComsOnPlaceOrder[errorTypeOnPlaceOrder.PRICE_CHANGE];
      } else if (isDiffer) {
        error = errorComsOnPlaceOrder[errorTypeOnPlaceOrder.COUPON_CHANGE];
      }

      return {
        ...i,
        ...(i?.variantId && {
          variants: {
            items: i?.variants?.items?.map((v) => {
              if (v.id === i.variantId) {
                return {
                  ...v,
                  price: updatedProduct?.price,
                  minimumOrderQuantity: updatedProduct?.minimumOrderQuantity,
                  maximumOrderQuantity: updatedProduct?.maximumOrderQuantity,
                };
              }
              return i;
            }),
          },
        }),
        price: updatedProduct?.price,
        inventory: updatedProduct?.inventory,
        collections: updatedProduct?.collections || [],
        qty: currentQty,
        maximumOrderQuantity: updatedProduct?.maximumOrderQuantity,
        minimumOrderQuantity: updatedProduct?.minimumOrderQuantity,
      };
    });

    const { allowed: isCouponAllowed = false } = !coupon?.isArchive
      ? getCouponDiscount(coupon, updatedCart)
      : {};

    const updatedData = isCouponAllowed
      ? updatedCart
      : updatedCart.filter((item) => item?.cartItemSource !== "COUPON");

    const subTotal = getProductSubTotal(updatedData);

    yield put(setSubTotal(subTotal));
    yield put(setCart(updatedData));
    yield put(setCoupon(isCouponAllowed ? coupon : null));

    yield put({ type: cartSagaActions.MANAGE_CART });
    if (error) {
      showToast.custom(
        error,
        {},
        "text-center", // textClassName
        "!flex-row", //mainClassName
      );
    }
  } catch (e) {
    console.error(e);
    yield put(emptyCart());
    yield put({ type: cartSagaActions.MANAGE_CART });
  }
}

export function* updateCartWithShoppingCartIdHandler(action) {
  try {
    const { cartId } = action.payload;
    const shoppingCart = yield call(fetchShoppingCartAPI, cartId);

    const couponCode = shoppingCart.couponCode;

    const shoppingcartProducts = shoppingCart.shoppingcartProducts.items || [];
    if (!shoppingCart.shoppingcartProducts.items?.length) return;

    // empty cart first if mismatch cart present
    yield put({ type: cartSagaActions.EMPTY_CART });
    // add cartId
    localStorage.setItem(`${STORE_PREFIX}-cartId`, cartId);
    yield put({ type: cartSagaActions.UPDATE_CART_ID, payload: cartId });

    // add shopping cart to db
    for (let i = 0; i < shoppingcartProducts.length; i++) {
      const { quantity, source, variantId, product, variant } =
        shoppingcartProducts[i];
      let cartProduct = {
        ...product,
        qty: Number(quantity),
        price: product.price,
        source,
      };
      if (!!variantId) {
        cartProduct = {
          ...cartProduct,
          title: `${product?.title} - ${variant?.label ?? ""}`,
          price: variant.price,
          variantId,
        };
      }

      if (!(source === "LIMITED_TIME_DEAL" || source === "COUPON"))
        yield call(addToCartHandler, {
          payload: { product: cartProduct },
        });
    }
    // coupon code apply so source === "COUPON" products will get added here
    if (!!couponCode) {
      const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      yield put(setStoredCouponCode({ couponCode, couponExpiry: expiryTime }));
    }

    yield call(setCartModalHandler, {
      payload: { isCartOpen: true },
    });
  } catch (error) {
    errorHandler(error, "Error while updateCartWithShoppingCartId cart");
  }
}

export function* manageCartHandler(action) {
  try {
    if (action.type === "EMPTY_CART") {
      localStorage.removeItem(`${STORE_PREFIX}-cartId`);
      yield put({ type: cartSagaActions.UPDATE_CART_ID, payload: null });
      return;
    }

    yield put({ type: cartSagaActions.UPDATE_CART_ID_LOADING, payload: true });

    const { isCheckoutInitiated = false } = action?.payload || {};
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
      isCheckoutInitiated,
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

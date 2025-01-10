import {
  addToCartHandler,
  applyCouponHandler,
  applyRewardPointHandler,
  emptyCartHandler,
  fetchAndAddProductsFromEncodedCartHandler,
  manageCartHandler,
  removeCouponHandler,
  removeFromCartHandler,
  storedCouponCodeHandler,
  updateCartHandler,
  updateCartIdHandler,
  updateCartIdLoadingHandler,
  validateCartHandler,
  updateCartWithShoppingCartIdHandler,
  clearStoredCouponCodeHandler,
  updateCartCouponHandler,
  validateCartOnErrorHandler,
} from "@/store/sagas/handlers/cart.handle";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";

function* addToCart() {
  yield takeLatest(cartSagaActions.ADD_TO_CART, addToCartHandler);
}

function* removeFromCart() {
  yield takeLatest(cartSagaActions.REMOVE_FROM_CART, removeFromCartHandler);
}

function* updateCart() {
  yield takeLatest(cartSagaActions.UPDATE_CART, updateCartHandler);
}

function* applyRewardPoint() {
  yield takeLatest(cartSagaActions.APPLY_REWARD_POINT, applyRewardPointHandler);
}

function* applyCoupon() {
  yield takeLatest(cartSagaActions.APPLY_COUPONS, applyCouponHandler);
}

function* updateCartCoupon() {
  yield takeLatest(cartSagaActions.UPDATE_CART_COUPON, updateCartCouponHandler);
}
function* validateCartOnError() {
  yield takeLatest(
    cartSagaActions.VALIDATE_CART_ON_ERROR,
    validateCartOnErrorHandler,
  );
}

function* removeCoupon() {
  yield takeLatest(cartSagaActions.REMOVE_COUPON, removeCouponHandler);
}

function* emptyCart() {
  yield takeLatest(cartSagaActions.EMPTY_CART, emptyCartHandler);
}

function* validateCart() {
  yield takeLatest(cartSagaActions.VALIDATE_CART, validateCartHandler);
}

function* updateCartId() {
  yield takeLatest(cartSagaActions.UPDATE_CART_ID, updateCartIdHandler);
}

function* updateCartIdLoading() {
  yield takeLatest(
    cartSagaActions.UPDATE_CART_ID_LOADING,
    updateCartIdLoadingHandler,
  );
}

function* updateCartWithShoppingCartId() {
  yield takeLatest(
    cartSagaActions.UPDATE_CART_WITH_SHOPPING_CART_ID,
    updateCartWithShoppingCartIdHandler,
  );
}

function* storedCouponCode() {
  yield takeLatest(cartSagaActions.STORED_COUPON_CODE, storedCouponCodeHandler);
}

function* clearStoredCouponCode() {
  yield takeLatest(
    cartSagaActions.CLEAR_STORED_COUPON_CODE,
    clearStoredCouponCodeHandler,
  );
}

function* manageCart() {
  yield takeEvery([cartSagaActions.MANAGE_CART], manageCartHandler);
}

function* fetchAndAddProductsFromEncodedCart() {
  yield takeLatest(
    cartSagaActions.FETCH_AND_ADD_PRODUCTS_FROM_ENCODED_CART,
    fetchAndAddProductsFromEncodedCartHandler,
  );
}

export function* cartWatcher() {
  yield all([
    fork(addToCart),
    fork(removeFromCart),
    fork(updateCart),
    fork(applyRewardPoint),
    fork(applyCoupon),
    fork(updateCartCoupon),
    fork(removeCoupon),
    fork(emptyCart),
    fork(validateCart),
    fork(validateCartOnError),
    fork(updateCartId),
    fork(updateCartIdLoading),
    fork(updateCartWithShoppingCartId),
    fork(storedCouponCode),
    fork(clearStoredCouponCode),
    fork(manageCart),
    fork(fetchAndAddProductsFromEncodedCart),
  ]);
}

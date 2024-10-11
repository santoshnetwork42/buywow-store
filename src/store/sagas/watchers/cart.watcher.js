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

function* storedCouponCode() {
  yield takeLatest(cartSagaActions.STORED_COUPON_CODE, storedCouponCodeHandler);
}

function* manageCart() {
  yield takeLatest([cartSagaActions.MANAGE_CART], manageCartHandler);
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
    fork(removeCoupon),
    fork(emptyCart),
    fork(validateCart),
    fork(updateCartId),
    fork(updateCartIdLoading),
    fork(storedCouponCode),
    fork(manageCart),
    fork(fetchAndAddProductsFromEncodedCart),
  ]);
}

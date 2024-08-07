import {
  addToCartHandler,
  applyCouponHandler,
  emptyCartHandler,
  removeCouponHandler,
  removeFromCartHandler,
  storedCouponCodeHandler,
  updateCartHandler,
  validateCartHandler,
} from "@/store/sagas/handlers/cart.handle";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { all, fork, takeLatest } from "redux-saga/effects";

function* addToCart() {
  yield takeLatest(cartSagaActions.ADD_TO_CART, addToCartHandler);
}

function* emptyCart() {
  yield takeLatest(cartSagaActions.EMPTY_CART, emptyCartHandler);
}

function* removeFromCart() {
  yield takeLatest(cartSagaActions.REMOVE_FROM_CART, removeFromCartHandler);
}

function* updateCart() {
  yield takeLatest(cartSagaActions.UPDATE_CART, updateCartHandler);
}

function* validateCart() {
  yield takeLatest(cartSagaActions.VALIDATE_CART, validateCartHandler);
}

function* applyCoupon() {
  yield takeLatest(cartSagaActions.APPLY_COUPONS, applyCouponHandler);
}

function* removeCoupon() {
  yield takeLatest(cartSagaActions.REMOVE_COUPON, removeCouponHandler);
}

function* storedCouponCode() {
  yield takeLatest(cartSagaActions.STORED_COUPON_CODE, storedCouponCodeHandler);
}

export function* cartWatcher() {
  yield all([
    fork(addToCart),
    fork(emptyCart),
    fork(removeFromCart),
    fork(updateCart),
    fork(validateCart),
    fork(applyCoupon),
    fork(removeCoupon),
    fork(storedCouponCode),
  ]);
}

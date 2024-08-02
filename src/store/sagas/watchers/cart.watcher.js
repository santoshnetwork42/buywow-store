import {
  addToCartHandler,
  emptyCartHandler,
  removeFromCartHandler,
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

export function* cartWatcher() {
  yield all([
    fork(addToCart),
    fork(emptyCart),
    fork(removeFromCart),
    fork(updateCart),
    fork(validateCart),
  ]);
}

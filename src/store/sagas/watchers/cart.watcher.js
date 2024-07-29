import {
  addToCartHandler,
  emptyCartHandler,
  removeFromCartHandler,
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

export function* cartWatcher() {
  yield all([fork(addToCart), fork(emptyCart), fork(removeFromCart)]);
}

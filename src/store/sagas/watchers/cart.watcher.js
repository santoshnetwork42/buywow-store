import { addToCartHandler } from "@/store/sagas/handlers/cart.handle";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { all, fork, takeLatest } from "redux-saga/effects";

function* addToCart() {
  yield takeLatest(cartSagaActions.ADD_TO_CART, addToCartHandler);
}

export function* cartWatcher() {
  yield all([fork(addToCart)]);
}

import {
  setCartModalHandler,
  setPasswordLessModalHandler,
} from "@/store/sagas/handlers/modal.handle";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";
import { all, fork, takeLatest } from "redux-saga/effects";

function* setPasswordLessModal() {
  yield takeLatest(
    modalSagaActions.SET_PASSWORDLESS_MODAL,
    setPasswordLessModalHandler,
  );
}

function* setCartModal() {
  yield takeLatest(modalSagaActions.SET_CART_MODAL, setCartModalHandler);
}

export function* modalWatcher() {
  yield all([fork(setPasswordLessModal), fork(setCartModal)]);
}

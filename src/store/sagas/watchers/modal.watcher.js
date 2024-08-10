import { all, fork, takeLatest } from "redux-saga/effects";
import {
  setCartModalHandler,
  setDrawerHandler,
  setPasswordLessModalHandler,
} from "@/store/sagas/handlers/modal.handle";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";

function* setPasswordLessModal() {
  yield takeLatest(
    modalSagaActions.SET_PASSWORDLESS_MODAL,
    setPasswordLessModalHandler,
  );
}

function* setCartModal() {
  yield takeLatest(modalSagaActions.SET_CART_MODAL, setCartModalHandler);
}

function* setDrawer() {
  yield takeLatest(modalSagaActions.SET_DRAWER, setDrawerHandler);
}

export function* modalWatcher() {
  yield all([fork(setPasswordLessModal), fork(setCartModal)], fork(setDrawer));
}

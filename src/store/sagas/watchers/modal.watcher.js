import {
  setCartModalHandler,
  setPasswordLessModalHandler,
  setSpinTheWheelHandler,
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
function* setSpinTheWheel() {
  yield takeLatest(
    modalSagaActions.SET_SPIN_THE_WHEEL_MODAL,
    setSpinTheWheelHandler,
  );
}

export function* modalWatcher() {
  yield all([
    fork(setPasswordLessModal),
    fork(setCartModal),
    fork(setSpinTheWheel),
  ]);
}

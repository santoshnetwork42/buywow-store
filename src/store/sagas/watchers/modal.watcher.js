import { all, fork, takeLatest } from "redux-saga/effects";
import { setPasswordLessModalHandler } from "@/store/sagas/handlers/modal.handle";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";

function* setPasswordLessModal() {
  yield takeLatest(
    modalSagaActions.SET_PASSWORDLESS_MODAL,
    setPasswordLessModalHandler,
  );
}

export function* modalWatcher() {
  yield all([fork(setPasswordLessModal)]);
}

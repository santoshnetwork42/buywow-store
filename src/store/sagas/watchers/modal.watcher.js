import { all, fork, takeLatest } from "redux-saga/effects";
import { setPasswordlessModalHandler } from "@/store/sagas/handlers/modal.handle";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";

function* setPasswordlessModal() {
  yield takeLatest(
    modalSagaActions.SET_PASSWORDLESS_MODAL,
    setPasswordlessModalHandler,
  );
}

export function* modalWatcher() {
  yield all([fork(setPasswordlessModal)]);
}

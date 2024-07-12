import { all, fork, takeLatest } from "redux-saga/effects";
import { userSagaActions } from "@/store/sagas/sagaActions/user.actions";
import { setUserHandler } from "@/store/sagas/handlers/user.handle";

function* setUser() {
  yield takeLatest(userSagaActions.SET_USER, setUserHandler);
}

export function* userWatcher() {
  yield all([fork(setUser)]);
}

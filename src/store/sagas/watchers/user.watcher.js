import {
  setCustomUserHandler,
  setUserHandler,
} from "@/store/sagas/handlers/user.handle";
import { userSagaActions } from "@/store/sagas/sagaActions/user.actions";
import { all, fork, takeLatest } from "redux-saga/effects";

function* setUser() {
  yield takeLatest(userSagaActions.SET_USER, setUserHandler);
}

function* setCustomUser() {
  yield takeLatest(userSagaActions.SET_CUSTOM_USER, setCustomUserHandler);
}

export function* userWatcher() {
  yield all([fork(setUser), fork(setCustomUser)]);
}

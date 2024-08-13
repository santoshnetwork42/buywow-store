import {
  setCustomUserHandler,
  setIsLoggedinViaGokwikHandler,
  setUserHandler,
} from "@/store/sagas/handlers/user.handle";
import { userSagaActions } from "@/store/sagas/sagaActions/user.actions";
import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";

function* setUser() {
  yield takeLatest(userSagaActions.SET_USER, setUserHandler);
}

function* setCustomUser() {
  yield takeLatest(userSagaActions.SET_CUSTOM_USER, setCustomUserHandler);
}

function* setIsLoggedinViaGokwik() {
  yield takeEvery(
    userSagaActions.SET_LOGGED_IN_VIA,
    setIsLoggedinViaGokwikHandler,
  );
}

export function* userWatcher() {
  yield all([fork(setUser), fork(setCustomUser), fork(setIsLoggedinViaGokwik)]);
}

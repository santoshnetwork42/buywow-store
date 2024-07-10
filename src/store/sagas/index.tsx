import { all, fork } from "redux-saga/effects";
import { authWatcher } from "./watchers/auth.watcher";
import { modalWatcher } from "./watchers/modal.watcher";

export default function* rootSaga() {
  yield all([fork(authWatcher), fork(modalWatcher)]);
}

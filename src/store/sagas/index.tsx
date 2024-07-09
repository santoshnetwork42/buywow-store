import { all, fork } from "redux-saga/effects";
import { authWatcher } from "./watchers/auth.watcher";

export default function* rootSaga() {
  yield all([fork(authWatcher)]);
}

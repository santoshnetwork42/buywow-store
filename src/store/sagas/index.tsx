import { all, fork } from "redux-saga/effects";
import { authWatcher } from "@/store/sagas/watchers/auth.watcher";
import { modalWatcher } from "@/store/sagas/watchers/modal.watcher";
import { userWatcher } from "@/store/sagas/watchers/user.watcher";

export default function* rootSaga() {
  yield all([fork(authWatcher), fork(modalWatcher), fork(userWatcher)]);
}

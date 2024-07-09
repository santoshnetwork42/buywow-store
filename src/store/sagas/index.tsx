import { all, fork } from "redux-saga/effects";
import { signupWatcher } from "./watchers/signup.watcher";

export default function* rootSaga() {
	yield all([fork(signupWatcher)]);
}

import { all, fork } from "redux-saga/effects";
import { onboardingWatcher } from "./watchers/onboarding.watcher";

export default function* rootSaga() {
	yield all([fork(onboardingWatcher)]);
}

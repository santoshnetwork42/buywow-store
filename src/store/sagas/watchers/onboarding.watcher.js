import { all, fork, takeLatest } from "redux-saga/effects";
import { createAwsAccount } from "../handlers/onboarding.handle";
import { onboardingSagaActions } from "../sagaActions/onboarding.actions";

function* createAccount() {
  yield takeLatest(onboardingSagaActions.CREATE_AWS_ACCOUNT, createAwsAccount);
}

export function* onboardingWatcher() {
  yield all([fork(createAccount)]);
}

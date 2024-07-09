import { all, fork, takeLatest } from "redux-saga/effects";
import { createAwsAccount } from "../handlers/signup.handle";
import { signupSagaActions } from "../sagaActions/signup.actions";

function* createAccount() {
  yield takeLatest(signupSagaActions.CREATE_AWS_ACCOUNT, createAwsAccount);
}

export function* signupWatcher() {
  yield all([fork(createAccount)]);
}

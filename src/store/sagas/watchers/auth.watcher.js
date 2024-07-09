import { all, fork, takeLatest } from "redux-saga/effects";
import {
  createAwsAccount,
  signinWithAwsAccount,
} from "@/store/sagas/handlers/auth.handle";
import { authSagaActions } from "@/store/sagas/sagaActions/auth.actions";

function* createAccount() {
  yield takeLatest(authSagaActions.CREATE_AWS_ACCOUNT, createAwsAccount);
}

function* signin() {
  yield takeLatest(authSagaActions.SIGNIN_AWS_ACCOUNT, signinWithAwsAccount);
}

export function* authWatcher() {
  yield all([fork(createAccount), fork(signin)]);
}

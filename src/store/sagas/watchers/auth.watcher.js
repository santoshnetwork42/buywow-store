import { all, fork, takeLatest } from "redux-saga/effects";
import {
  confirmSigninHandler,
  createAwsAccount,
  signinWithAwsAccount,
  confirmSignupHandler,
  setConfirmationStatusHandler,
} from "@/store/sagas/handlers/auth.handle";
import { authSagaActions } from "@/store/sagas/sagaActions/auth.actions";

function* createAccount() {
  yield takeLatest(authSagaActions.CREATE_AWS_ACCOUNT, createAwsAccount);
}

function* signin() {
  yield takeLatest(authSagaActions.SIGNIN_AWS_ACCOUNT, signinWithAwsAccount);
}

function* confirmSignIn() {
  yield takeLatest(authSagaActions.CONFIRM_SIGNIN, confirmSigninHandler);
}

function* confirmSignUp() {
  yield takeLatest(authSagaActions.CONFIRM_SIGNUP, confirmSignupHandler);
}

function* setConfirmationStatus() {
  yield takeLatest(
    authSagaActions.SET_CONFIRMATION_STATUS,
    setConfirmationStatusHandler,
  );
}

export function* authWatcher() {
  yield all([
    fork(createAccount),
    fork(signin),
    fork(confirmSignIn),
    fork(confirmSignUp),
    fork(setConfirmationStatus),
  ]);
}

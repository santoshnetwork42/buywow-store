import {
  authLoaderHandler,
  confirmSignInHandler,
  confirmSignUpHandler,
  createAwsAccountHandler,
  setConfirmationStatusHandler,
  signInWithAwsAccountHandler,
  signOutHandler,
} from "@/store/sagas/handlers/auth.handle";
import { authSagaActions } from "@/store/sagas/sagaActions/auth.actions";
import { all, fork, takeLatest } from "redux-saga/effects";

function* createAccount() {
  yield takeLatest(authSagaActions.CREATE_AWS_ACCOUNT, createAwsAccountHandler);
}

function* signIn() {
  yield takeLatest(
    authSagaActions.SIGNIN_AWS_ACCOUNT,
    signInWithAwsAccountHandler,
  );
}

function* confirmSignIn() {
  yield takeLatest(authSagaActions.CONFIRM_SIGNIN, confirmSignInHandler);
}

function* confirmSignUp() {
  yield takeLatest(authSagaActions.CONFIRM_SIGNUP, confirmSignUpHandler);
}

function* setConfirmationStatus() {
  yield takeLatest(
    authSagaActions.SET_CONFIRMATION_STATUS,
    setConfirmationStatusHandler,
  );
}

function* signOut() {
  yield takeLatest(authSagaActions.SIGN_OUT, signOutHandler);
}

function* authLoader() {
  yield takeLatest(authSagaActions.SET_AUTH_LOADER, authLoaderHandler);
}

export function* authWatcher() {
  yield all([
    fork(createAccount),
    fork(signIn),
    fork(confirmSignIn),
    fork(confirmSignUp),
    fork(setConfirmationStatus),
    fork(signOut),
    fork(authLoader),
  ]);
}

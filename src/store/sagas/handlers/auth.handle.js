import {
  autoSignInRequest,
  confirmSignInRequest,
  confirmSignUpRequest,
  resendSignUpCodeRequest,
  signInWithAwsRequest,
  signOutRequest,
  signUpWithAwsRequest,
} from "@/store/sagas/requests/auth.request";
import {
  setAuthLoading,
  setConfirmationStatus,
} from "@/store/slices/auth.slice";
import { setPasswordLessModal } from "@/store/slices/modal.slice";
import { setUser } from "@/store/slices/user.slice";
import { call, put, select } from "redux-saga/effects";
import { eventsSagaActions } from "@/store/sagas/sagaActions/events.actions";
// import { logOutEventHandler } from "@/store/sagas/handlers/events.handle";

export function* createAwsAccountHandler(action) {
  try {
    const { phone } = action.payload;
    yield put(setAuthLoading(true));
    const user = yield call(() => signUpWithAwsRequest({ phone }));

    if (user?.nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
      yield put(setAuthLoading(false));
      yield put(setConfirmationStatus("UNCONFIRMED_SIGNUP"));
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    yield put(setAuthLoading(false));
  }
}

export function* signInWithAwsAccountHandler(action) {
  try {
    const { phone } = action.payload;

    yield put(setAuthLoading(true));
    const user = yield call(() => signInWithAwsRequest({ phone }));
    yield put(setAuthLoading(false));

    if (user?.nextStep?.signInStep === "CONFIRM_SIGN_UP") {
      const user = yield call(() => resendSignUpCodeRequest({ phone }));
      if ((user.deliveryMedium = "SMS"))
        yield put(setConfirmationStatus("UNCONFIRMED_SIGNUP"));
    } else if (
      user?.nextStep?.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE"
    ) {
      yield put(setConfirmationStatus("UNCONFIRMED_SIGNIN"));
    }
  } catch (error) {
    if (error.name === "UserNotFoundException") {
      yield put(setConfirmationStatus("SIGNUP"));
    }
  } finally {
    yield put(setAuthLoading(false));
  }
}

export function* confirmSignInHandler(action) {
  try {
    const { confirmationCode } = action.payload;
    const { passwordLess } = yield select((state) => state.modal);
    yield put(setAuthLoading(true));
    const user = yield call(() => confirmSignInRequest({ confirmationCode }));
    console.log("SignedIn user :>> ", user); //set user in userState
    yield put(setAuthLoading(false));

    yield put(setConfirmationStatus(user?.nextStep?.signInStep));
    yield put(
      setPasswordLessModal({
        isPasswordLessOpen: false,
        customLogin: passwordLess?.customLogin,
        redirectTo: passwordLess?.redirectTo,
      }),
    );
  } catch (error) {
    console.log("error", error);
  } finally {
    yield put(setAuthLoading(false));
  }
}

export function* confirmSignUpHandler(action) {
  try {
    const { username, confirmationCode } = action.payload;

    yield put(setAuthLoading(true));
    const user = yield call(() =>
      confirmSignUpRequest({ username, confirmationCode }),
    );
    yield put(setAuthLoading(false));

    if (user?.nextStep?.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
      const res = yield call(() => autoSignInRequest());
      console.log("SignedUp res :>> ", res); //set user in userState

      yield put(setConfirmationStatus(res?.nextStep?.signInStep));
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    yield put(setAuthLoading(false));
  }
}

export function* setConfirmationStatusHandler(action) {
  try {
    yield put(setConfirmationStatus(action.payload));
  } catch (error) {
    console.log("error", error);
  }
}

export function* signOutHandler() {
  try {
    // yield call(eventsSagaActions.LOG_OUT, logOutEventHandler);
    const signedOutUser = yield call(() => signOutRequest());
    console.log("signedOutUser :>> ", signedOutUser); //set user in userState
    yield put(setConfirmationStatus(null));
    yield put(setUser({}));
  } catch (error) {
    console.log("error", error);
  }
}

export function* authLoaderHandler(action) {
  try {
    yield put(setAuthLoading(action.payload));
  } catch (error) {
    console.log("error", error);
  }
}

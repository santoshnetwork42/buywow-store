import { call, put } from "redux-saga/effects";
import {
  signupWithAws,
  signinWithAws,
  confirmSignin,
  confirmSignup,
  resendSignupCode,
  autoSignin,
} from "@/store/sagas/requests/auth.request";
import {
  setAuthLoading,
  setConfirmationStatus,
} from "@/store/slices/auth/authSlice";

export function* createAwsAccount(action) {
  try {
    const { phone } = action.payload;
    yield put(setAuthLoading(true));
    const user = yield call(() => signupWithAws({ phone }));

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

export function* signinWithAwsAccount(action) {
  try {
    const { phone } = action.payload;

    yield put(setAuthLoading(true));
    const user = yield call(() => signinWithAws({ phone }));
    yield put(setAuthLoading(false));

    if (user?.nextStep?.signInStep === "CONFIRM_SIGN_UP") {
      const user = yield call(() => resendSignupCode({ phone }));
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

export function* confirmSigninHandler(action) {
  try {
    const { confirmationCode } = action.payload;

    yield put(setAuthLoading(true));
    const user = yield call(() => confirmSignin({ confirmationCode }));
    yield put(setAuthLoading(false));

    yield put(setConfirmationStatus(user?.nextStep?.signInStep));
  } catch (error) {
    console.log("error", error);
  } finally {
    yield put(setAuthLoading(false));
  }
}

export function* confirmSignupHandler(action) {
  try {
    const { username, confirmationCode } = action.payload;

    yield put(setAuthLoading(true));
    const user = yield call(() =>
      confirmSignup({ username, confirmationCode }),
    );
    yield put(setAuthLoading(false));

    if (user?.nextStep?.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
      const res = yield call(() => autoSignin());
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

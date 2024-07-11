import { call, put } from "redux-saga/effects";
import {
  signupWithAws,
  signinWithAws,
  confirmSignin,
  confirmSignup,
  resendSignupCode,
} from "@/store/sagas/requests/auth.request";
import { setConfirmationStatus } from "@/store/slices/auth/authSlice";

export function* createAwsAccount(action) {
  try {
    const { phone } = action.payload;
    const user = yield call(() => signupWithAws({ phone }));

    if (user?.nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
      yield put(setConfirmationStatus("UNCONFIRMED_SIGNUP"));
    }
  } catch (error) {
    console.log("error", error);
  }
}

export function* signinWithAwsAccount(action) {
  try {
    const { phone } = action.payload;
    const user = yield call(() => signinWithAws(phone));

    if (user?.nextStep?.signInStep === "CONFIRM_SIGN_UP") {
      const user = yield call(() => resendSignupCode(phone));
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
  }
}

export function* confirmSigninHandler(action) {
  try {
    const { confirmationCode } = action.payload;
    const user = yield call(() => confirmSignin({ confirmationCode }));

    yield put(setConfirmationStatus(user?.nextStep?.signInStep));
  } catch (error) {
    console.log("error", error);
  }
}

export function* confirmSignupHandler(action) {
  try {
    const { username, confirmationCode } = action.payload;
    const user = yield call(() =>
      confirmSignup({ username, confirmationCode }),
    );

    yield put(setConfirmationStatus(user?.nextStep?.signInStep));
  } catch (error) {
    console.log("error", error);
  }
}

export function* setConfirmationStatusHandler(action) {
  try {
    yield put(setConfirmationStatus(action.payload));
  } catch (error) {
    console.log("error", error);
  }
}

import { call, put } from "redux-saga/effects";
import {
  signupWithAws,
  signinWithAws,
  resendCode,
} from "@/store/sagas/requests/auth.request";

export function* createAwsAccount(action) {
  try {
    const { phone } = action.payload;
    const data = yield call(() => signupWithAws(phone));
    console.log("data :>> ", data);
    // yield put(setUser(data));
  } catch (error) {
    console.log("error", error);
  }
}

export function* signinWithAwsAccount(action) {
  try {
    const { phone } = action.payload;
    const user = yield call(() => signinWithAws(phone));
    if (user?.nextStep?.signInStep === "CONFIRM_SIGN_UP") {
      const user = yield call(() => resendCode(phone));
      console.log("user :>> ", user);
    }
  } catch (error) {
    console.log("error", error);
  }
}

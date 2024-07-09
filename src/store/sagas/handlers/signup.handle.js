import { call, put } from "redux-saga/effects";
import { signupWithAws } from "@/store/sagas/requests/signup.request";

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

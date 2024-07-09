import { call } from "redux-saga/effects";
import { signupWithAws } from "@/store/sagas/requests/signup.request";

export function* createAwsAccount(action) {
  try {
    const { provider } = action.payload;
    yield call(() => signupWithAws(provider));
  } catch (error) {
    console.log("error", error);
  }
}

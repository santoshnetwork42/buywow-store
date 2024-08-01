import { setPasswordLessModal } from "@/store/slices/modal/modalSlice";
import { call, put } from "redux-saga/effects";

export function* setPasswordLessModalHandler(action) {
  try {
    const { isPasswordLessOpen, customLogin } = action.payload;
    yield put(setPasswordLessModal({ isPasswordLessOpen, customLogin }));
  } catch (error) {
    console.log("error", error);
  }
}

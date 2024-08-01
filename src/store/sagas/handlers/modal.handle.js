import { setPasswordLessModal } from "@/store/slices/modal/modalSlice";
import { call, put } from "redux-saga/effects";

export function* setPasswordLessModalHandler(action) {
  try {
    const { isPasswordLessOpen, customLogin, redirectTo } = action.payload;
    yield put(
      setPasswordLessModal({ isPasswordLessOpen, customLogin, redirectTo }),
    );
  } catch (error) {
    console.log("error", error);
  }
}

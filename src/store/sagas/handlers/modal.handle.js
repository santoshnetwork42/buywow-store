import { setPasswordLessModal } from "@/store/slices/modal/modalSlice";
import { call, put } from "redux-saga/effects";

export function* setPasswordLessModalHandler(action) {
  try {
    console.log("reached in handler");
    const { isPasswordLessOpen } = action.payload;
    yield put(setPasswordLessModal({ isPasswordLessOpen }));
  } catch (error) {
    console.log("error", error);
  }
}

import { setPasswordlessModal } from "@/store/slices/modal/modalSlice";
import { call, put } from "redux-saga/effects";

export function* setPasswordlessModalHandler(action) {
  try {
    console.log("reached in handler");
    const { isPasswordlessOpen } = action.payload;
    yield put(setPasswordlessModal({ isPasswordlessOpen }));
  } catch (error) {
    console.log("error", error);
  }
}

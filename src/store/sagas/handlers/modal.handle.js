import { setCartModal, setPasswordLessModal } from "@/store/slices/modal.slice";
import { put } from "redux-saga/effects";

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

export function* setCartModalHandler(action) {
  try {
    const { isCartOpen } = action.payload;
    yield put(setCartModal({ isCartOpen }));
  } catch (error) {
    console.log("error", error);
  }
}

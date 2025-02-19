import {
  setCartModal,
  setPasswordLessModal,
  setSpinTheWheelVisible,
} from "@/store/slices/modal.slice";
import { put } from "redux-saga/effects";

export function* setPasswordLessModalHandler(action) {
  try {
    const { isPasswordLessOpen, customLogin, redirectTo, source } =
      action.payload;
    yield put(
      setPasswordLessModal({
        isPasswordLessOpen,
        customLogin,
        redirectTo,
        source,
      }),
    );
  } catch (error) {
    console.error("error", error);
  }
}

export function* setCartModalHandler(action) {
  try {
    const { isCartOpen } = action.payload;
    yield put(setCartModal({ isCartOpen }));
  } catch (error) {
    console.error("error", error);
  }
}

export function* setSpinTheWheelHandler(action) {
  try {
    const { isSpinTheWheelNudgeThere } = action.payload;
    yield put(setSpinTheWheelVisible({ isSpinTheWheelNudgeThere }));
  } catch (error) {
    console.error("error", error);
  }
}

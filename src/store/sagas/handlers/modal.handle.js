import {
  setCartModal,
  setDrawer,
  setPasswordLessModal,
} from "@/store/slices/modal/modal.slice";
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

export function* setCartModalHandler(action) {
  try {
    const { isCartOpen } = action.payload;
    yield put(setCartModal({ isCartOpen }));
  } catch (error) {
    console.log("error", error);
  }
}

export function* setDrawerHandler(action) {
  try {
    const { isDrawerOpen } = action.payload;
    yield put(setDrawer({ isDrawerOpen }));
  } catch (error) {
    console.log("error", error);
  }
}

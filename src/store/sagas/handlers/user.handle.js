import { put } from "redux-saga/effects";

import { setUser } from "@/store/slices/user/userSlice";

export function* setUserHandler(action) {
  try {
    yield put(setUser(action.payload));
  } catch (error) {
    console.log("error", error);
  }
}

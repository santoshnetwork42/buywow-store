import { setCustomUser, setUser } from "@/store/slices/user.slice";
import { put } from "redux-saga/effects";

export function* setUserHandler(action) {
  try {
    yield put(setUser(action.payload));
  } catch (error) {
    console.log("error", error);
  }
}

export function* setCustomUserHandler(action) {
  try {
    yield put(setCustomUser(action.payload));
  } catch (error) {
    console.log("error", error);
  }
}

import { setMeta } from "@/store/slices/system.slice";
import { put } from "redux-saga/effects";

export function* setMetaHandler(action) {
  try {
    yield put(setMeta(action.payload));
  } catch (error) {
    console.error("Error setting meta:", error);
  }
}

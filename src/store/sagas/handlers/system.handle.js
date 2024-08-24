import { setMeta, setStore } from "@/store/slices/system.slice";
import { put } from "redux-saga/effects";

export function* setMetaHandler(action) {
  try {
    yield put(setMeta(action.payload));
  } catch (error) {
    console.error("Error setting meta:", error);
  }
}

export function* setStoreHandler(action) {
  try {
    yield put(setStore(action.payload));
  } catch (error) {
    console.error("Error setting store:", error);
  }
}

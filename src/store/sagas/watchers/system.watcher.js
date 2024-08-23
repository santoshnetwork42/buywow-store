import {
  setMetaHandler,
  setStoreHandler,
} from "@/store/sagas/handlers/system.handle";
import { systemSagaActions } from "@/store/sagas/sagaActions/system.actions";
import { all, fork, takeLatest } from "redux-saga/effects";

function* setMeta() {
  yield takeLatest(systemSagaActions.SET_META, setMetaHandler);
}

function* setStore() {
  yield takeLatest(systemSagaActions.SET_STORE, setStoreHandler);
}

export function* systemWatcher() {
  yield all([fork(setMeta), fork(setStore)]);
}

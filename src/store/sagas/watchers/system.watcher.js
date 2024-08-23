import { setMetaHandler } from "@/store/sagas/handlers/system.handle";
import { systemSagaActions } from "@/store/sagas/sagaActions/system.actions";
import { all, fork, takeLatest } from "redux-saga/effects";

function* setMeta() {
  yield takeLatest(systemSagaActions.SET_META, setMetaHandler);
}

export function* systemWatcher() {
  yield all([fork(setMeta)]);
}

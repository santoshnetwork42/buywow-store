import {
  createAddressHandler,
  deleteAddressHandler,
  editAddressHandler,
  getAddressListHandler,
  updateCurrentAddressHandler,
} from "@/store/sagas/handlers/address.handle";
import { addressSagaActions } from "@/store/sagas/sagaActions/address.actions";
import { all, fork, takeLatest } from "redux-saga/effects";

function* updateCurrentAddress() {
  yield takeLatest(
    addressSagaActions.UPDATE_CURRENT_ADDRESS,
    updateCurrentAddressHandler,
  );
}

function* createAddress() {
  yield takeLatest(addressSagaActions.CREATE_ADDRESS, createAddressHandler);
}

function* editAddress() {
  yield takeLatest(addressSagaActions.EDIT_ADDRESS, editAddressHandler);
}

function* getAddressList() {
  yield takeLatest(addressSagaActions.GET_ADDRESS_LIST, getAddressListHandler);
}

function* deleteAddress() {
  yield takeLatest(addressSagaActions.DELETE_ADDRESS, deleteAddressHandler);
}

export function* addressWatcher() {
  yield all([
    fork(updateCurrentAddress),
    fork(createAddress),
    fork(editAddress),
    fork(getAddressList),
    fork(deleteAddress),
  ]);
}

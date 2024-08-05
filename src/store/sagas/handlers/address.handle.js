import {
  createUserAddressAPI,
  getUserAddressAPI,
  removeUserAddressAPI,
  updateUserAddressAPI,
} from "@/lib/appSyncAPIs";
import {
  updateAddressList,
  updateAddressLoading,
  updateCurrentAddress,
} from "@/store/slices/address/address.slice";
import { call, put, select } from "redux-saga/effects";

export function* updateCurrentAddressHandler(action) {
  try {
    const address = action.payload;
    yield put(updateCurrentAddress(address));
  } catch (error) {
    console.log("error updating current address", error);
  }
}

export function* createAddressHandler(action) {
  try {
    yield put(updateAddressLoading(true));
    const addressPayload = action.payload;
    const userAddress = yield call(() => createUserAddressAPI(addressPayload));

    const { id, address, city, country, state, email, name, phone, pinCode } =
      userAddress.data.createUserAddress;

    const newAddress = {
      id,
      address,
      city,
      country,
      state,
      email,
      name,
      phone,
      pinCode,
    };

    yield put(updateCurrentAddress(newAddress));
    const { addressList } = yield select((state) => state.address);
    yield put(updateAddressList([...addressList, newAddress]));
  } catch (error) {
    console.log("error updating current address", error);
  } finally {
    yield put(updateAddressLoading(false));
  }
}

export function* editAddressHandler(action) {
  try {
    yield put(updateAddressLoading(true));
    const addressPayload = action.payload;
    console.log("userAddress :>> ", addressPayload);
    const userAddress = yield call(() => updateUserAddressAPI(addressPayload));

    const { id, address, city, country, state, email, name, phone, pinCode } =
      userAddress.data.updateUserAddress;

    const updatedAddress = {
      id,
      address,
      city,
      country,
      state,
      email,
      name,
      phone,
      pinCode,
    };

    yield put(updateCurrentAddress(updatedAddress));

    const { addressList } = yield select((state) => state.address);
    const updatedAddressList = addressList.map((addr) =>
      addr.id === updatedAddress.id ? updatedAddress : addr,
    );

    yield put(updateAddressList(updatedAddressList));
  } catch (error) {
    console.log("error editing address", error);
  } finally {
    yield put(updateAddressLoading(false));
  }
}

export function* getAddressListHandler(action) {
  try {
    const { id } = action.payload;
    const { currentAddress } = yield select((state) => state.address);
    const userAddresses = yield call(() => getUserAddressAPI({ id }));
    yield put(updateAddressList(userAddresses?.items || []));
    if (userAddresses?.items?.length > 0 && !currentAddress) {
      yield put(updateCurrentAddress(userAddresses.items[0]));
    }
  } catch (error) {
    console.log("error getting address", error);
  }
}

export function* deleteAddressHandler(action) {
  try {
    const { id, userID } = action.payload;

    // Get the current state
    const currentState = yield select((state) => state.address); // Adjust this to match your state structure
    const currentAddressList = currentState?.addressList || [];
    const currentSelectedAddress = currentState?.currentAddress || null;

    // Call the API to remove the address
    yield call(removeUserAddressAPI, { id, userID });

    // Filter out the deleted address locally
    const updatedAddressList = currentAddressList.filter(
      (address) => address.id !== id,
    );

    // Update the address list in the state
    yield put(updateAddressList(updatedAddressList));

    // Check if the deleted address was the selected one
    if (currentSelectedAddress && currentSelectedAddress.id === id) {
      if (updatedAddressList.length > 0) {
        // Find the index of the deleted address in the original list
        const deletedIndex = currentAddressList.findIndex(
          (addr) => addr.id === id,
        );

        // Select the next address, or the last one if the deleted address was the last
        const nextAddress =
          updatedAddressList[deletedIndex] ||
          updatedAddressList[updatedAddressList.length - 1];
        yield put(updateCurrentAddress(nextAddress));
      } else {
        // If no addresses left, set current address to null
        yield put(updateCurrentAddress(null));
      }
    }
  } catch (error) {
    console.log("Error deleting address", error);
    // yield put(deleteAddressFailure(error));
  }
}

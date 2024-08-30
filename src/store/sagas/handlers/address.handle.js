import { showToast } from "@/components/common/ToastComponent";
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
  updateInitialLoading,
} from "@/store/slices/address.slice";
import { call, put, select } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";

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
    let newAddress;

    if (addressPayload?.userID) {
      // Create new address in DB if userID is present
      const userAddress = yield call(() =>
        createUserAddressAPI(addressPayload),
      );

      if (!userAddress?.data && userAddress?.errors[0]?.message) {
        showToast.error(userAddress?.errors[0]?.message);
        return;
      }

      const { id, address, city, country, state, email, name, phone, pinCode } =
        userAddress.data.createUserAddress;

      newAddress = {
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
    } else {
      //Save address in redux
      newAddress = {
        id: uuidv4(),
        address: addressPayload?.address,
        city: addressPayload?.city,
        country: addressPayload?.country,
        state: addressPayload?.state,
        email: addressPayload?.email,
        name: addressPayload?.name,
        phone: addressPayload?.phone,
        pinCode: addressPayload?.pinCode,
      };
    }

    yield put(updateCurrentAddress(newAddress));
    const { addressList = [] } = yield select((state) => state.address);
    yield put(updateAddressList([...addressList, newAddress]));
  } catch (error) {
    console.log("error creating address", error);
  } finally {
    yield put(updateAddressLoading(false));
  }
}

export function* editAddressHandler(action) {
  try {
    yield put(updateAddressLoading(true));
    const addressPayload = action.payload;
    let updatedAddress;

    if (addressPayload?.userID) {
      // Update address in DB if userID is present
      const userAddress = yield call(() =>
        updateUserAddressAPI(addressPayload),
      );

      if (!userAddress?.data && userAddress?.errors[0]?.message) {
        showToast.error(userAddress?.errors[0]?.message);
        return;
      }

      const { id, address, city, country, state, email, name, phone, pinCode } =
        userAddress.data.updateUserAddress;

      updatedAddress = {
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
    } else {
      // Update address in Redux only
      updatedAddress = {
        id: addressPayload.id, // Assuming the id is part of the payload
        address: addressPayload.address,
        city: addressPayload.city,
        country: addressPayload.country,
        state: addressPayload.state,
        email: addressPayload.email,
        name: addressPayload.name,
        phone: addressPayload.phone,
        pinCode: addressPayload.pinCode,
      };
    }

    yield put(updateCurrentAddress(updatedAddress));

    const { addressList = [] } = yield select((state) => state.address);
    const updatedAddressList = addressList?.map((addr) =>
      addr.id === updatedAddress?.id ? updatedAddress : addr,
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
    yield put(updateInitialLoading(true));

    const { id = null } = action.payload;
    const { currentAddress, addressList } = yield select(
      (state) => state.address,
    );
    if (id) {
      // User is logged in, fetch addresses from API
      const userAddresses = yield call(getUserAddressAPI, { id });
      const fetchedAddresses = userAddresses?.items || [];

      yield put(updateAddressList(fetchedAddresses));

      if (fetchedAddresses.length > 0 && !currentAddress) {
        yield put(updateCurrentAddress(fetchedAddresses[0]));
      }
    } else {
      // User is not logged in, use addresses from Redux store
      if (addressList.length > 0 && !currentAddress) {
        yield put(updateCurrentAddress(addressList[0]));
      }
    }
  } catch (error) {
    console.log("error getting address", error);
  } finally {
    yield put(updateInitialLoading(false));
  }
}

export function* deleteAddressHandler(action) {
  try {
    yield put(updateAddressLoading(true));
    const { id, userID = null } = action.payload;

    // Get the current state
    const currentState = yield select((state) => state.address);
    const currentAddressList = currentState?.addressList || [];
    const currentSelectedAddress = currentState?.currentAddress || null;

    if (!!userID) {
      // User is logged in, call API to remove the address
      yield call(removeUserAddressAPI, { id, userID });
    }

    // Filter out the deleted address locally
    const updatedAddressList = currentAddressList?.filter(
      (address) => address.id !== id,
    );

    // Update the address list in the state
    yield put(updateAddressList(updatedAddressList));

    // Check if the deleted address was the selected one
    if (!!currentSelectedAddress && currentSelectedAddress.id === id) {
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
  } finally {
    yield put(updateAddressLoading(false));
  }
}

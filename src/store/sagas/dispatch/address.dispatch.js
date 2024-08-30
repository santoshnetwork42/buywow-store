import { addPhonePrefix } from "@/utils/helpers";
import { useDispatch } from "react-redux";
import { addressSagaActions } from "../sagaActions/address.actions";

export const useAddressDispatch = () => {
  const dispatch = useDispatch();

  const getAddressList = (userID) => {
    dispatch({
      type: addressSagaActions.GET_ADDRESS_LIST,
      payload: { id: userID },
    });
  };

  const createAddress = (address, userId) => {
    dispatch({
      type: addressSagaActions.CREATE_ADDRESS,
      payload: {
        ...address,
        userID: userId || null,
        phone: addPhonePrefix(address?.phone),
        country: address?.country || "IN",
      },
    });
  };

  const editAddress = (address, userId) => {
    dispatch({
      type: addressSagaActions.EDIT_ADDRESS,
      payload: {
        ...address,
        userID: userId || null,
        phone: addPhonePrefix(address?.phone),
        country: address?.country || "IN",
      },
    });
  };

  const updateCurrentAddress = (item) => {
    if (item === null) {
      dispatch({
        type: addressSagaActions.UPDATE_CURRENT_ADDRESS,
        payload: null,
      });
      return;
    }

    const {
      id,
      name,
      email,
      address,
      state,
      city,
      pinCode,
      phone,
      country,
      area,
      landmark,
    } = item;

    dispatch({
      type: addressSagaActions.UPDATE_CURRENT_ADDRESS,
      payload: {
        id,
        name,
        email,
        address,
        state,
        city,
        pinCode,
        phone,
        country: country || "IN",
        area,
        landmark,
      },
    });
  };

  const deleteAddress = (id, userID) => {
    dispatch({
      type: addressSagaActions.DELETE_ADDRESS,
      payload: { id, userID },
    });
  };

  return {
    getAddressList,
    createAddress,
    editAddress,
    updateCurrentAddress,
    deleteAddress,
  };
};

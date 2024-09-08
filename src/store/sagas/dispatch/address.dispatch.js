import { addPhonePrefix } from "@/utils/helpers";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addressSagaActions } from "../sagaActions/address.actions";

export const useAddressDispatch = () => {
  const dispatch = useDispatch();

  const getAddressList = useCallback(
    (userID) => {
      dispatch({
        type: addressSagaActions.GET_ADDRESS_LIST,
        payload: { id: userID },
      });
    },
    [dispatch],
  );

  const createAddress = useCallback(
    (address, userId) => {
      dispatch({
        type: addressSagaActions.CREATE_ADDRESS,
        payload: {
          ...address,
          userID: userId || null,
          phone: addPhonePrefix(address?.phone),
          country: address?.country || "IN",
        },
      });
    },
    [dispatch],
  );

  const editAddress = useCallback(
    (address, userId) => {
      dispatch({
        type: addressSagaActions.EDIT_ADDRESS,
        payload: {
          ...address,
          userID: userId || null,
          phone: addPhonePrefix(address?.phone),
          country: address?.country || "IN",
        },
      });
    },
    [dispatch],
  );

  const updateCurrentAddress = useCallback(
    (item) => {
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
    },
    [dispatch],
  );

  const deleteAddress = useCallback(
    (id, userID) => {
      dispatch({
        type: addressSagaActions.DELETE_ADDRESS,
        payload: { id, userID },
      });
    },
    [dispatch],
  );

  return {
    getAddressList,
    createAddress,
    editAddress,
    updateCurrentAddress,
    deleteAddress,
  };
};

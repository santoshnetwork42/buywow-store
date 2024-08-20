import { useDispatch } from "react-redux";
import { addressSagaActions } from "../sagaActions/address.actions";

export const useAddressDispatch = () => {
  const dispatch = useDispatch();

  const updateCurrentAddress = (item) => {
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
    updateCurrentAddress,
    deleteAddress,
  };
};

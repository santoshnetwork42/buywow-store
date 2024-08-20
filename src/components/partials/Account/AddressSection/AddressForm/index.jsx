import { Button } from "@/components/elements";
import { addressSagaActions } from "@/store/sagas/sagaActions/address.actions";
import { addPhonePrefix } from "@/utils/helpers";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressFormFields from "./AddressFormFields";

const AddressForm = React.memo(() => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.address);

  const [address, setAddress] = useState({
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    pinCode: "",
    name: "",
  });
  const [addressErrors, setAddressErrors] = useState({});

  const checkFormValidity = useCallback(() => {
    return Object.values(addressErrors).every((error) => !error);
  }, [addressErrors]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!checkFormValidity()) {
        return;
      }

      dispatch({
        type: addressSagaActions.CREATE_ADDRESS,
        payload: {
          ...address,
          userID: user?.id || null,
          phone: addPhonePrefix(address?.phone),
          country: address?.country || "IN",
        },
      });
    },
    [address, user, dispatch, checkFormValidity],
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <AddressFormFields
        address={address}
        setAddress={setAddress}
        addressErrors={addressErrors}
        setAddressErrors={setAddressErrors}
      />
      <div className="flex justify-center">
        <Button
          type="submit"
          variant="primary"
          className="w-full gap-2 p-2 px-4 text-xl"
          loader={isLoading}
        >
          Add Address
        </Button>
      </div>
    </form>
  );
});

AddressForm.displayName = "AddressForm";

export default AddressForm;

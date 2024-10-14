import { Button } from "@/components/elements";
import { useAddressDispatch } from "@/store/sagas/dispatch/address.dispatch";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import AddressFormFields from "@/components/partials/Account/AddressSection/AddressForm/AddressFormFields";

const AddressForm = React.memo(({ className }) => {
  const { createAddress } = useAddressDispatch();
  const user = useSelector((state) => state.user?.user);
  const isLoading = useSelector((state) => state.address?.isLoading);

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

      createAddress(address, user?.id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, user, checkFormValidity],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 ${className}`}
    >
      <AddressFormFields
        address={address}
        setAddress={setAddress}
        addressErrors={addressErrors}
        setAddressErrors={setAddressErrors}
      />
      <Button
        type="submit"
        variant="primary"
        size="medium"
        className="h-[36px] w-full sm:h-[36px] sm:w-1/2 md:h-[44px] lg:h-[44px]"
        loader={isLoading}
      >
        Add Address
      </Button>
    </form>
  );
});

AddressForm.displayName = "AddressForm";

export default AddressForm;
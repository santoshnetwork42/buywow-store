"use client";

import { Button } from "@/components/elements";
import Modal from "@/components/features/Modal";
import { addressSagaActions } from "@/store/sagas/sagaActions/address.actions";
import { addPhonePrefix, removePhonePrefix } from "@/utils/helpers";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressFormFields from "../Address/AddressFormFields";

const AddressModal = ({
  isOpen = false,
  onClose = () => {},
  enableOutsideClick = true,
  action = null,
  addressItem = {},
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.address);

  const ButtonText = action === "CREATE" ? "Add Address" : "Update Address";

  const [address, setAddress] = useState({
    id: addressItem?.id || null,
    email: addressItem?.email || "",
    phone: removePhonePrefix(addressItem?.phone) || "",
    address: addressItem?.address || "",
    state: addressItem?.state || "",
    city: addressItem?.city || "",
    pinCode: addressItem?.pinCode || "",
    name: addressItem?.name || "",
  });
  const [addressErrors, setAddressErrors] = useState({});

  const closeModal = useCallback(() => {
    setAddress({
      email: "",
      phone: "",
      address: "",
      state: "",
      city: "",
      pinCode: "",
      name: "",
    });
    onClose();
  }, [onClose]);

  const checkFormValidity = useCallback(() => {
    return Object.values(addressErrors).every((error) => !error);
  }, [addressErrors]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!checkFormValidity()) {
        return;
      }

      const payload = {
        ...address,
        userID: user?.id || null,
        phone: addPhonePrefix(address?.phone),
        country: address?.country || "IN",
      };

      dispatch({
        type:
          action === "CREATE"
            ? addressSagaActions.CREATE_ADDRESS
            : addressSagaActions.EDIT_ADDRESS,
        payload,
      });

      closeModal();
    },
    [address, user, dispatch, action, checkFormValidity, closeModal],
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      showMobileView
      title="Address"
      enableOutsideClick={enableOutsideClick}
    >
      <div className="mt-4">
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
              className="w-full gap-1 p-2 px-4 text-xl"
              loader={isLoading}
            >
              {ButtonText}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddressModal;

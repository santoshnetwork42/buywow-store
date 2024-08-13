"use client";

import { Button, Img, Input } from "@/components/elements";
import { Textarea } from "@/components/elements/Textarea";
import Modal from "@/components/features/Modal";
import { addressSagaActions } from "@/store/sagas/sagaActions/address.actions";
import {
  addPhonePrefix,
  isEmailValid,
  removePhonePrefix,
  validateEmail,
  validatePhoneNumber,
  validatePinCode,
  validateString,
} from "@/utils/helpers";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const initialAddressState = {
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    pinCode: "",
    name: "",
  };

  const [address, setAddress] = useState({
    id: addressItem?.id || null,
    email: addressItem?.email || null,
    phone: removePhonePrefix(addressItem?.phone) || null,
    address: addressItem?.address || "",
    state: addressItem?.state || "",
    city: addressItem?.city || "",
    pinCode: addressItem?.pinCode || null,
    name: addressItem?.name || null,
  });
  const [addressErrors, setAddressErrors] = useState({
    pinCode: "",
    city: "",
    state: "",
    address: "",
    name: "",
    email: "",
    phone: "",
  });

  const closeModal = () => {
    setAddress(initialAddressState);
    onClose();
  };

  const checkFormValidity = () => {
    const fields = [
      { key: "pinCode", validate: validatePinCode },
      { key: "city", validate: validateString },
      { key: "state", validate: validateString },
      { key: "phone", validate: validatePhoneNumber },
      { key: "name", validate: validateString },
      { key: "email", validate: validateEmail },
      { key: "address", validate: validateString },
    ];

    let hasError = false;
    const newErrors = {};

    for (const field of fields) {
      const result = field.validate(address[field.key]);
      if (result?.error) {
        newErrors[field.key] = result.message;
        if (!hasError) {
          hasError = true;
          setAddressErrors((prevErrors) => ({
            ...prevErrors,
            [field.key]: result.message,
          }));
          return;
        }
      }
    }

    if (!hasError) {
      setAddressErrors({});
    }

    return !hasError;
  };

  const handleAddressSubmit = async (e) => {
    //check for error and return
    if (!checkFormValidity()) {
      return true;
    }

    try {
      if (action === "CREATE") {
        dispatch({
          type: addressSagaActions.CREATE_ADDRESS,
          payload: {
            ...address,
            userID: user?.id || null,
            phone: addPhonePrefix(address?.phone),
            country: address?.country || "IN",
          },
        });
      } else if (action === "EDIT") {
        dispatch({
          type: addressSagaActions.EDIT_ADDRESS,
          payload: {
            ...address,
            userID: user?.id,
            phone: addPhonePrefix(address?.phone),
            country: address?.country || "IN",
          },
        });
      }
    } catch (error) {
      //   console.error("Error saving address:", error);
    } finally {
      closeModal();
    }
  };

  const handleInputChange = (field) => (e) => {
    let value = e.target.value;

    if (field === "pinCode" || field === "phone") {
      value = value.replaceAll(/[^0-9]+/g, "").trim();
    } else {
      value = value.trim();
    }

    setAddress({ ...address, [field]: value });
  };

  const handleInputBlur = (field, validationFunction) => (e) => {
    const value = e.target.value.trim();
    const res = validationFunction(value);
    setAddressErrors({
      ...addressErrors,
      [field]: res?.error ? res?.message : null,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      showMobileView
      title="Address"
      enableOutsideClick={enableOutsideClick}
    >
      <div className="mt-4">
        <form>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              value={address?.pinCode}
              maxLength={6}
              onChange={handleInputChange("pinCode")}
              onBlur={handleInputBlur("pinCode", validatePinCode)}
              required
              className="gap-1 border p-2"
              error={addressErrors?.pinCode}
              label="PinCode"
            />

            <div className="flex gap-3">
              <Input
                type="text"
                value={address?.city}
                onChange={handleInputChange("city")}
                onBlur={handleInputBlur("city", validateString)}
                required
                className="w-full gap-1 border p-2"
                error={addressErrors?.city}
                label="City"
                maxLength={20}
              />

              <Input
                type="text"
                value={address?.state}
                onChange={handleInputChange("state")}
                onBlur={handleInputBlur("state", validateString)}
                required
                className="w-full gap-1 border p-2"
                error={addressErrors?.state}
                label="State"
                maxLength={20}
              />
            </div>

            <div className="flex gap-3">
              <Input
                type="tel"
                value={address?.phone}
                maxLength={10}
                onChange={handleInputChange("phone")}
                onBlur={handleInputBlur("phone", validatePhoneNumber)}
                label="Phone"
                prefix="+91"
                required
                className="flex w-full gap-1 border p-2"
                error={addressErrors?.phone}
              />

              <Input
                type="text"
                value={address?.name}
                onChange={handleInputChange("name")}
                onBlur={handleInputBlur("name", validateString)}
                required
                className="w-full gap-1 border p-2"
                error={addressErrors?.name}
                label="Full Name"
                maxLength={30}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Input
                type="email"
                value={address?.email}
                onChange={handleInputChange("email")}
                onBlur={handleInputBlur("email", validateEmail)}
                required
                className="gap-1 border p-2"
                error={addressErrors?.email}
                label="Email"
                maxLength={20}
              />

              <Textarea
                value={address?.address}
                onChange={handleInputChange("address")}
                onBlur={handleInputBlur("address", validateString)}
                label="Street Address"
                required
                className="gap-1 border"
                textareaClassName="border-0 resize-none"
                error={addressErrors?.address}
                rows={4}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="primary"
                className="w-full gap-1 p-2 px-4 text-xl"
                onClick={(e) => {
                  handleAddressSubmit();
                }}
                loader={isLoading}
              >
                {ButtonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddressModal;

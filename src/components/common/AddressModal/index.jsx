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
    const validPinCode = address?.pinCode?.length === 6;
    const cityError = address?.city?.length > 0;
    const stateError = address?.state?.length > 0;
    const validPhone = address?.phone?.length === 10;
    const addressError = address?.address?.length > 0;
    const emailError = isEmailValid(address?.email);
    const nameError = address?.name?.length > 0;

    return (
      validPinCode &&
      cityError &&
      stateError &&
      validPhone &&
      addressError &&
      emailError &&
      nameError
    );
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
            userID: user?.id,
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      showMobileView
      title="Address"
      enableOutsideClick={enableOutsideClick}
    >
      <div className="mt-2">
        <form>
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              value={address.pinCode}
              onChange={(e) => {
                const newPinCode = (e.target.value || "")
                  .replaceAll(/[^0-9]+/g, "")
                  .trim();
                setAddress({ ...address, pinCode: newPinCode });
              }}
              onBlur={(e) => {
                const newPinCode = (e.target.value || "")
                  .replaceAll(/[^0-9]+/g, "")
                  .trim();
                setAddressErrors({
                  ...addressErrors,
                  pinCode: validatePinCode(newPinCode),
                });
              }}
              required
              className="gap-1 border p-2"
              error={addressErrors.pinCode}
              label="PinCode"
            />
            <div className="flex gap-3">
              <Input
                type="text"
                value={address.city}
                onChange={(e) => {
                  setAddress({ ...address, city: e.target.value.trim() });
                }}
                onBlur={(e) => {
                  const newCity = e.target.value.trim();
                  setAddressErrors({
                    ...addressErrors,
                    city: validateString(newCity),
                  });
                }}
                label="City"
                required
                className="gap-1 border p-2"
                error={addressErrors.city}
              />

              <Input
                type="text"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value.trim() })
                }
                onBlur={(e) => {
                  const newState = e.target.value.trim();
                  setAddressErrors({
                    ...addressErrors,
                    state: validateString(newState),
                  });
                }}
                label="State"
                required
                className="gap-1 border p-2"
                error={addressErrors.state}
              />
            </div>

            <div className="flex gap-3">
              <Input
                type="tel"
                value={address.phone}
                maxLength={10}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    phone: (e.target.value || "")
                      .replaceAll(/[^0-9]+/g, "")
                      .trim(),
                  })
                }
                onBlur={(e) => {
                  const newState = e.target.value.trim();
                  setAddressErrors({
                    ...addressErrors,
                    phone: validatePhoneNumber(newState) ? "" : "Invalid Phone",
                  });
                }}
                label="Phone"
                prefix="+91"
                required
                className="flex gap-1 border p-2"
                error={addressErrors.phone}
              />

              <Input
                type="text"
                value={address.name}
                onChange={(e) =>
                  setAddress({ ...address, name: e.target.value })
                }
                onBlur={(e) => {
                  const newState = e.target.value.trim();
                  setAddressErrors({
                    ...addressErrors,
                    name: validateString(newState),
                  });
                }}
                label="Full Name"
                required
                className="gap-1 border p-2"
                error={addressErrors.name}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Input
                type="email"
                value={address.email}
                onChange={(e) =>
                  setAddress({ ...address, email: e.target.value.trim() })
                }
                onBlur={(e) => {
                  const newState = e.target.value.trim();
                  setAddressErrors({
                    ...addressErrors,
                    email: validateEmail(newState),
                  });
                }}
                label="Email"
                required
                className="gap-1 border p-2"
                error={addressErrors.email}
              />
              <Textarea
                value={address.address}
                onChange={(e) =>
                  setAddress({ ...address, address: e.target.value })
                }
                onBlur={(e) => {
                  const newState = e.target.value.trim();
                  setAddressErrors({
                    ...addressErrors,
                    address: validateString(newState),
                  });
                }}
                label="Street Address"
                required
                className="gap-1 border"
                textareaClassName="border-0 resize-none"
                error={addressErrors.address}
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

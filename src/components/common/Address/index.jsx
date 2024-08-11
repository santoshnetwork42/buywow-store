"use client";

import { Button, Input, Text } from "@/components/elements";
import { Textarea } from "@/components/elements/Textarea";
import RemoveButton from "@/components/partials/CartDrawer/MainCartSection/ProductItem//RemoveButton";
import { addressSagaActions } from "@/store/sagas/sagaActions/address.actions";
import {
  addPhonePrefix,
  isEmailValid,
  validateEmail,
  validatePhoneNumber,
  validatePinCode,
  validateString,
} from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressModal from "../AddressModal";

const AddressListComponent = React.memo(({ currentAddress, user, item }) => {
  const dispatch = useDispatch();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("EDIT");

  useEffect(() => {
    setSelectedAddress(currentAddress?.id);
  }, [currentAddress, selectedAddress]);

  const handleAddressChange = (item) => {
    const {
      id,
      name,
      address,
      state,
      city,
      pinCode,
      phone,
      country,
      area,
      landmark,
      email,
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

  const handleAddressEdit = () => {
    setIsModalOpen(true);
    setAction("EDIT");
  };

  const deleteUserAddress = async ({ id, userID }) => {
    dispatch({
      type: addressSagaActions.DELETE_ADDRESS,
      payload: { id, userID },
    });
  };

  return (
    <div
      onClick={() => {
        handleAddressChange(item);
      }}
      className="flex max-h-60 min-h-56 min-w-72 max-w-80 flex-col justify-between gap-2 rounded-md border p-4"
    >
      <div className="flex h-full gap-2">
        <input
          type="radio"
          id={item.id}
          name="address"
          value={item.id}
          checked={selectedAddress === item.id}
          className="mt-1 cursor-pointer"
        />
        <div className="flex h-full w-full flex-col justify-between gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <Text size="xl">{item.name}</Text>
              <RemoveButton
                onClick={() =>
                  deleteUserAddress({ id: item.id, userID: user.id })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Text>{item.phone}</Text>
              <Text className="line-clamp-3 max-w-56">{item.address}</Text>
              <div className="flex gap-2">
                <Text>{item.city}</Text>
                <Text>{item.state}</Text>
                <Text>{item.pinCode}</Text>
              </div>
            </div>
          </div>
          <Button
            variant="primary"
            className="w-fit rounded-md p-2 px-4"
            onClick={handleAddressEdit}
          >
            Edit
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <AddressModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          enableOutsideClick={true}
          action={action}
          addressItem={item}
        />
      )}
    </div>
  );
});
AddressListComponent.displayName = "AddressListComponent";

const Address = ({}) => {
  const dispatch = useDispatch();

  const { user, customUser } = useSelector((state) => state.user);
  const { currentAddress, addressList, isLoading } = useSelector(
    (state) => state.address,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState(null);

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
    email: null,
    phone: "",
    address: "",
    state: "",
    city: "",
    pinCode: null,
    name: null, //store firstName and lastName if exists
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

  useEffect(() => {
    const fetchAddress = async () => {
      if (!!user && !!user.id) {
        try {
          dispatch({
            type: addressSagaActions.GET_ADDRESS_LIST,
            payload: { id: user.id },
          });
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      }
    };

    fetchAddress();
  }, [user, dispatch]);

  useEffect(() => {
    if (!addressList?.length) {
      setAction("CREATE");
    }
  }, [addressList]);

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

    dispatch({
      type: addressSagaActions.CREATE_ADDRESS,
      payload: {
        ...address,
        userID: user?.id || null,
        phone: addPhonePrefix(address?.phone),
        country: address?.country || "IN",
      },
    });

    setAddress(initialAddressState);
  };

  const handleAddNewAddress = () => {
    setIsModalOpen(true);
    setAction("CREATE");
  };

  if (!!addressList?.length) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Text size="lg">Shipping Address</Text>
          <Text size="lg" onClick={handleAddNewAddress}>
            + New Address
          </Text>
        </div>
        {isModalOpen && (
          <AddressModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            enableOutsideClick={true}
            action={action}
          />
        )}
        <div className="flex w-full gap-4 overflow-x-scroll">
          {addressList.map((item, index) => (
            <>
              <AddressListComponent
                currentAddress={currentAddress}
                user={user}
                item={item}
                key={`address-${index}`}
              />
            </>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* only visible in desktop view or above */}
      <div className="hidden flex-col gap-2 border p-3 md:flex md:w-1/2">
        <Text size="xl" className="font-medium">
          Address
        </Text>
        <form>
          <div className="flex flex-col gap-4">
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
              label="PinCode"
              required
              className="gap-1 border p-2"
              error={addressErrors.pinCode}
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
                className="w-full gap-1 border p-2"
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
                className="w-full gap-1 border p-2"
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
                className="flex w-full gap-1 border p-2"
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
                className="w-full gap-1 border p-2"
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
                className="w-full gap-2 p-2 px-4 text-xl"
                onClick={(e) => {
                  handleAddressSubmit();
                }}
                loader={isLoading}
              >
                Add Address
              </Button>
            </div>
          </div>
        </form>
      </div>
      {/* condition ends here */}

      <div className="flex flex-col gap-2">
        {!!addressList.length && (
          <div className="flex justify-between">
            <Text size="lg">Shipping Address</Text>
            <Text size="lg" onClick={handleAddNewAddress}>
              + New Address
            </Text>
          </div>
        )}

        {/* only visible in mobile view */}
        <div className="block md:hidden">
          {(isModalOpen || !addressList?.length) && (
            <AddressModal
              isOpen={isModalOpen || !addressList?.length}
              onClose={() => setIsModalOpen(false)}
              enableOutsideClick={true}
              action={action}
            />
          )}
        </div>

        {!!addressList.length && (
          <div className="flex w-full gap-4 overflow-x-scroll">
            {addressList?.map((item, index) => (
              <>
                <AddressListComponent
                  currentAddress={currentAddress}
                  user={user}
                  item={item}
                  key={`address-${index}`}
                />
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Address;

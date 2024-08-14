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
      className="flex max-h-64 min-h-56 min-w-72 max-w-80 flex-col justify-between gap-2 rounded-md border p-4"
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
          <div className="flex max-h-52 flex-col gap-2">
            <div className="flex justify-between">
              <Text size="xl" className="line-clamp-1 max-w-44">
                {item.name}
              </Text>
              <RemoveButton
                onClick={() =>
                  deleteUserAddress({ id: item.id, userID: user.id })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Text>{item.phone}</Text>
              <Text className="line-clamp-3 max-w-56">{item.address}</Text>
              <div className="flex flex-wrap gap-2">
                <Text className="line-clamp-1 max-w-44">{item.city}</Text>
                <Text className="line-clamp-1 max-w-32">{item.state}</Text>
                <Text className="line-clamp-1 max-w-32">{item.pinCode}</Text>
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
        <div className="flex justify-between rounded-md bg-blue-50 p-2">
          <Text size="lg">Shipping Address</Text>
          <Text
            size="lg"
            onClick={handleAddNewAddress}
            className="cursor-pointer"
          >
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
      </div>
    );
  }

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
    <>
      {/* only visible in desktop view or above */}
      <div className="hidden flex-col gap-2 border p-3 md:flex">
        <Text size="xl" className="font-medium">
          Address
        </Text>
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
      </div>
    </>
  );
};

export default Address;

"use client";

import { Button, Img, Input, Text } from "@/components/elements";
import { Textarea } from "@/components/elements/Textarea";
import { removeUserAddressAPI } from "@/lib/appSyncAPIs";
import { addressSagaActions } from "@/store/sagas/sagaActions/address.actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressModal from "../AddressModal";
import { addPhonePrefix, isEmailValid } from "@/utils/helpers";

const RemoveButton = React.memo(({ onClick }) => (
  <Button
    className="h-full min-h-6 rounded-md border bg-transparent px-2 sm:min-h-7 lg:min-h-8 lg:px-2.5"
    onClick={onClick}
    enableRipple={false}
  >
    <div className="aspect-[10/14] w-2.5 md:w-3">
      <Img
        src="img_thumbs_up.svg"
        width={10}
        height={14}
        className="aspect-[10/14] h-auto w-full object-contain"
      />
    </div>
  </Button>
));
RemoveButton.displayName = "RemoveButton";

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

  const [emailError, setEmailError] = useState(null);
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

    if (!!user && user?.id) {
      dispatch({
        type: addressSagaActions.CREATE_ADDRESS,
        payload: {
          ...address,
          userID: user?.id,
          phone: addPhonePrefix(address?.phone),
          country: address?.country || "IN",
        },
      });
    }

    setAddress(initialAddressState);
  };

  const handleEmailBlur = (e) => {
    const trimmedValue = e.target.value.trim();
    setAddress({ ...address, email: trimmedValue });

    if (!isEmailValid(trimmedValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
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
    <div className="md:w-1/2">
      <form>
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            value={address.pinCode}
            onChange={(e) =>
              setAddress({
                ...address,
                pinCode: (e.target.value || "")
                  .replaceAll(/[^0-9]+/g, "")
                  .trim(),
              })
            }
            placeholder="PinCode"
            required
            className="gap-1 border p-2"
            label="PinCode"
          />
          <div className="flex gap-2">
            <Input
              type="text"
              value={address.city}
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value.trim() })
              }
              placeholder="City"
              required
              className="gap-1 border p-2"
              label="City"
            />

            <Input
              type="text"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value.trim() })
              }
              placeholder="State"
              required
              className="gap-1 border p-2"
              label="State"
            />
          </div>

          <div className="flex gap-2">
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
              placeholder="99XXXXXX00"
              prefix="+91"
              required
              className="flex gap-1 border p-2"
              label="Phone.No"
              pattern="^[6-9]\d{9}$"
            />

            <Input
              type="text"
              value={address.name}
              onChange={(e) => {
                setAddress({ ...address, name: e.target.value });
              }}
              placeholder="Full Name"
              required
              className="gap-1 border p-2"
              label="Name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              type="email"
              value={address.email}
              onChange={(e) =>
                setAddress({ ...address, email: e.target.value.trim() })
              }
              onBlur={(e) => handleEmailBlur(e)}
              placeholder="xyz@buywow.in"
              required
              className="gap-1 border p-2"
              label="Email"
            />

            <Textarea
              value={address.address}
              placeholder="House number and street name"
              required
              className="flex gap-1 border p-2"
              textareaClassName="w-full resize-none"
              label="Address"
              rows={4}
              onChange={(e) =>
                setAddress({ ...address, address: e.target.value })
              }
              onBlur={(e) =>
                setAddress({ ...address, address: e.target.value.trim() })
              }
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
  );
};

export default Address;

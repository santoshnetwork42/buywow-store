"use client";

import { Button, Text } from "@/components/elements";
import RemoveButton from "@/components/partials/CartDrawer/MainCartSection/ProductItem//RemoveButton";
import { addressSagaActions } from "@/store/sagas/sagaActions/address.actions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddressModal from "../AddressModal";

export const AddressListComponent = React.memo(
  ({ currentAddress, user, item }) => {
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
  },
);
AddressListComponent.displayName = "AddressListComponent";

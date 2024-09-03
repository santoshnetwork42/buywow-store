"use client";

import { Button, Text } from "@/components/elements";
import RemoveButton from "@/components/partials/CartDrawer/MainCartSection/ProductItem/RemoveButton";
import { useAddressDispatch } from "@/store/sagas/dispatch/address.dispatch";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useCartTotal } from "@wow-star/utils";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddressModal from "../AddressModal";

const AddressList = React.memo(({ addressList, variant }) => {
  const currentAddress = useSelector((state) => state.address?.currentAddress);
  const user = useSelector((state) => state.user?.user);
  const { updateCurrentAddress, deleteAddress } = useAddressDispatch();

  const { addressSelected } = useEventsDispatch();
  const { totalPrice } = useCartTotal({
    paymentType: "PREPAID",
    isRewardApplied: false,
  });

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    setSelectedAddressId(currentAddress?.id);
    if (currentAddress?.id)
      addressSelected(currentAddress, totalPrice, "BUYWOW");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress]);

  const handleAddressDelete = useCallback(
    (addressId) => {
      deleteAddress(addressId, user.id);

      if (addressId === selectedAddressId) {
        const remainingAddresses = addressList.filter(
          (addr) => addr.id !== addressId,
        );
        if (remainingAddresses.length > 0) {
          const newSelectedAddress = remainingAddresses[0];
          setSelectedAddressId(newSelectedAddress.id);
          updateCurrentAddress(newSelectedAddress);
        } else {
          setSelectedAddressId(null);
          updateCurrentAddress(null);
        }
      }
    },
    [
      addressList,
      selectedAddressId,
      deleteAddress,
      user.id,
      updateCurrentAddress,
    ],
  );

  return (
    <div className="flex-1 overflow-x-scroll">
      <div className="flex w-max gap-3">
        {Array.isArray(addressList) &&
          addressList.map((item, index) => (
            <AddressListComponent
              key={`address-${index}`}
              address={item}
              isSelected={selectedAddressId === item.id}
              onSelect={() => {
                setSelectedAddressId(item.id);
                updateCurrentAddress(item);
              }}
              onDelete={() => handleAddressDelete(item.id)}
              variant={variant}
            />
          ))}
      </div>
    </div>
  );
});

const AddressListComponent = React.memo(
  ({ address, isSelected, onSelect, onDelete, variant }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddressEdit = useCallback((e) => {
      e.stopPropagation();
      setIsModalOpen(true);
    }, []);

    const handleDelete = useCallback(
      (e) => {
        e.stopPropagation();
        onDelete();
      },
      [onDelete],
    );

    return (
      <div
        onClick={onSelect}
        className={`flex cursor-pointer rounded-md border p-2 shadow-sm sm:p-3 lg:p-4 ${variant === "CHECKOUT" ? "w-64 sm:w-72 lg:w-80" : "w-72 sm:w-80 lg:w-96"}`}
      >
        <div className="flex w-full gap-2 md:gap-3">
          <input
            type="radio"
            id={address.id}
            name="address"
            value={address.id}
            checked={isSelected}
            onChange={onSelect}
            className="mt-1.5 cursor-pointer checked:bg-yellow-900 focus:border focus:border-gray-500 focus:checked:bg-yellow-900"
          />
          <div className="flex flex-1 flex-col justify-between gap-4">
            <div className="flex flex-1 flex-col gap-2 md:gap-3">
              <div className="flex items-center justify-between gap-2">
                <Text
                  size="xl"
                  as="span"
                  className="line-clamp-1 uppercase"
                  responsive
                >
                  {address.name}
                </Text>
                <RemoveButton onClick={handleDelete} />
              </div>
              <div className="flex flex-col gap-1">
                <Text as="span" size="base" className="text-sm" responsive>
                  {address.phone}
                </Text>
                <Text as="span" size="base" className="text-sm" responsive>
                  {address.address}
                </Text>
                <div className="flex flex-wrap gap-1">
                  <Text as="span" size="base" className="text-sm" responsive>
                    {address.city},
                  </Text>
                  <Text as="span" size="base" className="text-sm" responsive>
                    {address.state},
                  </Text>
                  <Text as="span" size="base" className="text-sm" responsive>
                    {address.pinCode}
                  </Text>
                </div>
              </div>
            </div>
            <Button
              variant="primary"
              size="medium"
              className="w-fit rounded-md py-1.5"
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
            action="EDIT"
            addressItem={address}
          />
        )}
      </div>
    );
  },
);

AddressListComponent.displayName = "AddressListComponent";
AddressList.displayName = "AddressList";

export default AddressList;

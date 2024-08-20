"use client";

import { Button, Heading, Text } from "@/components/elements";
import { addressSagaActions } from "@/store/sagas/sagaActions/address.actions";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";
import AddressModal from "./AddressModal";

const AddressSection = React.memo(({ variant }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { addressList } = useSelector((state) => state.address);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState(null);

  useEffect(() => {
    if (user?.id) {
      dispatch({
        type: addressSagaActions.GET_ADDRESS_LIST,
        payload: { id: user.id },
      });
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (Array.isArray(addressList) && addressList.length === 0) {
      setAction("CREATE");
    }
  }, [addressList]);

  const handleAddNewAddress = useCallback(() => {
    setIsModalOpen(true);
    setAction("CREATE");
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-2">
      <div
        className={`flex items-center justify-between ${variant === "CHECKOUT" && "rounded-md bg-blue-50 px-4 py-1.5"}`}
      >
        <Heading
          as="h3"
          size={variant === "CHECKOUT" ? "xl" : "2xl"}
          responsive
        >
          Address
        </Heading>
        {addressList?.length > 0 && (
          <Button
            variant={variant === "CHECKOUT" ? "none" : "outlined"}
            size={variant === "CHECKOUT" ? "small" : "medium"}
            onClick={handleAddNewAddress}
            className={
              variant === "CHECKOUT" ? "rounded-none px-0 underline" : ""
            }
          >
            + New Address
          </Button>
        )}
      </div>

      {addressList?.length > 0 ? (
        <>
          <AddressList addressList={addressList} />
          {isModalOpen && (
            <AddressModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              enableOutsideClick={true}
              action={action}
            />
          )}
        </>
      ) : (
        <AddressForm />
      )}
      {variant !== "CHECKOUT" && (
        <Text as="p" size="sm" className="mt-2">
          The following addresses can be used on the checkout page.
        </Text>
      )}
    </div>
  );
});

AddressSection.displayName = "AddressSection";

export default AddressSection;

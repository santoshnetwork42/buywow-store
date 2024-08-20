"use client";

import { Button, Heading, Text } from "@/components/elements";
import { addressSagaActions } from "@/store/sagas/sagaActions/address.actions";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressList from "../AddressList";
import AddressModal from "../AddressModal";
import AddressForm from "./AddressForm";

const AccountAddressSection = React.memo(({ variant = "CARD" }) => {
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

  console.log("addressList", addressList);

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex justify-between">
        <Heading as="h3" size="2xl" responsive>
          Address
        </Heading>
        {addressList?.length > 0 && (
          <Button
            variant="outlined"
            size="medium"
            onClick={handleAddNewAddress}
            className="cursor-pointer"
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

AccountAddressSection.displayName = "AccountAddressSection";

export default AccountAddressSection;

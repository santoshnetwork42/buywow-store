"use client";

import { Button, Heading, Text } from "@/components/elements";
import AddressForm from "@/components/partials/Account/AddressSection/AddressForm";
import AddressList from "@/components/partials/Account/AddressSection/AddressList";
import AddressModal from "@/components/partials/Account/AddressSection/AddressModal";
import { useAddressDispatch } from "@/store/sagas/dispatch/address.dispatch";
import useWindowDimensions from "@/utils/helpers/getWindowDimension";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddressSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-10 w-full rounded-md bg-gray-200"></div>
    <div className="h-40 w-full rounded-md bg-gray-200"></div>
    <div className="h-4 w-1/2 rounded bg-gray-200"></div>
  </div>
);

const AddressSection = React.memo(({ variant }) => {
  const { getAddressList } = useAddressDispatch();
  const user = useSelector((state) => state.user?.user);
  const addressState = useSelector((state) => state.address);
  const { addressList, initialLoading } = addressState;

  const { isSmallSize: isMobile, isMidSize: isTab } = useWindowDimensions();
  const [isModalOpen, setIsModalOpen] = useState(
    isMobile || isTab ? !addressList.length : false,
  );

  useEffect(() => {
    if (user?.id) {
      getAddressList(user?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setIsModalOpen(
      isMobile || isTab ? !addressState?.addressList?.length : false,
    );
  }, [addressState, isMobile, isTab]);

  const handleAddNewAddress = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (initialLoading) {
    return <AddressSkeleton />;
  }

  return (
    <div
      className={`flex w-full flex-col py-1 ${variant === "CHECKOUT" ? "gap-3 md:gap-4" : "gap-4"}`}
    >
      <div
        className={`flex min-h-10 items-center justify-between rounded-md bg-blue-50 px-4 py-1.5 md:min-h-11`}
      >
        <Heading as="h3" size="xl" className="font-medium" responsive>
          Address
        </Heading>
        {(addressList?.length > 0 || variant === "CHECKOUT") && (
          <Button
            variant="none"
            size="small"
            onClick={handleAddNewAddress}
            className={`rounded-none underline ${addressList?.length === 0 ? "md:hidden" : ""}`}
          >
            + New Address
          </Button>
        )}
      </div>
 
      {addressList?.length > 0 ? (
        <>
          <AddressList addressList={addressList} variant={variant} />
          {isModalOpen && (
            <AddressModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              enableOutsideClick={true}
              action="CREATE"
            />
          )}
        </>
      ) : (
        <>
          <AddressForm
            className={variant === "CHECKOUT" ? "hidden md:flex" : ""}
          />
          {isModalOpen && (
            <AddressModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              enableOutsideClick={!!addressList?.length}
              enableCloseButton={!!addressList?.length}
              action="CREATE"
            />
          )}
        </>
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

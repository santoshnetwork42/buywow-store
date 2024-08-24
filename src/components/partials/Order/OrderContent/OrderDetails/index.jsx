import Checkmark from "@/assets/svg/icons";
import { Heading, Text } from "@/components/elements";
import { formateDate } from "@/utils/helpers";
import React from "react";

const DetailRow = React.memo(
  ({ label, value, valueClassName = "", showBorder = true }) => (
    <>
      <div className="flex justify-between">
        <Text as="span" size="base" className="text-sm" responsive>
          {label}
        </Text>
        <Text
          as="span"
          size="base"
          className={`text-sm text-gray-600 ${valueClassName}`}
          responsive
        >
          {value}
        </Text>
      </div>
      {showBorder && <div className="border-b" />}
    </>
  ),
);

DetailRow.displayName = "DetailRow";

const OrderDetails = React.memo(
  ({ code, status, paymentType, createdAt, shippingAddress }) => {
    return (
      <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
        <div className="flex items-center justify-between">
          <Heading as="h3" size="xl" className="text-lg font-medium" responsive>
            ORDER DETAILS
          </Heading>
          <Text
            as="span"
            size="base"
            className="flex items-center gap-1 text-green-600"
            responsive
          >
            <Checkmark className="size-3.5 sm:size-4 lg:size-5" />
            Thank you. Your order is confirmed.
          </Text>
        </div>
        <div className="flex flex-col gap-3 rounded-md border p-4 md:gap-4 md:p-5">
          <DetailRow label="Order number:" value={`#${code || ""}`} />
          <DetailRow
            label="Status:"
            value={status || ""}
            valueClassName={status === "CONFIRMED" && "text-green-600"}
          />
          <DetailRow
            label="Payment method:"
            value={paymentType === "PREPAID" ? "Online" : "Cash on delivery"}
          />
          <DetailRow
            label="Date:"
            value={formateDate(createdAt) || ""}
            showBorder={shippingAddress ? true : false}
          />
          {!!shippingAddress && (
            <DetailRow
              label="Shipping address:"
              value={
                [
                  shippingAddress?.address,
                  shippingAddress?.location,
                  shippingAddress?.city,
                  shippingAddress?.formattedState,
                  shippingAddress?.country,
                  shippingAddress?.pinCode,
                ]
                  .filter(Boolean)
                  .join(", ") || ""
              }
              showBorder={false}
            />
          )}
        </div>
      </div>
    );
  },
);

OrderDetails.displayName = "OrderDetails";

export default OrderDetails;

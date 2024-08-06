import React from "react";
import { Text } from "@/components/elements";
import { formateDate } from "@/utils/helpers";

const OrderDetails = ({ code, status, paymentType, createdAt }) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <Text size="lg">ORDER DETAILS</Text>
      <Text size="md" className="text-end text-green-600">
        Thank you. Your order is confirmed.
      </Text>
    </div>
    <div className="flex flex-col gap-4 rounded-md border p-5">
      <DetailRow label="Order number:" value={`#${code}`} />
      <div className="border-b"></div>
      <DetailRow
        label="Status:"
        value={status}
        valueClassName="text-green-600"
      />
      <div className="border-b"></div>
      <DetailRow
        label="Payment method:"
        value={paymentType === "PREPAID" ? "Online" : "Cash on delivery"}
      />
      <div className="border-b"></div>
      <DetailRow label="Date:" value={formateDate(createdAt)} />
    </div>
  </div>
);

const DetailRow = ({ label, value, valueClassName = "" }) => (
  <div className="flex justify-between">
    <Text>{label}</Text>
    <Text className={valueClassName}>{value}</Text>
  </div>
);

export default OrderDetails;

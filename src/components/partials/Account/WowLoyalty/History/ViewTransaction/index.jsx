import { Heading, Text } from "@/components/elements";
import { toDecimal } from "@/utils/helpers";
import {
  getEventDescription,
  getEventTitle,
  getExpireLabel,
} from "@/utils/helpers/account";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const DebitIcon = dynamic(() => import("@/src/assets/svg/debitIcon"));
const CreditIcon = dynamic(() => import("@/src/assets/svg/creditIcon"));
const PendingLockIcon = dynamic(
  () => import("@/src/assets/svg/pendingLockIcon"),
);

const ViewTransaction = React.memo(({ data }) => {
  if (!data) return null;

  const {
    event,
    transactionState,
    amount,
    expiresAt,
    status,
    reason,
    metadata,
  } = data;

  const { orderCode = "", orderId = "" } = metadata ? JSON.parse(metadata) : {};

  return (
    <div
      className={`flex items-center gap-3 md:gap-4 ${
        status === "PENDING" ? "bg-gray-100" : "bg-white"
      } rounded-md p-3 shadow md:p-4`}
    >
      {transactionState === "CREDIT" ? (
        <CreditIcon size={36} color="none" />
      ) : (
        <DebitIcon size={36} color="none" />
      )}

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between">
          <Heading as="h4" size="base" className="text-gray-800">
            {getEventTitle(event)}
          </Heading>
          <Heading
            as="h5"
            size="sm"
            className={`${
              transactionState === "CREDIT" ? "text-green-500" : "text-red-400"
            }`}
          >
            {transactionState === "CREDIT" ? "+" : "-"}₹{toDecimal(amount)}
          </Heading>
        </div>
        <div className="flex items-center justify-between">
          <Text as="span" size="xs" className="text-gray-600">
            {getEventDescription(event, reason)}
            {!!orderCode && (
              <Link
                prefetch={false}
                href={`/order/${orderId}`}
                className="ml-1 text-blue-500 hover:underline"
              >
                #{orderCode}
              </Link>
            )}
          </Text>
          {status === "PENDING" ? (
            <div className="flex items-center">
              <PendingLockIcon />
            </div>
          ) : (
            !!expiresAt && (
              <Text as="span" size="sm">
                {getExpireLabel(expiresAt)}
              </Text>
            )
          )}
        </div>
      </div>
    </div>
  );
});

ViewTransaction.displayName = "ViewTransaction";

export default ViewTransaction;

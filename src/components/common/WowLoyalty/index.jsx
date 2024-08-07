"use client";

import { Heading, Text } from "@/components/elements";
import { getLoyaltyAPI } from "@/lib/appSyncAPIs";
import {
  CreditIcon,
  DebitIcon,
  EllipsisIcon,
  PendingLockIcon,
  WalletIcon,
} from "@/src/assets/svg/icons"; // Assume these icons exist
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const WowLoyalty = ({}) => {
  const { user } = useSelector((state) => state.user);
  const [wowCash, setWowCash] = useState({
    transactions: [],
    totalAllotted: 0,
    totalUsed: 0,
    totalUsable: 0,
    totalExpired: 0,
  });

  useEffect(() => {
    const fetchLoyalty = async () => {
      try {
        const { data } = await getLoyaltyAPI({ user });

        setWowCash({
          ...data?.getLoyalty,
          transactions: data?.getLoyalty?.transactions?.filter(
            (item) => item?.status !== "CANCELLED",
          ),
        });
      } catch (error) {
        console.error("Error fetching loyalty data:", error);
      }
    };

    if (user) fetchLoyalty();
  }, [user]);

  const eventTitle = (eventType) => {
    const eventTitles = {
      CREDIT_PREPAID_ORDER: "Cashback added",
      CREDIT_COD_ORDER: "Cashback added",
      CREDIT_USER_SIGNUP: "Cashback added",
      DEBIT_PREPAID_ORDER: "Cashback debited",
      DEBIT_COD_ORDER: "Cashback debited",
      DEBIT_EXPIRED: "Cashback expired",
      DEBIT_BY_ADMIN: "Cashback debited",
      CREDIT_BY_ADMIN: "Promotional cashback",
      CREDIT_ORDER_REFUNDED: "Cashback added",
      CREDIT_BY_MOENGAGE: "Promotional cashback",
    };
    return eventTitles[eventType] || "";
  };

  const expireLabel = (date) => {
    const days = dayjs(date).diff(dayjs(), "days");
    if (days > 0 && days < 7) return `Expires in ${days} day(s)`;
    if (days > 0) return `Expires on ${dayjs(date).format("DD MMM YYYY")}`;
    if (days === 0) return `Expires today`;
    if (dayjs(date).valueOf() <= dayjs().valueOf())
      return `Expired on ${dayjs(date).format("DD MMM")}`;
  };

  const eventDescription = (eventType, reason) => {
    const eventTitles = {
      CREDIT_PREPAID_ORDER: "Cashback for Order",
      CREDIT_COD_ORDER: "Cashback for Order",
      CREDIT_USER_SIGNUP: "Joining Bonus",
      DEBIT_PREPAID_ORDER: "Used against Order",
      DEBIT_COD_ORDER: "Used against Order",
      DEBIT_BY_ADMIN: reason || "",
      CREDIT_BY_ADMIN: reason || "",
      CREDIT_ORDER_REFUNDED: "Refunded against Order",
      CREDIT_BY_MOENGAGE: reason || "",
      DEBIT_BY_MOENGAGE: reason || "",
    };
    return eventTitles[eventType] || "";
  };

  const ViewTransaction = ({ data }) => {
    const {
      event,
      transactionState,
      amount,
      expiresAt,
      status,
      reason,
      metadata,
    } = data || {};
    const { orderCode = "", orderId = "" } = metadata
      ? JSON.parse(metadata)
      : {};

    return (
      <div
        className={`flex items-center ${status === "PENDING" ? "bg-gray-100" : "bg-white"} rounded-lg p-4 shadow`}
      >
        <div className="mr-4">
          {transactionState === "CREDIT" ? (
            <CreditIcon size={36} color="none" />
          ) : (
            <DebitIcon size={36} color="none" />
          )}
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <Text className="font-semibold text-gray-800">
              {eventTitle(event)}
            </Text>
            <Text
              size="sm"
              className={`font-medium ${transactionState === "CREDIT" ? "text-green-500" : "text-red-400"}`}
            >
              {transactionState === "CREDIT" ? "+" : "-"}₹{amount?.toFixed(2)}
            </Text>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-gray-600">
            <Text size="xs">
              {eventDescription(event, reason)}
              {orderCode && (
                <Link
                  href={`/order/${orderId}`}
                  className="ml-1 text-blue-500 hover:underline"
                >
                  #{orderCode}
                </Link>
              )}
            </Text>
            {status === "PENDING" ? (
              <div className="flex items-center">
                <PendingLockIcon className="mr-1 h-4 w-4 bg-gray-100" />
              </div>
            ) : (
              expiresAt && <Text size="sm">{expireLabel(expiresAt)}</Text>
            )}
          </div>
        </div>
      </div>
    );
  };

  const History = ({ Transaction }) => {
    const { data, title } = Transaction;

    return (
      <div>
        <Text className="mb-2 font-semibold" size="sm">
          {title}
        </Text>
        <div className="space-y-4">
          {data?.map((transaction, index) => (
            <ViewTransaction key={index} data={transaction} />
          ))}
        </div>
      </div>
    );
  };

  const { transactions, totalAllotted, totalUsed, totalUsable } = wowCash;

  const groupedTransactions = useMemo(() => {
    if (transactions) {
      const sortedTransactions = [...transactions].sort((a, b) =>
        dayjs(b.createdAt).diff(dayjs(a.createdAt)),
      );
      return sortedTransactions.reduce((result, transaction) => {
        const createdAtDate = dayjs(transaction.createdAt).format(
          "DD MMM, YYYY",
        );
        const existingGroup = result.find(
          (group) => group.title === createdAtDate,
        );

        if (existingGroup) {
          existingGroup.data.push(transaction);
        } else {
          result.push({ title: createdAtDate, data: [transaction] });
        }

        return result;
      }, []);
    }
    return [];
  }, [transactions]);

  return (
    <div className="mx-auto max-w-2xl p-4">
      <div
        className="bg-white mb-4 rounded-lg p-6 shadow-md"
        style={{
          background: "linear-gradient(258deg, #d89979 3.32%, #e5cfaf 48.97%)",
        }}
      >
        <div className="mb-4 flex flex-col items-center gap-2">
          <Heading size="2xl">WOW Cash</Heading>
          <div className="flex w-full items-end justify-between gap-2">
            <div className="text-center">
              <Heading className="mb-2 flex items-center justify-center text-lg">
                Available Balance
                <div className="group relative ml-1">
                  <EllipsisIcon className="h-4 w-4 cursor-help text-gray-500" />
                  <Text className="text-white absolute -mt-2 ml-2 hidden w-32 rounded bg-gray-200 p-2 text-xs group-hover:block">
                    This section talks about the terms and rules of the
                    cashback.
                  </Text>
                </div>
              </Heading>
              <Text className="mb-2 font-bold text-green-600" size="3xl">
                ₹{totalUsable > 0 ? totalUsable.toFixed(2) : "0.00"}
              </Text>
              <Text size="sm" className="text-gray-600">
                Cashback applies automatically
              </Text>
            </div>
            <WalletIcon size={100} className="ml-2 h-6 w-6 text-blue-500" />
          </div>
        </div>
      </div>
      <div className="mb-6 flex justify-between rounded-lg bg-gray-100 p-4 text-sm">
        <Text size="sm">
          Total cashback earned: ₹{totalAllotted?.toFixed(2)}
        </Text>
        <Text size="sm">Cashback redeemed: ₹{totalUsed?.toFixed(2)}</Text>
      </div>
      <div>
        <Heading className="mb-4">RECENT HISTORY</Heading>
        <div className="space-y-6">
          {groupedTransactions?.map((Transaction, index) => (
            <History Transaction={Transaction} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WowLoyalty;

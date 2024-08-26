"use client";

import { Heading, Text } from "@/components/elements";
import { getLoyaltyAPI } from "@/lib/appSyncAPIs";
import { EllipsisIcon, WalletIcon } from "@/src/assets/svg/icons";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import History from "./History";
import WowLoyaltySkeleton from "./WowLoyaltySkeleton";

const INITIAL_WOW_CASH_STATE = {
  transactions: [],
  totalAllotted: 0,
  totalUsed: 0,
  totalUsable: 0,
  totalExpired: 0,
};

const WowLoyalty = React.memo(() => {
  const user = useSelector((state) => state.user?.user);
  const [wowCash, setWowCash] = useState(INITIAL_WOW_CASH_STATE);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLoyalty = useCallback(async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const { data } = await getLoyaltyAPI({ userId: user?.id });
      if (data?.getLoyalty) {
        setWowCash({
          ...data.getLoyalty,
          transactions:
            data.getLoyalty.transactions?.filter(
              (item) => item?.status !== "CANCELLED",
            ) || [],
        });
      }
    } catch (error) {
      console.error("Error fetching loyalty data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLoyalty();
  }, [fetchLoyalty]);

  const groupedTransactions = useMemo(() => {
    if (!wowCash.transactions || wowCash.transactions.length === 0) return [];

    return wowCash.transactions
      .sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)))
      .reduce((result, transaction) => {
        const createdAtDate = dayjs(transaction.createdAt).format(
          "DD MMM, YYYY",
        );
        const existingGroup = result.find(
          (group) => group.title === createdAtDate,
        );

        if (existingGroup) {
          existingGroup.transactions.push(transaction);
        } else {
          result.push({ title: createdAtDate, transactions: [transaction] });
        }

        return result;
      }, []);
  }, [wowCash.transactions]);

  const { totalAllotted, totalUsed, totalUsable } = wowCash;

  if (isLoading) {
    return <WowLoyaltySkeleton />;
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-1">
      <div className="flex flex-col overflow-hidden rounded-md shadow-sm">
        <div
          className="relative flex flex-col gap-4 p-4 md:gap-5"
          style={{
            background:
              "linear-gradient(258deg, #d89979 3.32%, #e5cfaf 48.97%)",
          }}
        >
          <Heading as="h3" size="2xl" className="w-full text-center" responsive>
            WOW Cash
          </Heading>
          <div className="flex flex-col gap-1 md:gap-1.5">
            <Text
              as="span"
              size="base"
              className="flex items-center gap-1 text-sm"
              responsive
            >
              Available Balance
              <div className="group relative mt-0.5">
                <EllipsisIcon className="size-3 cursor-help" />
                <Text
                  as="p"
                  size="xs"
                  className="absolute left-2.5 top-2.5 hidden w-40 rounded bg-black-900 p-2 font-light text-white-a700 group-hover:block"
                >
                  This section talks about the terms and rules of the cashback.
                </Text>
              </div>
            </Text>
            <Heading as="h3" size="2xl" className="text-green-600" responsive>
              ₹{totalUsable > 0 ? totalUsable.toFixed(2) : "0.00"}
            </Heading>
            <Text as="span" size="sm" className="text-gray-600" responsive>
              Cashback applies automatically
            </Text>
          </div>
          <WalletIcon
            size={100}
            className="absolute right-0 top-0 h-full sm:right-[2%] md:right-[4%] lg:right-[6%]"
          />
        </div>

        <div className="flex justify-between gap-5 bg-gray-100 px-4 py-3 md:p-4">
          <Text as="span" size="sm" responsive>
            Total cashback earned: ₹{totalAllotted?.toFixed(2) || "0.00"}
          </Text>
          <Text as="span" size="sm" responsive>
            Cashback redeemed: ₹{totalUsed?.toFixed(2) || "0.00"}
          </Text>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 md:gap-4">
        <Heading as="h3" size="lg">
          RECENT HISTORY
        </Heading>
        <div className="space-y-5 md:space-y-6">
          {groupedTransactions.map((group, index) => (
            <History
              key={index}
              transactions={group.transactions}
              title={group.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

WowLoyalty.displayName = "WowLoyalty";

export default WowLoyalty;

"use client";

import { Text } from "@/components/elements";
import TokenPagination from "@/components/features/TokenPagination";
import { STORE_ID } from "@/config";
import { searchOrders } from "@/graphql/appSync/api";
import { errorHandler } from "@/utils/errorHandler";
import { generateClient } from "aws-amplify/api";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import OrderListHeader from "./OrderListHeader";
import OrderRow from "./OrderRow";
import OrderSkeleton from "./OrderSkeleton";

const client = generateClient();

const OrderList = React.memo(() => {
  const { user } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const perPage = 4;

  const getOrders = useCallback(
    async (reset = false) => {
      if (!user?.id || !client) return;

      setIsLoading(true);
      try {
        const { data } = await client.graphql({
          query: searchOrders,
          variables: {
            filter: {
              userId: { eq: user.id },
              storeId: { eq: STORE_ID },
              status: { ne: "PENDING" },
            },
            sort: [{ field: "orderDate", direction: "desc" }],
            limit: perPage,
            nextToken: reset ? null : token,
          },
          authMode: "userPool",
        });

        const { items, total, nextToken } = data.searchOrders;
        const filteredItems = items.filter(
          ({ status }) => status !== "TIMEDOUT",
        );

        setOrders((prev) =>
          reset ? filteredItems : [...prev, ...filteredItems],
        );
        setTotalOrder(total);
        setToken(nextToken);
      } catch (error) {
        errorHandler(error);
      } finally {
        setIsLoading(false);
      }
    },
    [user, token],
  );

  useEffect(() => {
    if (user) {
      getOrders(true);
    }
  }, [user, getOrders]);

  const memoizedOrders = useMemo(
    () => orders.map((order) => <OrderRow key={order.id} order={order} />),
    [orders],
  );

  const skeletons = useMemo(
    () =>
      Array(perPage)
        .fill()
        .map((_, index) => <OrderSkeleton key={index} />),
    [perPage],
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="container-main overflow-hidden rounded-md border shadow-sm">
        <div className="mb-4 grid grid-cols-1 gap-1 sm:gap-2 md:gap-0">
          <OrderListHeader />
          {isLoading && orders.length === 0 ? skeletons : memoizedOrders}
        </div>
        <TokenPagination
          onPage={() => getOrders(false)}
          total={totalOrder}
          loaded={orders?.length}
          nextToken={token}
          content="orders"
        />
      </div>
      <Text as="p" size="sm">
        For order history, please write to us @{" "}
        <Link href="mailto:support@buywow.in" className="text-blue-600">
          support@buywow.in
        </Link>{" "}
        with your order id and mobile number. Track your order{" "}
        <Link href="https://track.buywow.in/" className="text-blue-600">
          here
        </Link>
        .
      </Text>
    </div>
  );
});

OrderList.displayName = "OrderList";

export default OrderList;

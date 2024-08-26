"use client";

import TokenPagination from "@/components/features/TokenPagination";
import { STORE_ID } from "@/config";
import { searchOrders } from "@/graphql/appSync/api";
import { errorHandler } from "@/utils/errorHandler";
import { generateClient } from "aws-amplify/api";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import OrderListHeader from "./OrderListHeader";
import OrderRow from "./OrderRow";
import OrderSkeleton from "./OrderSkeleton";

const client = generateClient();

const OrderList = React.memo(() => {
  const user = useSelector((state) => state.user?.user);
  const [orders, setOrders] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const perPage = 10;

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
              and: [
                { status: { ne: "TIMEDOUT" } },
                { status: { ne: "PENDING" } },
              ],
            },
            sort: [{ field: "orderDate", direction: "desc" }],
            limit: perPage,
            nextToken: reset ? null : token,
          },
          authMode: "userPool",
        });

        const { items, total, nextToken } = data.searchOrders;
        setOrders((prev) => (reset ? items : [...prev, ...items]));
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
    if (user?.id) {
      getOrders(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
    <>
      <div className="mb-4 grid grid-cols-1">
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
    </>
  );
});

OrderList.displayName = "OrderList";

export default OrderList;

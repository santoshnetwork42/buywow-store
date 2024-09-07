"use client";

import { Text } from "@/components/elements";
import TokenPagination from "@/components/features/TokenPagination";
import { getOrdersAPI } from "@/lib/appSyncAPIs";
import { errorHandler } from "@/utils/errorHandler";
import { generateClient } from "aws-amplify/api";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import OrderListHeader from "@/components/partials/Account/OrderSection/OrderList/OrderListHeader";
import OrderRow from "@/components/partials/Account/OrderSection/OrderList/OrderRow";
import OrderSkeleton from "@/components/partials/Account/OrderSection/OrderList/OrderSkeleton";

const client = generateClient();

const OrderList = React.memo(() => {
  const user = useSelector((state) => state.user?.user);
  const [orders, setOrders] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const perPage = 10;

  const getOrders = useCallback(
    async (reset = false) => {
      if (!user?.id || !client) return;

      setIsLoading(true);
      try {
        const result = await getOrdersAPI(
          user.id,
          reset ? null : token,
          perPage,
        );

        if (result) {
          const { items, total, nextToken } = result;
          setOrders((prev) => (reset ? items : [...prev, ...items]));
          setTotalOrder(total);
          setToken(nextToken);
        }
      } catch (error) {
        errorHandler(error);
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
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

  const renderContent = () => {
    if (isLoading && isInitialLoad) {
      return skeletons;
    }
    if (orders.length === 0 && !isLoading) {
      return (
        <div className="flex h-40 items-center justify-center">
          <Text
            as="p"
            size="lg"
            className="text-center text-base text-gray-600/80"
            responsive
          >
            No orders placed yet. Start shopping to see your orders here!
          </Text>
        </div>
      );
    }
    return memoizedOrders;
  };

  return (
    <>
      <div className="mb-4 grid grid-cols-1">
        <OrderListHeader />
        {renderContent()}
      </div>
      {orders.length > 0 && (
        <TokenPagination
          onPage={() => getOrders(false)}
          total={totalOrder}
          loaded={orders?.length}
          nextToken={token}
          content="orders"
        />
      )}
    </>
  );
});

OrderList.displayName = "OrderList";

export default OrderList;

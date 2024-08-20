// app/account/orders/OrderList.js
"use client";

import { Heading, Text } from "@/components/elements";
import TokenPagination from "@/components/features/TokenPagination";
import { STORE_ID } from "@/config";
import { searchOrders } from "@/graphql/appSync/api";
import { errorHandler } from "@/utils/errorHandler";
import { formateDate, orderStatusBadge, toDecimal } from "@/utils/helpers";
import { generateClient } from "aws-amplify/api";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const client = generateClient();

export default function OrderList() {
  const { user } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [token, setToken] = useState(null);
  const perPage = 10;

  const getOrders = useCallback(
    async (reset = false) => {
      if (!!user && user.id && client) {
        try {
          const { data } = await client.graphql({
            query: searchOrders,
            variables: {
              filter: {
                userId: { eq: user?.id },
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
        }
      }
    },
    [user, orders, token],
  );

  useEffect(() => {
    if (user) {
      getOrders(true);
    }
  }, []);

  return (
    <div className="container-main">
      <div className="mb-4 grid grid-cols-1 gap-1 sm:gap-2 md:gap-0">
        <div className="hidden gap-2 bg-gray-100 shadow-[0_0_0_100vmax_#f2f4f1] [clipPath:inset(0_-100vmax)] md:grid md:grid-cols-[23%_36%_20%_auto] md:py-2.5 lg:py-3">
          <Heading as="h4" size="base" className="font-semibold" responsive>
            Order
          </Heading>
          <Heading as="h4" size="base" className="font-semibold" responsive>
            Date
          </Heading>
          <Heading as="h4" size="base" className="font-semibold" responsive>
            Status
          </Heading>
          <Heading as="h4" size="base" className="font-semibold" responsive>
            Total
          </Heading>
        </div>
        {orders?.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))}
      </div>

      <TokenPagination
        onPage={() => getOrders(false)}
        total={totalOrder}
        loaded={orders?.length}
        nextToken={token}
        content="orders"
      />
    </div>
  );
}

function OrderRow({ order }) {
  const badgeStyle = {
    color: orderStatusBadge[order.status]?.color || "#0000ff",
  };

  return (
    <Link href={`/order/${order.id}`}>
      <div className="grid grid-cols-[30%_70%] gap-2 border-b py-2 md:mt-1 md:grid-cols-[22%_36%_20%_auto] md:py-3 lg:py-4">
        <div className="contents">
          <Heading as="h4" size="base" className="text-sm md:hidden" responsive>
            Order:
          </Heading>

          <Text
            as="span"
            size="base"
            className="text-sm text-blue-600 hover:underline"
            responsive
          >
            #{order.code}
          </Text>
        </div>
        <div className="contents">
          <Heading as="h4" size="base" className="text-sm md:hidden" responsive>
            Date:
          </Heading>

          <Text as="span" size="base" className="text-sm" responsive>
            {formateDate(order.orderDate)}
          </Text>
        </div>
        <div className="contents">
          <Heading as="h4" size="base" className="text-sm md:hidden" responsive>
            Status:
          </Heading>

          <Text
            as="span"
            size="base"
            className="text-sm"
            style={badgeStyle}
            responsive
          >
            {order.status}
          </Text>
        </div>
        <div className="contents">
          <Heading as="h4" size="base" className="text-sm md:hidden" responsive>
            Total:
          </Heading>
          <Text as="span" size="base" className="text-sm" responsive>
            ₹{toDecimal(order.totalAmount)}
          </Text>
        </div>
      </div>
    </Link>
  );
}

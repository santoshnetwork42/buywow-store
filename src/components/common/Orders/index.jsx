// app/account/orders/OrderList.js
"use client";

import TokenPagination from "@/components/features/TokenPagination";
import { STORE_ID } from "@/config";
import { searchOrders } from "@/graphql/appSync/api";
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
          console.log("error :>> ", error);
        }
      }
    },
    [user, token],
  );

  useEffect(() => {
    if (user) {
      getOrders(true);
    }
  }, [user]);

  return (
    <div className="container-main">
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div className="hidden gap-4 bg-gray-100 p-2 font-bold md:grid md:grid-cols-4">
          <div>Order</div>
          <div>Date</div>
          <div>Status</div>
          <div>Total</div>
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
      <div className="grid grid-cols-2 gap-2 border-b border-gray-200 py-2 md:grid-cols-4">
        <div className="md:contents-none contents">
          <div className="font-bold md:hidden">Order:</div>
          <div>
            <a
              href={`/order/${order.id}`}
              className="text-blue-600 hover:underline"
            >
              #{order.code}
            </a>
          </div>
        </div>
        <div className="md:contents-none contents">
          <div className="font-bold md:hidden">Date:</div>
          <div>
            <time>{formateDate(order.orderDate)}</time>
          </div>
        </div>
        <div className="md:contents-none contents">
          <div className="font-bold md:hidden">Status:</div>
          <div>
            <span style={badgeStyle}>{order.status}</span>
          </div>
        </div>
        <div className="md:contents-none contents">
          <div className="font-bold md:hidden">Total:</div>
          <div>₹{toDecimal(order.totalAmount)}</div>
        </div>
      </div>
    </Link>
  );
}

// function OrderRow({ order }) {
//   const badgeStyle = {
//     color: orderStatusBadge[order.status]?.color || "#0000ff",
//   };

//   return (
//     <div className="grid gap-2 border-b border-gray-200 py-2 md:grid-cols-5 md:gap-4">
//       <div className="flex flex-col md:flex-row">
//         <span className="font-bold md:hidden">Order:</span>
//         <a
//           href={`/order/${order.id}`}
//           className="text-blue-600 hover:underline"
//         >
//           #{order.code}
//         </a>
//       </div>
//       <div className="flex flex-col md:flex-row">
//         <span className="font-bold md:hidden">Date:</span>
//         <time>{formateDate(order.orderDate)}</time>
//       </div>
//       <div className="flex flex-col md:flex-row">
//         <span className="font-bold md:hidden">Status:</span>
//         <span style={badgeStyle}>{order.status}</span>
//       </div>
//       <div className="flex flex-col md:flex-row">
//         <span className="font-bold md:hidden">Total:</span>
//         <span>₹{toDecimal(order.totalAmount)}</span>
//       </div>
//       <div className="flex flex-col md:flex-row">
//         <span className="font-bold md:hidden">Actions:</span>
//         <a
//           href={`/order/${order.id}`}
//           className="text-blue-600 hover:underline"
//         >
//           View
//         </a>
//       </div>
//     </div>
//   );
// }

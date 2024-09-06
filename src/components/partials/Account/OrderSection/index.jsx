"use client";

import { Text } from "@/components/elements";
import Link from "next/link";
import React from "react";
import OrderList from "./OrderList";

const OrderSection = React.memo(() => {
  return (
    <div className="flex flex-col gap-5 py-1">
      <div className="container-main overflow-hidden rounded-md border shadow-sm">
        <OrderList />
      </div>
      <Text as="p" size="sm">
        For order history, please write to us @{" "}
        <Link
          prefetch={false}
          href="mailto:support@buywow.in"
          className="text-blue-600"
        >
          support@buywow.in
        </Link>{" "}
        with your order id and mobile number. Track your order{" "}
        <Link
          prefetch={false}
          href="https://track.buywow.in/"
          className="text-blue-600"
        >
          here
        </Link>
        .
      </Text>
    </div>
  );
});

OrderSection.displayName = "OrderSection";

export default OrderSection;

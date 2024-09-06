import { Heading, Text } from "@/components/elements";
import { formateDate, orderStatusBadge, toDecimal } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

const OrderRow = React.memo(({ order }) => {
  if (!order) return null;

  const badgeStyle = {
    color: orderStatusBadge[order.status]?.color || "#0000ff",
  };

  return (
    <Link prefetch={false} href={`/order/${order.id}`}>
      <div className="grid grid-cols-[30%_70%] gap-2 border-b py-2 hover:bg-slate-100 md:grid-cols-[22%_36%_20%_auto] md:py-3 lg:py-4 xl:py-[14px]">
        <OrderCell label="Order:" value={`#${order.code}`} isLink />
        <OrderCell label="Date:" value={formateDate(order.orderDate)} />
        <OrderCell label="Status:" value={order.status} style={badgeStyle} />
        <OrderCell label="Total:" value={`₹${toDecimal(order.totalAmount)}`} />
      </div>
    </Link>
  );
});

const OrderCell = React.memo(({ label, value, isLink, style }) => (
  <>
    <Heading as="h4" size="base" className="text-sm md:hidden" responsive>
      {label}
    </Heading>
    <Text
      as="span"
      size="base"
      className={`text-sm ${isLink ? "text-blue-600 hover:underline" : ""}`}
      style={style}
      responsive
    >
      {value}
    </Text>
  </>
));

OrderRow.displayName = "OrderRow";
OrderCell.displayName = "OrderCell";

export default OrderRow;

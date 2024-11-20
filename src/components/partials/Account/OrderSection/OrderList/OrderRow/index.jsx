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
      <div className="grid grid-cols-[30%_70%] gap-2 py-2 md:grid-cols-[22%_30%_20%_10%_auto] md:border-b md:py-3 md:hover:bg-slate-100 lg:py-4 xl:py-[14px]">
        <OrderCell label="Order:" value={`#${order.code}`} isLink />
        <OrderCell label="Date:" value={formateDate(order.orderDate)} />
        <OrderCell label="Status:" value={order.status} style={badgeStyle} />
        <OrderCell label="Total:" value={`₹${toDecimal(order.totalAmount)}`} />
        <Link
          prefetch={false}
          href={`https://track.buywow.in/my-order?order_id=${order?.code}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="hidden md:block"
        >
          <OrderCell label="Track:" isLink valueLabel="Track" />
        </Link>
      </div>
      <Link
        prefetch={false}
        href={`https://track.buywow.in/my-order?order_id=${order?.code}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="grid grid-cols-[30%_70%] gap-2 border-b pb-2 md:hidden md:grid-cols-[22%_30%_20%_10%_auto] md:py-3 md:hover:bg-slate-100 lg:py-4 xl:py-[14px]"
      >
        <OrderCell label="Track:" isLink valueLabel="Track" />
      </Link>
    </Link>
  );
});

const OrderCell = React.memo(({ label, value, isLink, style, valueLabel }) => (
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
      {!!valueLabel ? valueLabel : value}
    </Text>
  </>
));

OrderRow.displayName = "OrderRow";
OrderCell.displayName = "OrderCell";

export default OrderRow;

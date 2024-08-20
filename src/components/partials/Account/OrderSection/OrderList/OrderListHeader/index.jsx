import { Heading } from "@/components/elements";
import React from "react";

const OrderListHeader = React.memo(() => (
  <div className="hidden gap-2 bg-gray-100 shadow-[0_0_0_100vmax_#f2f4f1] [clipPath:inset(0_-100vmax)] md:grid md:grid-cols-[23%_36%_20%_auto] md:py-2.5 lg:py-3">
    <HeaderCell text="Order" />
    <HeaderCell text="Date" />
    <HeaderCell text="Status" />
    <HeaderCell text="Total" />
  </div>
));

const HeaderCell = React.memo(({ text }) => (
  <Heading as="h4" size="base" className="font-semibold" responsive>
    {text}
  </Heading>
));

OrderListHeader.displayName = "OrderListHeader";
HeaderCell.displayName = "HeaderCell";

export default OrderListHeader;

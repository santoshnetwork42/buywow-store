import { Heading } from "@/components/elements";
import React from "react";
import ViewTransaction from "./ViewTransaction";

const History = React.memo(({ transactions, title }) => {
  if (!transactions || transactions.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5 md:gap-2">
      <Heading as="h4" size="sm">
        {title}
      </Heading>
      <div className="space-y-2.5 md:space-y-3">
        {transactions.map((transaction, index) => (
          <ViewTransaction key={index} data={transaction} />
        ))}
      </div>
    </div>
  );
});

History.displayName = "History";

export default History;

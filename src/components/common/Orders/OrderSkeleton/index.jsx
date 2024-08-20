import React from "react";

const OrderSkeleton = () => (
  <div className="grid grid-cols-[35%_65%] gap-2 border-b py-2 md:mt-1 md:grid-cols-[22%_36%_20%_auto] md:py-3 lg:py-4">
    <SkeletonCell type="order" />
    <SkeletonCell type="date" />
    <SkeletonCell type="status" />
    <SkeletonCell type="total" />
  </div>
);

const SkeletonCell = ({ type }) => (
  <div className="flex flex-col">
    <div className="mb-2 h-4 w-16 animate-pulse rounded bg-gray-200 md:hidden"></div>
    <div
      className={`h-5 animate-pulse rounded bg-gray-200 ${getCellWidth(type)}`}
    ></div>
  </div>
);

const getCellWidth = (type) => {
  switch (type) {
    case "order":
      return "w-24 md:w-28";
    case "date":
      return "w-32 md:w-40";
    case "status":
      return "w-20 md:w-24";
    case "total":
      return "w-16 md:w-20";
    default:
      return "w-24";
  }
};

export default React.memo(OrderSkeleton);

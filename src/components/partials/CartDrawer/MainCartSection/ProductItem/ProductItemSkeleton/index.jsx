import React from "react";

const ProductItemSkeleton = () => (
  <div className="flex animate-pulse gap-3 rounded-lg border border-b p-2 pl-3 shadow-[0_4px_4px_#0000000D]">
    {/* Product Image Skeleton */}
    <div className="relative flex aspect-[66/88] h-fit w-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 md:w-24"></div>

    <div className="flex flex-1 flex-col gap-1">
      <div className="flex flex-1 justify-between gap-5">
        {/* Product Details Skeleton */}
        <div className="flex flex-1 flex-col justify-between gap-1">
          <div className="flex flex-col gap-1">
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="h-7 w-8 rounded-md bg-gray-200"></div>
      </div>

      <div className="flex flex-col justify-between gap-2">
        <div className="flex items-end justify-between gap-1">
          {/* Variant Selector Skeleton */}
          <div className="h-8 w-1/2 rounded bg-gray-200"></div>

          {/* Quantity Selector Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-24 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(ProductItemSkeleton);

import React from "react";

const ProductCardSkeleton = () => (
  <div class="flex animate-pulse flex-col justify-start gap-2 self-stretch rounded-lg p-[5px] shadow-xs md:gap-3 md:p-2">
    {/* <!-- Image placeholder --> */}
    <div class="relative aspect-[165/190] w-full overflow-hidden rounded-lg bg-gray-200 p-0.5 sm:p-1 md:p-2 lg:aspect-[300/330] lg:p-3 xl:p-4"></div>

    {/* <!-- Benefit tags placeholder --> */}
    <div class="flex max-h-12 flex-wrap gap-[4px] overflow-hidden md:max-h-[52px]">
      <div class="h-4 w-16 rounded bg-gray-200 md:h-6"></div>
      <div class="h-4 w-24 rounded bg-gray-200 md:h-6"></div>
      <div class="hidden w-14 rounded bg-gray-200 md:block md:h-6"></div>
    </div>

    {/* <!-- Product details placeholder --> */}
    <div class="flex flex-1 flex-col gap-2">
      {/* <!-- Title placeholder --> */}
      <div class="h-5 w-3/4 rounded bg-gray-200 md:h-6"></div>
      <div class="h-4 w-1/2 rounded bg-gray-200"></div>

      {/* <!-- Price and Add to Cart placeholder --> */}
      <div class="mt-5 flex items-center justify-between">
        <div class="h-6 w-24 rounded bg-gray-200"></div>
        <div class="h-6 w-20 rounded bg-gray-200 md:h-8"></div>
      </div>
    </div>
  </div>
);

export default ProductCardSkeleton;

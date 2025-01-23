const ProductCardSkeleton = () => (
  <div className="flex animate-pulse flex-col justify-start gap-2 self-stretch rounded-lg p-[5px] shadow-xs md:gap-3 md:p-2">
    {/* <!-- Image placeholder --> */}
    <div className="relative aspect-[1/1] w-full overflow-hidden rounded-lg bg-gray-200 p-0.5 sm:p-1 md:p-2 lg:p-3 xl:p-4"></div>

    {/* <!-- Benefit tags placeholder --> */}
    <div className="flex max-h-12 flex-wrap gap-[4px] overflow-hidden md:max-h-[52px]">
      <div className="h-4 w-16 rounded bg-gray-200 md:h-6"></div>
      <div className="h-4 w-24 rounded bg-gray-200 md:h-6"></div>
      <div className="hidden w-14 rounded bg-gray-200 md:block md:h-6"></div>
    </div>

    {/* <!-- Product details placeholder --> */}
    <div className="flex flex-1 flex-col gap-2">
      {/* <!-- Title placeholder --> */}
      <div className="h-5 w-3/4 rounded bg-gray-200 md:h-6"></div>
      <div className="h-4 w-1/2 rounded bg-gray-200"></div>

      {/* <!-- Price and Add to Cart placeholder --> */}
      <div className="mt-5 flex items-center justify-between">
        <div className="h-6 w-24 rounded bg-gray-200"></div>
        <div className="h-6 w-20 rounded bg-gray-200"></div>
      </div>
    </div>
  </div>
);

export default ProductCardSkeleton;

import React from "react";

const AccountSkeleton = () => (
  <div className="container-main mb-main mt-4 flex flex-col justify-center gap-3 sm:mt-5 sm:gap-4 md:mt-6 md:flex-row md:gap-5 lg:mt-7 lg:gap-6">
    <div className="no-scrollbar w-full overflow-x-scroll md:w-[200px] lg:w-[232px] xl:w-[264px]">
      <div className="flex w-max gap-2 md:w-full md:flex-col">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-8 w-28 animate-pulse rounded-md bg-gray-200 sm:h-10 md:w-full lg:h-12"
          ></div>
        ))}
      </div>
    </div>
    <div className="flex w-full max-w-6xl flex-1 flex-col overflow-hidden rounded-md border shadow-sm">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 h-8 w-1/3 animate-pulse rounded bg-gray-200"></div>

        {/* Content blocks */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 w-full animate-pulse rounded bg-gray-100"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
            <div className="h-20 w-full animate-pulse rounded bg-gray-100"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-1/5 animate-pulse rounded bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-6 w-full animate-pulse rounded bg-gray-100"></div>
              <div className="h-6 w-2/3 animate-pulse rounded bg-gray-100"></div>
            </div>
          </div>
          <div className="mt-8 space-y-2">
            <div className="h-10 w-1/3 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-full animate-pulse rounded bg-gray-100"></div>
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(AccountSkeleton);

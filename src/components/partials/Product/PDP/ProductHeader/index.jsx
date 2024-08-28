import { StarIcon } from "@/assets/svg/icons";
import { Heading, Text } from "@/components/elements";
import { formatTotalRatings, toDecimal } from "@/utils/helpers";
import React from "react";

const ProductHeader = React.memo(
  ({ title, benefits, rating, totalRatings }) => (
    <div className="flex flex-col gap-1 md:gap-1.5">
      <div className="flex flex-col">
        {title && (
          <Heading className="line-clamp-2 md:text-[28px]" as="p" size="2xl">
            {title}
          </Heading>
        )}
        {benefits && (
          <Text as="p" className="line-clamp-3" size="sm" responsive>
            {benefits.join(" | ")}
          </Text>
        )}
      </div>
      <div className="flex items-center gap-1">
        {rating > 0 && (
          <div className="flex items-center gap-1">
            <StarIcon className="h-3 w-3 -translate-y-[1px] md:h-4 md:w-4" />
            <Text className="capitalize" size="sm" responsive>
              {toDecimal(rating, 1)}
            </Text>
          </div>
        )}
        {totalRatings > 0 && (
          <Text className="capitalize" size="sm" responsive>
            ({formatTotalRatings(totalRatings)}) reviews
          </Text>
        )}
      </div>
    </div>
  ),
);

ProductHeader.displayName = "ProductHeader";

export default ProductHeader;

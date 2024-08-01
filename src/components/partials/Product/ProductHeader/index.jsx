import React from "react";
import { StarIcon } from "@/assets/svg/icons";
import { Heading, Text } from "@/components/elements";

const ProductHeader = React.memo(
  ({ title, benefits, formattedRating, formattedTotalRatings }) => (
    <div className="flex flex-col gap-1">
      {title && (
        <Heading className="line-clamp-2 md:text-[28px]" as="p" size="2xl">
          {title}
        </Heading>
      )}
      {benefits && (
        <Text as="p" className="line-clamp-3 font-light" size="sm" responsive>
          {benefits.join(" | ")}
        </Text>
      )}
      {formattedRating && (
        <div className="flex items-center gap-1">
          <StarIcon size={14} />
          <Text className="font-light capitalize" size="sm" responsive>
            {formattedRating} ({formattedTotalRatings} reviews)
          </Text>
        </div>
      )}
    </div>
  ),
);

ProductHeader.displayName = "ProductHeader";

export default ProductHeader;

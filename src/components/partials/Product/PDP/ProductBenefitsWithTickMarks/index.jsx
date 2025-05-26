import Checkmark, { TickMark } from "@/assets/svg/checkmark/icon";
import { Text } from "@/components/elements";
import { getDiscountPercentage, toDecimal } from "@/utils/helpers";
import React from "react";

const ProductBenefitsWithTickMarks = React.memo(
  ({ benefits = [], className }) => {
    //   const discountPercentage = getDiscountP ercentage(price, listingPrice);

    const benefitss = [
      "Best Results in 3 Months",
      "Helps to Manage Sugar Fluctuations",
      "5x Powerful & 10x Effective",
      "Helps in Energy Levels & Immunity",
    ];

    return (
      <>
        <div className={`my-2 flex flex-col gap-y-1 ${className}`}>
          {benefitss?.map((benefit) => (
            <div className="flex gap-x-4" key={benefit}>
              <TickMark size={18} />
              <Text as="p" size="base" className="">
                {benefit}
              </Text>
            </div>
          ))}
        </div>
      </>
    );
  },
);

ProductBenefitsWithTickMarks.displayName = "ProductBenefitsWithTickMarks";

export default ProductBenefitsWithTickMarks;

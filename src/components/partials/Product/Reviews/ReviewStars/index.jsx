import { GradientStarIcon } from "@/assets/svg/icons";
import React from "react";

const ReviewStars = ({ rating = 5 }) => {
  let productRating = rating;
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => {
        const fill = Math.min(productRating, 1) * 100;
        productRating = productRating > 1 ? productRating - 1 : 0;
        return <GradientStarIcon key={index} size={20} color={fill} />;
      })}
    </div>
  );
};

export default ReviewStars;

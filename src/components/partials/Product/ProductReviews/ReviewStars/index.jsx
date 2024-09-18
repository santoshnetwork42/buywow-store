import dynamic from "next/dynamic";
import React from "react";

const GradientStarIcon = dynamic(() => import("@/assets/svg/gradientStarIcon"));

const ReviewStars = React.memo(
  ({ rating = 0, onChange = () => {}, editable = false, size = 20 }) => {
    const handleStarClick = (index) => {
      if (editable) {
        onChange(index + 1);
      }
    };

    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => {
          const fill = Math.min(rating - index, 1) * 100;
          return (
            <span
              key={index}
              onClick={() => handleStarClick(index)}
              style={{ cursor: editable ? "pointer" : "default" }}
            >
              <GradientStarIcon
                className="w-4 md:w-5"
                size={size}
                color={fill}
              />
            </span>
          );
        })}
      </div>
    );
  },
);

ReviewStars.displayName = "ReviewStars";

export default ReviewStars;

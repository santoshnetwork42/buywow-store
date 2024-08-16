import { GradientStarIcon } from "@/assets/svg/icons";
import { useState } from "react";

const ReviewStars = ({
  rating: initialRating = 0,
  onChange = () => {},
  editable = false,
  size = 20,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (index) => {
    if (editable) {
      const newRating = index + 1;
      setRating(newRating);
      onChange(newRating);
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
            <GradientStarIcon size={size} color={fill} />
          </span>
        );
      })}
    </div>
  );
};

export default ReviewStars;

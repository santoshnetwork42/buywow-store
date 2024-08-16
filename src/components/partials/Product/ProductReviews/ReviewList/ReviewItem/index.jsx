import { Img, Text } from "@/components/elements";
import { formatTimeAgo } from "@/utils/helpers";
import React, { useCallback, useState } from "react";
import ReviewStars from "../../ReviewStars";

const ReviewItem = React.memo(({ review, isUserReview = false, onUpdate }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleEditClick = useCallback(() => {
    if (onUpdate) {
      onUpdate({
        comment: review.comment,
        rating: review.rating,
        name: review.reviewer.name,
        email: review.reviewer.email,
        images: review.images,
        reviewId: review.id,
      });
    }
  }, [review, onUpdate]);

  const openImageModal = useCallback((index) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  }, []);

  return (
    <div className="flex w-full flex-col flex-wrap justify-between gap-4 md:flex-row">
      <div className="h-[0.5px] w-full bg-black-900" />
      <div className="flex w-full flex-col md:max-w-[70%]">
        <div className="flex flex-col gap-2">
          <ReviewStars rating={review?.rating} />
          {
            <div className="">
              <Img
                src="img_wow_logo.png"
                width={86}
                height={48}
                alt="logo"
                className="aspect-[86/48] w-[86px] object-contain"
              />
            </div>
          }
          <Text as="p" size="base" className="line-clamp-5">
            {review?.comment}
          </Text>
        </div>
      </div>
      <div className="flex h-fit w-full items-start justify-between gap-2 md:w-auto md:min-w-[170px] md:flex-col">
        <div className="flex flex-col gap-1">
          <Text as="p" size="base">
            Submitted {formatTimeAgo(review?.createdAt)}
          </Text>
          <Text as="p" size="base">
            By {review?.reviewer.name}
          </Text>
        </div>
        {review?.verified && (
          <div className="flex items-center gap-1">
            <Img
              src="verified.svg"
              width={22}
              height={22}
              alt="search"
              className="aspect-square w-[24px] cursor-pointer object-contain"
            />
            <Text as="p" size="base">
              VERIFIED BUYER
            </Text>
          </div>
        )}
      </div>
    </div>
  );
});

ReviewItem.displayName = "ReviewItem";

export default ReviewItem;

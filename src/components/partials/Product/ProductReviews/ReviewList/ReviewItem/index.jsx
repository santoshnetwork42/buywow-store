import { CloseIcon } from "@/assets/svg/icons";
import { Button, Heading, Img, Text } from "@/components/elements";
import Modal from "@/components/features/Modal";
import ReadMore from "@/components/features/ReadMore";
import ReviewImageCarousel from "@/components/partials/Product/ProductReviews/ReviewList/ReviewItem/ReviewImageCarousel";
import ReviewStars from "@/components/partials/Product/ProductReviews/ReviewStars";
import { formatTimeAgo } from "@/utils/helpers";
import React, { useCallback, useState } from "react";

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
        <div className="flex flex-col gap-2 md:gap-3">
          <ReviewStars rating={review?.rating} />
          {review?.images?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {review.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => openImageModal(index)}
                  className="aspect-[110/80] w-20 cursor-pointer sm:w-24 lg:w-28"
                >
                  <Img
                    src={img}
                    width={100}
                    height={100}
                    alt={`Review image ${index + 1}`}
                    addPrefix
                    className="aspect-[110/80] h-auto w-full border object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>
              ))}
            </div>
          )}
          <ReadMore
            content={review?.comment.replace(/[^\x00-\x7F]/g, "'")}
            maxLength={300}
          />
          {isUserReview && (
            <Button
              onClick={handleEditClick}
              className="w-fit text-blue-600 hover:underline"
            >
              Edit
            </Button>
          )}
        </div>
      </div>
      <div className="flex h-fit w-full items-start justify-between gap-2 md:w-auto md:min-w-[170px] md:flex-col">
        <div className="flex flex-col gap-0.5">
          <Text as="p" size="base" responsive>
            Submitted {formatTimeAgo(review?.createdAt)}
          </Text>
          <Text as="p" size="base" responsive>
            By {review?.reviewer.name}
          </Text>
        </div>
        {review?.verifiedPurchase && (
          <div className="flex items-center gap-1">
            <Img
              src="verified.svg"
              width={22}
              height={22}
              alt="search"
              className="aspect-square w-5 cursor-pointer object-contain md:w-6"
              isStatic
            />
            <Text as="p" size="base" responsive>
              VERIFIED BUYER
            </Text>
          </div>
        )}
      </div>

      <Modal
        isOpen={isImageModalOpen}
        showMobileView={false}
        onClose={() => setIsImageModalOpen(false)}
        modalContainerClassName="w-[min(380px,90%)] p-0 sm:w-[450px] md:w-[600px] lg:w-[700px] xl:w-[800px] h-[550px] md:h-[450px] overflow-hidden"
      >
        <div className="relative flex h-full flex-col md:flex-row">
          <div className="flex items-center justify-center p-4 md:w-3/5">
            <ReviewImageCarousel
              images={review?.images || []}
              initialSlide={selectedImageIndex}
            />
          </div>
          <div className="flex flex-1 flex-col gap-1.5 bg-lime-50 px-4 py-3 md:w-2/5 md:gap-2 md:py-7">
            <div className="flex items-center justify-between gap-1 md:mt-2">
              <Heading as="h3" size="lg" className="text-base" responsive>
                {review?.reviewer.name}
              </Heading>
              {!review?.verifiedPurchase && (
                <div className="flex items-center gap-1">
                  <Img
                    src="verified.svg"
                    width={22}
                    height={22}
                    alt="search"
                    className="aspect-square w-5 cursor-pointer object-contain md:w-6"
                    isStatic
                  />
                  <Text as="p" size="sm" responsive>
                    VERIFIED
                  </Text>
                </div>
              )}
            </div>
            <ReviewStars rating={review?.rating} />
            <Text as="span" size="sm" className="text-gray-700">
              Submitted {formatTimeAgo(review?.createdAt)}
            </Text>
            <div className="h-full max-h-[136px] overflow-y-scroll sm:max-h-[120px] md:max-h-[300px]">
              <ReadMore
                content={review?.comment.replace(/[^\x00-\x7F]/g, "'")}
                buttonClassName="bg-lime-50"
              />
            </div>
          </div>
          <div
            className="absolute right-1 top-1 cursor-pointer"
            onClick={() => setIsImageModalOpen(false)}
          >
            <CloseIcon size={36} />
          </div>
        </div>
      </Modal>
    </div>
  );
});

ReviewItem.displayName = "ReviewItem";

export default ReviewItem;

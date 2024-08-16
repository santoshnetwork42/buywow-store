import { Button, Text } from "@/components/elements";
import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = React.memo(
  ({
    userReview,
    reviews,
    total,
    token,
    loading,
    getProductReviews,
    handleUpdateReview,
  }) => {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5 py-2">
        {!!userReview && (
          <ReviewItem
            review={userReview}
            onUpdate={handleUpdateReview}
            isUserReview
          />
        )}

        {reviews?.map((item) => (
          <ReviewItem key={item.id} review={item} />
        ))}

        {total > 0 && <div className="h-[0.5px] w-full bg-black-900" />}

        {total > 0 && (
          <Text as="span" size="sm" className="w-full">
            Showing <span>{`1 - ${reviews?.length} of ${total}`}</span> reviews
          </Text>
        )}

        {!!token && reviews?.length < total && (
          <Button
            variant="primary"
            size="large"
            onClick={() => getProductReviews()}
            loader={loading}
          >
            Load More
          </Button>
        )}
      </div>
    );
  },
);

ReviewList.displayName = "ReviewList";

export default ReviewList;

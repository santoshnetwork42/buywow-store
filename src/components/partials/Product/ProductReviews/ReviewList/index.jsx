import { Button, Text } from "@/components/elements";
import dynamic from "next/dynamic";
import React from "react";

const ReviewItem = dynamic(
  () =>
    import(
      "@/components/partials/Product/ProductReviews/ReviewList/ReviewItem"
    ),
);

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
    if (!reviews.length && !userReview) return null;
    return (
      <div className="mt-4 flex w-full flex-col items-center justify-center gap-6 py-2">
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

        {(total > 0 || userReview) && (
          <div className="h-[0.5px] w-full bg-black-900" />
        )}

        {total > 0 && (
          <Text as="span" size="sm" className="w-full" responsive>
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

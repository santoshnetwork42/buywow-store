import { Button, Text } from "@/components/elements";
import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = React.memo(
  ({ userReview, reviews, total, token, loading, getProductReviews }) => (
    <div className="flex w-full flex-col items-center justify-center gap-6 py-2">
      {!!userReview && <ReviewItem review={userReview} isUserReview />}

      {reviews?.map((item) => (
        <ReviewItem key={item.id} review={item} />
      ))}

      {total > 0 && <div className="h-[0.05rem] w-full bg-gray-300" />}

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
  ),
);

ReviewList.displayName = "ReviewList";

export default ReviewList;

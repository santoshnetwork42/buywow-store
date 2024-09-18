import SectionHeading from "@/components/common/SectionHeading";
import { Button, Heading } from "@/components/elements";
import ReviewStars from "@/components/partials/Product/ProductReviews/ReviewStars";
import { toDecimal } from "@/utils/helpers";
import dynamic from "next/dynamic";
import React from "react";

const RatingBar = dynamic(
  () =>
    import(
      "@/components/partials/Product/ProductReviews/ReviewSummary/RatingBar"
    ),
  { ssr: false },
);

const ReviewSummary = React.memo(
  ({ title, rating, totalRating, reviewAnalytics, onReviewClick }) => (
    <>
      <SectionHeading title={title} />
      <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row">
        <div className="flex flex-col items-center justify-center gap-3">
          <ReviewStars rating={rating} />
          <div className="flex items-center gap-1">
            <Heading
              as="h4"
              size="base"
              className="text-sm normal-case"
              responsive
            >
              {toDecimal(rating, 2)} out of 5{" "}
              {!!totalRating && `| ${totalRating} Customer Rating`}
            </Heading>
          </div>
          <Button
            variant="primary"
            size="large"
            className="px-4 py-2"
            onClick={onReviewClick}
          >
            Write a Review
          </Button>
        </div>
        <div className="hidden h-24 w-[1px] bg-gray-800 md:block" />
        <div className="flex w-full max-w-[24rem] flex-col gap-3">
          {[5, 4, 3, 2, 1].map((starCount) => {
            const analyticsItem = reviewAnalytics.find(
              (item) => parseInt(item.key) === starCount,
            );
            return (
              <RatingBar
                key={starCount}
                starCount={starCount}
                percentage={analyticsItem ? analyticsItem.percentage : 0}
              />
            );
          })}
        </div>
      </div>
    </>
  ),
);

ReviewSummary.displayName = "ReviewSummary";

export default ReviewSummary;

import React from "react";
import { Heading } from "@/components/common";
import CustomerReviewCard from "@/components/features/Card/CustomerReviewCard";
import SliderComponent from "@/components/features/Slider/SliderScroll";

const CustomerReviewSection = ({ sectionData }) => {
  const { title, reviews } = sectionData;

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section className="self-stretch">
      <div className="flex flex-col items-center gap-5">
        <Heading size="heading" as="h1" responsive>
          {title}
        </Heading>
        <SliderComponent
          items={reviews.map((review, index) => (
            <CustomerReviewCard
              reviewData={review}
              className="w-full max-w-[320px] gap-3 sm:w-[56vw] sm:max-w-[502px] md:w-[46vw] lg:w-[40vw]"
              key={`review-${index}`}
            />
          ))}
          className="w-full"
          sliderClassName="gap-3 sm:gap-4 lg:gap-5"
        />
      </div>
    </section>
  );
};

export default CustomerReviewSection;

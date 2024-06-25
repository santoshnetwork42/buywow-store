import { Button, Heading, Img, Text, Slider } from "@/components/common";
import CustomerReviewCard from "@/components/features/Card/CustomerReviewCard";
// import AutoHomepageWireframeProductcard2 from "@/components/AutoHomepageWireframeProductcard2";
import React, { Suspense } from "react";

const CustomerReviewSection = () => {
  return (
    <div className="flex flex-col items-center self-stretch rounded-[16px]">
      <div className="container-xs flex flex-col gap-12">
        <div className="flex flex-col items-center gap-[45px]">
          <Heading
            size="heading6xl"
            as="h1"
            className="capitalize">
            Real Reviews From Real Customers
          </Heading>
          <div className="flex w-full gap-5 md:flex-col">
            {[...Array(3)].map((d, index) => (
              <CustomerReviewCard key={"reviewList" + index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewSection;

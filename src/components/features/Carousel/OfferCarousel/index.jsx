// import AutoHomepageWireframeOfferdetails from "@/components/AutoHomepageWireframeOfferdetails";
import React, { Suspense } from "react";

const OfferCarousal = () => {
  return (
    <div className="self-stretch">
      <div className="flex gap-5 md:flex-col">
        <Suspense fallback={<div>Loading feed...</div>}>
          {[...Array(2)].map((d, index) => (
            <div
              key={"categoryList" + index}
              className="bg-[url(/images/img_frame_1400005916.png)]"
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default OfferCarousal;

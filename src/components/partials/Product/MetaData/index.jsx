"use client";
import { Img, Text } from "@/components/common";
import { productData } from "@/data/productData";
import React from "react";
import Description from "@/components/partials/Product/MetaData/Description";
import Ingredients from "@/components/partials/Product/MetaData/Ingredients";
import HowToUse from "@/components/partials/Product/MetaData/HowToUse";
import Faqs from "@/components/partials/Product/MetaData/Faqs";

import Divider from "@/components/common/Divider";

const MetaData = () => {
  const { metaData } = productData[0];
  const { productDescription, ingredients, howToUse, faqs } = metaData;
  return (
    <div className="flex flex-col gap-3 px-2">
      {/* ProductDescription Section*/}
      <Description productDescription={productDescription} />

      {!!ingredients && (
        <Divider className="mb-3 h-[0.05rem] w-full bg-gray-300" />
      )}

      {/* Ingredients Section */}
      <Ingredients ingredients={ingredients} />

      {!!howToUse && (
        <Divider className="mb-3 h-[0.05rem] w-full bg-gray-300" />
      )}

      {/* How to use Section */}
      <HowToUse howToUse={howToUse} />

      {!!faqs && <Divider className="mb-3 h-[0.05rem] w-full bg-gray-300" />}

      {/* How to use Section */}
      <Faqs faqs={faqs} />

      <Divider className="mb-3 h-[0.05rem] w-full bg-gray-300" />
    </div>
  );
};
export default MetaData;

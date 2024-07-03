"use client";
import { Img, Text } from "@/components/common";
import { productData } from "@/data/productData";
import React from "react";
import Description from "@/components/partials/Product/MetaData/Description";
import Ingredients from "@/components/partials/Product/MetaData/Ingredients";
import HowToUse from "./HowToUse";

const MetaData = () => {
  const { metaData } = productData[0];
  const { productDescription, ingredients, howToUse, faqs } = metaData;
  return (
    <div className="flex flex-col gap-2">
      {/* ProductDescription Section*/}
      <Description productDescription={productDescription} />

      {/* Ingredients Section */}
      <Ingredients ingredients={ingredients} />

      {/* How to use Section */}
      <HowToUse howToUse={howToUse} />
    </div>
  );
};
export default MetaData;

// src/components/ProductFeatures.jsx
import React from "react";
import { Text, Img } from "@/components/common";

const FeatureItem = ({ icon, text }) => (
  <div className="flex flex-col items-center justify-center gap-1 sm:w-1/4 lg:flex-row lg:gap-4 xl:gap-6">
    <Img
      src={icon}
      width={60}
      height={60}
      alt="Product feature"
      className="aspect-square w-full max-w-[40px] rounded-full object-contain sm:max-w-[48px] md:max-w-[56px] lg:max-w-[60px]"
    />
    <Text
      as="p"
      size="base"
      className="line-clamp-2 w-fit text-center capitalize lg:text-left"
      responsive
    >
      {text}
    </Text>
  </div>
);

const ProductFeatures = ({ features, className, ...props }) => {
  return (
    <div
      {...props}
      className={`${className} mx-auto flex w-full items-center justify-around sm:justify-evenly xl:max-w-[88vw]`}
    >
      {features.map((feature) => (
        <FeatureItem key={feature.id} icon={feature.icon} text={feature.text} />
      ))}
    </div>
  );
};

export default ProductFeatures;

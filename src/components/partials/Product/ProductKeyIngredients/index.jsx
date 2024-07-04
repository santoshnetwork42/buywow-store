import { Heading } from "@/components/common";
import React from "react";

const ProductKeyIngredients = ({ className, ...props }) => {
  return (
    <div
      className={`container-main flex flex-col gap-5 bg-lime-50 pb-7 pt-4 sm:pb-8 sm:pt-5 md:gap-6 md:pb-9 lg:pb-10 lg:pt-6 ${className}`}
      {...props}
    >
      <Heading as="h1" size="heading" responsive>
        key Ingredients
      </Heading>
      <div className="flex flex-col md:flex-row"></div>
    </div>
  );
};

export default ProductKeyIngredients;

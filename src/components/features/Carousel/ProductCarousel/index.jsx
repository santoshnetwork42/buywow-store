"use client";

import React from "react";
import ProductCard from "@/components/features/Card/ProductCard";
import SliderComponent from "@/components/features/Slider/SliderScroll";

const ProductCarousel = ({ products, className, ...props }) => {
  const items = products.map((product) => (
    <ProductCard
      key={product.id}
      {...product}
      className="bg-white-a700_01 max-w-[326px] w-[45vw] sm:w-[40vw] md:w-[34vw] lg:w-[27vw] xl:w-[24vw]"
    />
  ));

  return (
    <SliderComponent
      items={items}
      className={className}
      {...props}
    />
  );
};

export default ProductCarousel;

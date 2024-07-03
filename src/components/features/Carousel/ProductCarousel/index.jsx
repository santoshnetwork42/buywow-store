"use client";

import React from "react";
import ProductCard from "@/components/features/Card/ProductCard";
import SliderComponent from "@/components/features/Slider/SliderScroll";

const ProductCarousel = ({ products, className, ...props }) => {
  if (!Array.isArray(products)) return null;

  const items = products.map((product) => (
    <ProductCard
      key={product.id}
      {...product}
      className="w-[calc(50vw-16px)] max-w-[356px] bg-white-a700_01 sm:w-[calc(50vw-24px)] md:w-[calc(33vw-24.5px)] lg:w-[calc(33vw-30px)] xl:w-[calc(25vw-34px)]"
    />
  ));

  return <SliderComponent items={items} className={className} {...props} />;
};

export default ProductCarousel;

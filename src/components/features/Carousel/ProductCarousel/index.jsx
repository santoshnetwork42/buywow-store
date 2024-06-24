"use client";

import React, { useState, useRef } from "react";
import { Slider, Img, Text } from "@/components/common";
import { useDeviceWidth } from "@/utils/useDeviceWidth";
import ProductCard from "@/components/features/products/ProductCard-1";

const ProductCarousel = ({ products, className, ...props }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const deviceWidth = useDeviceWidth();

  const totalSlides = Math.ceil(products.length / 4);

  const renderDotsItem = (dotProps) => {
    return dotProps?.isActive ? (
      <div className="mr-1.5 inline-block h-[6px] w-[10px] cursor-pointer rounded-[3px] bg-black-900" />
    ) : (
      <div className="mr-1.5 inline-block h-[6px] w-[6px] cursor-pointer rounded-[3px] bg-gray-300_01" />
    );
  };

  return (
    <div
      className={`${className} w-max flex relative`}
      {...props}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          {...product}
          className="bg-white-a700_01 sm:w-[40vw] md:w-[34vw] lg:w-[27vw] xl:w-[24vw] overflow-visible"
        />
      ))}

      {/* <div className="w-full flex mt-4">
        <div className="flex w-[83%] h-[2px] rounded-[1px] bg-gray-300_01 md:w-full">
          <div
            className="h-[2px] rounded-[1px] bg-black-900"
            style={{ width: `${((activeSlide + 1) / totalSlides) * 100}%` }}
          />
        </div>
        <div className="relative m-auto mt-[-15px] flex w-[9%] md:w-full">
          <div className="flex w-full items-center justify-center gap-[15px]">
            <Text
              size="text3xl"
              as="p"
              className="!text-[16.33px] !font-medium uppercase">
              {`${activeSlide + 1} / ${totalSlides}`}
            </Text>
            <div className="flex flex-1 justify-center gap-4">
              <Img
                src="img_arrow_left.svg"
                width={28}
                height={28}
                alt="Previous slide"
                className="h-[28px] w-[28px] cursor-pointer"
                onClick={() => sliderRef.current?.slidePrev()}
              />
              <Img
                src="img_arrow_right_black_900.png"
                width={27}
                height={28}
                alt="Next slide"
                className="h-[28px] w-[27px] object-cover cursor-pointer"
                onClick={() => sliderRef.current?.slideNext()}
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProductCarousel;

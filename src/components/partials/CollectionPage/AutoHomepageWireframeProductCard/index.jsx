import { Button, Text, Img } from "@/components/common";
import React from "react";

export default function AutoHomepageWireframeProductCard({
  haircondition1 = "oily hair",
  haircondition2 = "dandruff",
  shampooname = "apple cider vinegar shampoo",
  shampoobenefits = "Reduces scalp irritation | Restores natural shine |  Smoothens hair",
  rating = "4.5",
  reviewcount = "(398 reviews)",
  price1 = "₹339",
  price2 = "₹399",
  addbutton = "10% OFF",
  frame1400004801 = "Add",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col justify-center gap-3 shadow-xs rounded-lg`}
    >
      <Img
        src="img_image_2053.png"
        width={310}
        height={331}
        alt="product image"
        className="mt-[5px] h-[331px] w-full object-cover"
      />
      <div className="mb-[5px] flex flex-col gap-3 self-stretch">
        <div className="flex flex-wrap gap-[5px]">
          <Text className="flex items-center justify-center rounded-[5px] bg-gray-100 px-2.5 py-[3px] text-sm font-normal capitalize">
            {haircondition1}
          </Text>
          <Text className="flex items-center justify-center rounded-[5px] bg-deep_orange-50_01 px-[9px] py-[3px] text-sm font-normal capitalize">
            {haircondition2}
          </Text>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-start">
            <Text className="text-xl font-semibold capitalize">
              {shampooname}
            </Text>
            <Text className="w-full text-sm font-light leading-[130%]">
              {shampoobenefits}
            </Text>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div className="flex w-[49%] flex-col gap-[7px]">
              <div className="flex w-[85%] items-center gap-1">
                <div className="flex w-[32%] items-center gap-[3px]">
                  <Img
                    src="img_star_6_3.svg"
                    width={16}
                    height={16}
                    alt="rating star"
                    className="h-[16px] w-[16px] rounded-[1px]"
                  />
                  <Text className="text-sm font-normal capitalize">
                    {rating}
                  </Text>
                </div>
                <Text className="text-sm font-normal capitalize">
                  {reviewcount}
                </Text>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-1 flex-wrap items-center gap-2">
                  <Text className="text-lg font-semibold capitalize">
                    {price1}
                  </Text>
                  <Text className="text-sm font-normal capitalize line-through">
                    {price2}
                  </Text>
                </div>
                <Button className="flex h-[23px] min-w-[62px] flex-row items-center justify-center rounded-sm bg-lime-50 px-2 text-center text-xs capitalize text-black-900">
                  {addbutton}
                </Button>
              </div>
            </div>
            <Button className="flex h-[35px] min-w-[66px] flex-row items-center justify-center self-end rounded-[17px] bg-yellow-900 px-4 text-center text-lg font-medium text-white-a700_01">
              {frame1400004801}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

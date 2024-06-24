import { Img, Text, Heading } from "@/components/common";
import Link from "next/link";
import React from "react";
import CountdownTimer from "@/components/common/partials/CountdownTimer";

const AnnouncementBar = ({ leftText, centerContent, rightText, flashSaleDiscount }) => {
  return (
    <div className="flex justify-center self-stretch bg-blue_gray-400_01 py-[3px] sm:py-1.5">
      <div className="container-xs flex items-center justify-between gap-5">
        <Text
          as="p"
          className="capitalize !text-white-a700_01 max-lg:hidden lg:w-[28%]">
          {leftText}
        </Text>
        <div className="flex w-auto m-auto items-center justify-center">
          {centerContent.isTimer === true ? (
            <CountdownTimer
              {...centerContent}
              flashSaleDiscount={flashSaleDiscount}
            />
          ) : (
            <Text
              as="p"
              className="!text-white-a700_01 py-0.5">
              {centerContent.centerText}
            </Text>
          )}
        </div>
        <Text
          as="p"
          className="capitalize !text-white-a700_01 max-lg:hidden lg:w-[28%] text-end">
          {rightText}
        </Text>
      </div>
    </div>
  );
};

export default AnnouncementBar;

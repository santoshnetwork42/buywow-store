import { Img, Text, Heading } from "@/components/common";
import Link from "next/link";
import React from "react";

const CountdownTimer = ({ days, hours, minutes, seconds, flashSaleDiscount }) => {
  const TimeUnit = ({ value, label }) => (
    <div className="flex mx-1 flex-1 flex-col items-center rounded-[2px] bg-white-a700_01 py-0.5 px-1">
      <Heading
        size="headings"
        as="p"
        className="h-[15px] w-[15px] !text-blue_gray-300">
        {value.toString().padStart(2, "0")}
      </Heading>
      <Text
        size="textxs"
        as="p">
        {label}
      </Text>
    </div>
  );

  return (
    <>
      <div className="flex items-center mr-1">
        <Img
          src="img_image_2038.png"
          width={16}
          height={16}
          alt="sale image"
          className="h-[16px] w-[16px] object-contain"
        />
        <Text
          as="p"
          className="!text-white-a700_01 max-sm:text-xs">
          Flash Sale up to {flashSaleDiscount}% OFF for
        </Text>
      </div>
      <TimeUnit
        value={days}
        label="DYS"
      />
      <Heading
        size="textmd"
        as="p"
        className="mb-1 self-center !text-[11.3px] !text-white-a700_01">
        :
      </Heading>
      <TimeUnit
        value={hours}
        label="HRS"
      />
      <Heading
        size="textmd"
        as="p"
        className="mb-1 self-center !text-[11.3px] !text-white-a700_01">
        :
      </Heading>
      <TimeUnit
        value={minutes}
        label="MIN"
      />
      <Heading
        size="textmd"
        as="p"
        className="mb-1 self-center !text-[11.3px] !text-white-a700_01">
        :
      </Heading>
      <TimeUnit
        value={seconds}
        label="SEC"
      />
    </>
  );
};

export default CountdownTimer;

import { Button, Heading, Img, Text } from "@/components/elements";
import React from "react";

const CouponHeader = ({ openSidebar }) => (
  <div className="relative flex shrink items-center justify-between gap-2 rounded-lg bg-blue_gray-300_01 py-2 pl-2 pr-5 shadow-xs md:pl-2.5">
    <div className="flex items-center justify-center gap-2">
      <Img
        src="img_image_2021.png"
        width={32}
        height={32}
        alt="promo image"
        className="aspect-square w-[32px] object-contain"
      />
      <div className="flex flex-col justify-center">
        <Heading
          size="lg"
          as="h4"
          className="line-clamp-1 text-base text-white-a700_01"
          responsive
        >
          Coupons & Offers
        </Heading>
        <Text
          size="base"
          as="p"
          className="line-clamp-2 text-sm text-white-a700_01"
          responsive
        >
          Apply now and save extra!
        </Text>
      </div>
    </div>
    <Button
      className="relative flex h-9 w-9 shrink-0 rounded-full bg-white-a700_01 p-0"
      onClick={openSidebar}
    >
      <Img src="img_group_1400002487.svg" width={7} height={20} />
    </Button>
  </div>
);

export default React.memo(CouponHeader);

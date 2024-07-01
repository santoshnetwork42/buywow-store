import { Button, Img, Text } from "@/components/common";
import React from "react";

export default function AjaxCartDesktopDivOfferViewAll({
  promoimage = "img_image_2021.png",
  offersheading = "coupons & offers",
  offerssubtext = "Apply now and save extra!",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-1 items-center justify-between gap-5 rounded-lg p-2 shadow-xs`}
    >
      <div className="ml-[11px] flex items-start justify-center gap-2">
        <Img
          src={promoimage}
          width={32}
          height={32}
          alt="promo image"
          className="h-[32px] w-[32px] object-cover"
        />
        <div className="flex flex-1 flex-col items-start">
          <Text
            size="text4xl"
            as="p"
            className="!font-medium capitalize !text-white-a700_01"
          >
            {offersheading}
          </Text>
          <Text size="text3xl" as="p" className="!text-white-a700_01">
            {offerssubtext}
          </Text>
        </div>
      </div>
      <Button className="mr-[11px] flex h-[35px] w-[35px] items-center justify-center rounded-[17px] bg-white-a700_01 px-2.5">
        <Img src="img_group_1400002487.svg" width={5} height={13} />
      </Button>
    </div>
  );
}

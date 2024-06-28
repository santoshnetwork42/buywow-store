import { Text, Button, Img } from "@/components/common";
import React from "react";

export default function AutoHomepageWireframeKeywords({
  deliverytext = (
    <>
      Delivery within
      <br />
      3-5 days
    </>
  ),
  freeshippingtext = "Free Shipping on orders above ₹999",
  returnpolicytext = "Easy return and refund policy",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex items-center justify-between gap-5 md:w-full md:flex-col`}
    >
      <div className="flex w-full items-center justify-center gap-3">
        <div className="flex flex-col items-center justify-center rounded-[29px] bg-blue-50 p-[7px]">
          <Img
            src="img_image_1959.png"
            width={44}
            height={44}
            alt="product image"
            className="h-[44px] w-[44px] object-cover"
          />
        </div>
        <Text className="w-[73%] text-base font-normal leading-[132%] sm:w-[73%] sm:text-[13px]">
          {deliverytext}
        </Text>
      </div>
      <div className="flex w-full items-center justify-center gap-3">
        <Button className="flex h-[59px] w-[59px] items-center justify-center rounded-[29px] bg-blue-50 px-[11px]">
          <Img src="img_group_1400002325.png" width={36} height={36} />
        </Button>
        <Text className="w-[73%] text-base font-normal leading-[132%] sm:w-[73%] sm:text-[13px]">
          {freeshippingtext}
        </Text>
      </div>
      <div className="flex w-full items-center justify-center gap-3">
        <Button className="flex h-[59px] w-[59px] items-center justify-center rounded-[29px] bg-blue-50 px-[11px]">
          <Img src="img_group_1400002326.png" width={36} height={36} />
        </Button>
        <Text className="w-[73%] text-base font-normal leading-[132%] sm:w-[73%] sm:text-[13px]">
          {returnpolicytext}
        </Text>
      </div>
    </div>
  );
}

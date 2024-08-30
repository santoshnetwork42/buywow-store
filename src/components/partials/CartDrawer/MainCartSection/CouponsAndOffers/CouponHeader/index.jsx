import { ArrowIconSVG, CloseSVG } from "@/assets/svg/icons";
import { Button, Heading, Img, Text } from "@/components/elements";
import React from "react";

const CouponHeader = ({ openSidebar, appliedCoupon, removeCoupon }) => {
  if (appliedCoupon) {
    return (
      <div className="flex w-full flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Heading size="lg" as="h4" className="text-base" responsive>
            Coupons
          </Heading>
          <Text
            size="sm"
            as="p"
            className="cursor-pointer text-yellow-900"
            onClick={openSidebar}
            responsive
          >
            View more Offers +
          </Text>
        </div>
        <div className="flex justify-between rounded-lg bg-orange-500/75 p-2 py-1.5 md:py-2">
          <Heading
            as="h5"
            size="sm"
            className={`h-fit rounded-md border-[1.5px] border-dashed border-yellow-900 bg-white-a700 px-3 py-1.5`}
            responsive
          >
            {appliedCoupon?.code}
          </Heading>
          <Button onClick={removeCoupon} className="mr-1.5 rounded-none">
            <CloseSVG className="w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex shrink items-center justify-between gap-2 rounded-lg bg-blue_gray-300_01 py-2 pl-2 pr-5 shadow-xs md:pl-2.5">
      <div className="flex items-center justify-center gap-2">
        <Img
          src="img_coupons_and_offers.png"
          width={32}
          height={32}
          alt="promo image"
          className="aspect-square w-[32px] object-contain"
          isStatic
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
        <ArrowIconSVG className="size-6" />
      </Button>
    </div>
  );
};

export default React.memo(CouponHeader);

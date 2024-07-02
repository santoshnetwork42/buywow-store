// components/MyCart/OfferItem.jsx
import React from "react";
import { Button, Heading, Img, Text } from "@/components/common";

export default function OfferItem({ offer }) {
  return (
    <div
      className={`${offer.bgColor} flex items-center justify-between gap-2 rounded-lg py-2 pl-2 pr-5 shadow-xs md:pl-2.5`}
    >
      <div className="flex flex-1 items-center justify-center gap-2">
        <Img
          src={offer.image}
          width={32}
          height={32}
          alt="promo image"
          className="aspect-square w-[32px] object-contain"
        />
        <div className="flex flex-1 flex-col justify-center">
          <Heading
            size="base"
            as="h4"
            className={`${offer.textColor} truncate`}
            responsive
          >
            {offer.heading}
          </Heading>
          <Text
            size="base"
            as="p"
            className={`${offer.textColor} truncate`}
            responsive
          >
            {offer.subtext}
          </Text>
        </div>
      </div>
      <Button className="flex h-9 w-9 rounded-full bg-white-a700_01 p-0">
        <Img src="img_group_1400002487.svg" width={7} height={20} />
      </Button>
    </div>
  );
}

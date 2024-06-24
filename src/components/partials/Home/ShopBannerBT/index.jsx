import { Text, Heading } from "@/components/common";
import React from "react";

export default function ShopBannerBT({
  taglinetext = "Where science meets nature to redefine skincare.",
  descriptiontext = "Our cutting-edge formulas, backed by clinical studies, bring you the latest in skin & hair care innovation. ",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex self-stretch justify-center items-end h-[283px] md:h-auto py-14 md:py-5 bg-[url(/images/img_frame_1400005903.png)] bg-cover bg-no-repeat`}
    >
      <div className="container-xs mt-14 flex px-[53px] md:p-5 md:px-5">
        <div className="flex w-[32%] flex-col gap-4 md:w-full">
          <Heading
            size="heading4xl"
            as="h4"
            className="leading-[110%] !text-white-a700_01"
          >
            {taglinetext}
          </Heading>
          <Text
            size="text3xl"
            as="p"
            className="leading-[140%] !text-white-a700_01"
          >
            {descriptiontext}
          </Text>
        </div>
      </div>
    </div>
  );
}

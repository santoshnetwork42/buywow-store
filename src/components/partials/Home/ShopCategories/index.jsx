import { Img, Text, Heading } from "@/components/common";
import React, { Suspense } from "react";

const data = [
  { hairCareImage: "img_image_2054.png", hairCareLabel: "hair care" },
  { hairCareImage: "img_image_2055.png", hairCareLabel: "skin care" },
  { hairCareImage: "img_image_2056.png", hairCareLabel: "bath & body" },
];

export default function ShopCategories({ ...props }) {
  return (
    <div
      {...props}
      className={`${props.className} flex self-stretch justify-center items-center`}
    >
      {/* categories section */}
      <div className="flex justify-center md:p-5 w-full">
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col items-center gap-[19px]">
            <Heading
              size="heading6xl"
              as="h2"
              className="capitalize sm:text-[28px]"
            >
              shop by categories
            </Heading>
            <div className="flex w-full gap-5 md:flex-col">
              <Suspense fallback={<div>Loading feed...</div>}>
                {data.map((d, index) => (
                  <div
                    key={"categoriesList" + index}
                    className="flex w-full flex-col items-center gap-2"
                  >
                    <Img
                      src={d.hairCareImage}
                      width={426}
                      height={470}
                      alt="hair care image"
                      className="h-[470px] w-full object-cover md:h-auto"
                    />
                    <Heading
                      size="text5xl"
                      as="p"
                      className="border-b border-solid border-black-900 py-[3px] capitalize"
                    >
                      {d.hairCareLabel}
                    </Heading>
                  </div>
                ))}
              </Suspense>
            </div>
          </div>
          <div className="flex items-center justify-between gap-5 md:flex-col">
            <div className="flex w-[83%] rounded-[1px] bg-gray-300 md:w-full">
              <div className="h-[2px] w-[33%] rounded-[1px] bg-black-900" />
            </div>
            <div className="flex w-[9%] items-center justify-center gap-[15px] md:w-full">
              <Text
                size="text3xl"
                as="p"
                className="!text-[16.33px] !font-medium uppercase"
              >
                1 / 2
              </Text>
              <div className="flex flex-1 justify-center gap-4">
                <Img
                  src="img_arrow_left.svg"
                  width={28}
                  height={28}
                  alt="left arrow"
                  className="h-[28px] w-[28px]"
                />
                <Img
                  src="img_arrow_right.svg"
                  width={27}
                  height={28}
                  alt="right arrow"
                  className="h-[28px] w-[27px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

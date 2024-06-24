import { Text, Button, Img } from "@/components/common";
import React, { Suspense } from "react";

const data = [
  {
    ingredientsIcon: "img_group_1400002293.png",
    ingredientsText: (
      <>
        Natural <br /> ingredients
      </>
    ),
    imgClassName: "p-[5px] sm:p-[8px]",
  },
  {
    ingredientsIcon: "img_group_1400002292.png",
    ingredientsText: (
      <>
        no harsh <br /> chemicals
      </>
    ),
    imgClassName: "p-[5px] sm:p-[8px]",
  },
  {
    ingredientsIcon: "img_group_1400002295.png",
    ingredientsText: (
      <>
        dermatologically <br /> tested
      </>
    ),
    imgClassName: "p-[8px] sm:p-[11px] lg:p-[14px]",
  },
  {
    ingredientsIcon: "img_group_1400002294.png",
    ingredientsText: (
      <>
        cruelty <br /> free
      </>
    ),
    imgClassName: "p-[6px] sm:p-[8px]",
  },
];

export default function WowFeatures({ ...props }) {
  return (
    <div
      {...props}
      className={`${props.className} max-w-[1200px] flex mt-[22px] sm:mt-7 mb-[28px] lg:my-8 justify-evenly sm:justify-center sm:w-[90%] md:w-[80%] xl:w-[73%] w-full lg:gap-8`}>
      {data.map((d, index) => (
        <div
          key={"featuresList" + index}
          className="flex w-1/4 flex-col lg:flex-row items-center justify-center gap-1 lg:gap-4 xl:gap-6">
          <div
            className={`flex h-10 w-10 sm:h-12 sm:w-12 md:w-14 md:h-14 lg:h-[59px] lg:w-[59px] items-center justify-center rounded-[29px] bg-blue-50 p-1.5 ${d.imgClassName}`}>
            <Img
              src={d.ingredientsIcon}
              width={59}
              height={59}
            />
          </div>
          <Text
            size="text3xl"
            as="p"
            className="text-center lg:text-start !text-xs sm:!text-sm lg:!text-base capitalize">
            {d.ingredientsText}
          </Text>
        </div>
      ))}
    </div>
  );
}

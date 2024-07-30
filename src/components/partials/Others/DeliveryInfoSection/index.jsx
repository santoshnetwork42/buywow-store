// src/components/DeliveryInfoSection.jsx
import { Text, Img } from "@/components/elements";
import React from "react";

const DeliveryInfoItem = ({ icon, text }) => (
  <div className="flex flex-col items-center justify-center gap-1.5 sm:w-1/3 sm:gap-2 md:flex-row md:gap-3 lg:gap-4">
    <div className="flex max-w-10 rounded-full sm:max-w-12 md:max-w-14 lg:max-w-[60px]">
      <Img
        src={icon}
        width={60}
        height={60}
        alt="delivery icon"
        className="aspect-square h-auto w-full object-contain"
      />
    </div>
    <Text
      as="p"
      size="base"
      className="line-clamp-2 w-fit text-center capitalize md:text-left"
      responsive
    >
      {text}
    </Text>
  </div>
);

const DeliveryInfoSection = ({ data, className, ...props }) => {
  return (
    <div
      {...props}
      className={`${className} mx-auto flex w-full items-center justify-around sm:justify-evenly xl:w-[80vw]`}
    >
      {data.items.map((item) => (
        <DeliveryInfoItem key={item.id} icon={item.icon} text={item.text} />
      ))}
    </div>
  );
};

export default DeliveryInfoSection;

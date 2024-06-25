"use client";

import React from "react";
import Link from "next/link";
import { Heading, Img, Text } from "@/components/common";
import SliderComponent from "@/components/features/Slider/SliderScroll";
import { useDeviceWidth } from "@/utils/useDeviceWidth";

const SliderItemSection = ({ sectionData, ItemComponent }) => {
  const width = useDeviceWidth();
  if (!width) return null;
  if (!sectionData || !sectionData.items || sectionData.items.length === 0) {
    return null;
  }

  const { title, items } = sectionData;

  const renderItems = () => {
    if (width >= 576) {
      return items.map((item, index) => (
        <ItemComponent
          key={`item-${index}`}
          {...item}
        />
      ));
    } else {
      return Array.from({ length: Math.ceil(items.length / 2) }, (_, index) => (
        <div
          key={`item-group-${index}`}
          className="flex flex-col gap-5">
          {items.slice(index * 2, index * 2 + 2).map((item, subIndex) => (
            <ItemComponent
              key={`item-${index}-${subIndex}`}
              {...item}
            />
          ))}
        </div>
      ));
    }
  };

  return (
    <section className="self-stretch">
      <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-5">
        <Heading
          size="heading6xl"
          as="h1"
          className="capitalize">
          {title}
        </Heading>
        <SliderComponent
          items={renderItems()}
          className="w-full"
        />
      </div>
    </section>
  );
};

const SliderItem = ({
  image,
  title,
  link,
  className = "max-w-[100px] sm:max-w-[260px] w-full sm:w-[20vw] md:w-[20vw] lg:w-[22vw] xl:w-[20vw] overflow-hidden max-sm:p-[3px]",
  width = 260,
  height = 260,
  aspectRatio = "aspect-[260/260]",
}) => (
  <div className={className}>
    <Link href={link || "#"}>
      <div className="w-full rounded sm:rounded-md lg:rounded-lg overflow-hidden">
        <Img
          src={image}
          width={width}
          height={height}
          alt={`${title} image`}
          className={`w-full ${aspectRatio}`}
        />
      </div>
      <Text
        size="text5xl"
        as="h2"
        className="capitalize font-medium md:font-normal mt-1 sm:mt-2 lg:mt-3 border-b w-fit m-auto border-b-black-900 truncate line-clamp-1">
        {title}
      </Text>
    </Link>
  </div>
);

export { SliderItemSection, SliderItem };

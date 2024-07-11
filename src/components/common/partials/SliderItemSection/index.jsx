"use client";

import React from "react";
import Link from "next/link";
import { Heading, Img } from "@/components/common";
import SliderComponent from "@/components/features/Slider/SliderScroll";
import { useDeviceWidth } from "@/utils/hooks/useDeviceWidth";

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
        <ItemComponent key={`item-${index}`} {...item} />
      ));
    } else {
      return Array.from({ length: Math.ceil(items.length / 2) }, (_, index) => (
        <div key={`item-group-${index}`} className="flex flex-col gap-5">
          {items.slice(index * 2, index * 2 + 2).map((item, subIndex) => (
            <ItemComponent key={`item-${index}-${subIndex}`} {...item} />
          ))}
        </div>
      ));
    }
  };

  return (
    <section className="self-stretch">
      <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-5">
        <Heading size="heading" as="h1" responsive>
          {title}
        </Heading>
        <SliderComponent items={renderItems()} />
      </div>
    </section>
  );
};

const SliderItem = ({
  image,
  title,
  link,
  className = "overflow-hidden",
  imageClassName = "w-full object-contain",
  width = 260,
  height = 260,
  aspectRatio = "aspect-[260/260]",
}) => (
  <div className={className}>
    <Link href={link || "#"}>
      <div
        className={`overflow-hidden rounded sm:rounded-md lg:rounded-lg ${imageClassName}`}
      >
        <Img
          src={image}
          width={width}
          height={height}
          alt={`${title} image`}
          className={`w-full object-contain ${aspectRatio}`}
        />
      </div>
      <Heading
        size="xl"
        as="h3"
        className="m-auto mt-1 line-clamp-1 w-fit truncate border-b border-b-black-900 pb-1 capitalize sm:mt-2 lg:mt-3"
        responsive
      >
        {title}
      </Heading>
    </Link>
  </div>
);

export { SliderItemSection, SliderItem };

import { Img } from "@/components/common";
import { useDeviceWidth } from "@/hooks/useDeviceWidth";
import React from "react";

const ProductImageSection = ({ imageList }) => {
  const width = useDeviceWidth();
  if (!width) return;

  const items = imageList.map((data, index) => {
    const isDesktop = width > 576;
    const dimensions = isDesktop
      ? { width: 620, height: 480 }
      : { width: 351, height: 303 };
    const aspectRatio = `${dimensions.width} / ${dimensions.height}`;

    return (
      <React.Fragment key={index}>
        <Img
          src={data}
          width={dimensions.width}
          height={dimensions.height}
          alt={`hero image ${index}`}
          className={`w-full object-contain`}
          style={{ aspectRatio }}
        />
      </React.Fragment>
    );
  });

  const thumbnailItems = imageList.map((data, index) => (
    <div key={index} className="cursor-pointer">
      <Img
        src={data}
        width={351}
        height={303}
        alt={`thumbnail image ${index}`}
        style={{ aspectRatio: "351 / 303" }}
        className="aspect-square w-full object-contain"
      />
    </div>
  ));

  return (
    <div className="flex max-h-[34rem] justify-center">
      <div className="hidden flex-col gap-2 overflow-scroll py-2 sm:flex sm:w-[20%]">
        {thumbnailItems}
      </div>
      <div className="flex gap-2 overflow-scroll py-2 sm:w-[80%]">{items}</div>
    </div>
  );
};

export default ProductImageSection;

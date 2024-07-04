import { Img } from "@/components/common";
import React from "react";

const ProductHighlights = ({ data, className, ...props }) => {
  return (
    <div
      className={`container-main flex flex-wrap justify-center ${className}`}
      {...props}
    >
      {data.map((image, index) => (
        <div
          key={index}
          className="flex max-w-[970px] flex-col sm:w-[90%] md:w-[80%]"
        >
          <Img
            src={image.src}
            alt={image.alt}
            height="600"
            width="970"
            className="aspect-[970/600] h-auto w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default ProductHighlights;

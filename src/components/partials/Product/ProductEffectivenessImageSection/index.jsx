import { Heading, Img } from "@/components/common";
import React from "react";

const ProductEffectivenessImageSection = ({ data, className, ...props }) => {
  const { title, img } = data;
  return (
    <div
      className={`container-main flex w-full max-w-[1120px] flex-col gap-5 px-4 sm:gap-6 lg:gap-7 ${className}`}
      {...props}
    >
      <Heading as="h4" size="2xl" className="text-center" >
        {title}
      </Heading>
      <div className="flex w-full flex-col items-center justify-center gap-9 sm:gap-10 md:flex-row md:gap-12 lg:gap-16">
        <div className="max-w-[600px] md:w-[54%]">
          <Img
            src={img.image1.src}
            height={330}
            width={600}
            alt={img.image1.alt}
            className="aspect-[600/330] h-auto w-full rounded-xl object-contain"
          />
        </div>
        <div className="max-w-[450px] md:flex-1">
          <Img
            src={img.image2.src}
            height={344}
            width={450}
            alt={img.image2.alt}
            className="aspect-[450/344] h-auto w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductEffectivenessImageSection;

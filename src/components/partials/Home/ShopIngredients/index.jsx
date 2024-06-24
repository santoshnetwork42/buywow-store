import { Heading, Img } from "@/components/common";
import React, { Suspense } from "react";

const data = [
  { onionImage: "img_image_2076.png", onionCaption: "Onion" },
  { onionImage: "img_image_2076_83x248.png", onionCaption: "Vitamin C" },
  { onionImage: "img_image_2076_1.png", onionCaption: "rosemary" },
  { onionImage: "img_image_2076_2.png", onionCaption: "ubtan" },
  { onionImage: "img_image_2076_3.png", onionCaption: "apple cider vinegar" },
  { onionImage: "img_image_2076_4.png", onionCaption: "hemp" },
  { onionImage: "img_image_2076_5.png", onionCaption: "aloevera" },
  { onionImage: "img_image_2076_6.png", onionCaption: "charcoal" },
  { onionImage: "img_image_2076_7.png", onionCaption: "coconut" },
  {
    onionImage: "img_image_2076_8.png",
    onionCaption: "himalayan rose",
  },
];

export default function ShopIngredients({ ...props }) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col self-stretch items-center justify-center gap-[15px] container-xs`}
    >
      <Heading size="heading6xl" as="h2" className="capitalize sm:text-[28px]">
        shop by ingredients
      </Heading>
      <div className="grid grid-cols-5 justify-center gap-[17px] self-stretch md:grid-cols-3 sm:grid-cols-1">
        <Suspense fallback={<div>Loading feed...</div>}>
          {data.map((d, index) => (
            <div
              key={"ingredientsGrid" + index}
              className="relative rounded-lg h-[83px] overflow-hidden w-full md:h-auto"
            >
              <Img
                src={d.onionImage}
                width={248}
                height={83}
                alt="onion image"
                className="h-[83px] w-full object-cover"
              />
              <Heading
                size="text6xl"
                as="p"
                className="absolute bottom-0 left-[20.00px] top-0 my-auto w-2/3 h-max capitalize"
              >
                {d.onionCaption}
              </Heading>
            </div>
          ))}
        </Suspense>
      </div>
    </div>
  );
}

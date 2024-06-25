import { Button, Text, Heading, Img } from "@/components/common";
import React from "react";

export default function CustomerReviewCard({
  productimage = "img_image_2062.png",
  useragetext = "Trisha, 25 y/o",
  userreviewtext = "If you&#39;re looking for a product that provides deep hydration, look no further. This aloe vera gel has transformed my skin. It keeps my face moisturized and refreshed, even during the driest days.",
  skinconcernstext,
  concernimage = "img_rectangle_35.png",
  productnametext = "Pure Aloe Vera Gel",
  currentpricetext = "₹339",
  originalpricetext = "₹339",
  addtocartbutton = "Add",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col w-full gap-3`}>
      <Img
        src={productimage}
        width={426}
        height={250}
        alt="product image"
        className="h-[250px] w-full object-cover"
      />
      <div className="flex flex-col items-start gap-2.5 self-stretch">
        <Text
          size="text3xl"
          as="p"
          className="!font-medium">
          {useragetext}
        </Text>
        <Text
          size="text3xl"
          as="p"
          className="w-full leading-[140%]">
          {userreviewtext}
        </Text>
        <div className="flex items-center justify-between gap-5 self-stretch">
          <Text
            size="text3xl"
            as="p"
            className="w-[38%] !font-medium leading-[140%]">
            <span className="text-sm font-normal text-black-900">
              <>
                Concern:
                <br />
              </>
            </span>
            <span className="text-black-900">Dry skin, pigmentation</span>
          </Text>
          <div className="flex w-[49%] items-center justify-between gap-5 rounded bg-lime-100 p-2">
            <div className="flex flex-col items-center justify-center rounded bg-white-a700_01">
              <Img
                src={concernimage}
                width={44}
                height={49}
                alt="concern image"
                className="h-[49px] rounded-sm object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col items-start gap-[5px]">
              <Text
                as="p"
                className="!font-medium">
                {productnametext}
              </Text>
              <div className="flex items-end self-stretch">
                <Heading
                  size="headingmd"
                  as="p"
                  className="!font-semibold capitalize">
                  {currentpricetext}
                </Heading>
                <Text
                  size="textlg"
                  as="p"
                  className="capitalize line-through">
                  {originalpricetext}
                </Text>
                <Button className="ml-6 flex h-[22px] min-w-[47px] flex-row items-center justify-center rounded-[11px] bg-yellow-900 px-3 text-center text-xs font-medium capitalize text-white-a700_01">
                  {addtocartbutton}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Button, Heading, Img } from "@/components/common";
import React from "react";

export default function ShopBanner({
  testimonialtext = "tried, tested & loved by",
  customercount,
  shopbutton = "Shop skincare",
  ...props
}) {
  return (
    <>
      {/* testimonial section */}
      <div {...props} className={`${props.className} self-stretch`}>
        <div className="flex h-[301px] w-full items-center justify-center rounded-[16px] bg-[url(/images/img_frame_1400005904.png)] bg-cover bg-no-repeat md:h-auto">
          <div className="container-xs flex justify-center px-[299px] md:p-5 md:px-5">
            <div className="flex w-full items-center justify-between gap-5 md:flex-col">
              <Img
                src="img_copy_of_side_image.png"
                width={257}
                height={301}
                alt="sideimage"
                className="h-[301px] w-[36%] object-cover md:w-full"
              />
              <div className="flex w-[53%] flex-col items-center gap-[19px] md:w-full">
                <div className="flex flex-col items-center justify-center self-stretch">
                  <Heading
                    size="text6xl"
                    as="p"
                    className="capitalize !text-white-a700_01"
                  >
                    {testimonialtext}
                  </Heading>
                  <Heading
                    size="heading8xl"
                    as="h1"
                    className="capitalize !text-white-a700_01 sm:text-[38px]"
                  >
                    <span className="font-taprom text-6xl font-normal text-white-a700_01">
                      1 lakh+&nbsp;
                    </span>
                    <span className="text-[40px] font-normal text-white-a700_01">
                      customers
                    </span>
                  </Heading>
                </div>
                <Button className="flex h-[54px] min-w-[215px] flex-row items-center justify-center rounded-[24px] bg-white-a700_01 px-8 text-center text-2xl font-medium capitalize text-black-900 md:text-[22px] sm:px-5">
                  {shopbutton}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

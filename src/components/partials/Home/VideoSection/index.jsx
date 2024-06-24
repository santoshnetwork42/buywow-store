import { Img, Button, Heading } from "@/components/common";
import React from "react";

export default function VideoSection({ ...props }) {
  return (
    <>
      {/* instagram feed section */}
      <div
        {...props}
        className={`${props.className} self-stretch container-xs`}
      >
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2.5">
            <Heading
              size="heading6xl"
              as="h2"
              className="capitalize sm:text-[28px]"
            >
              Find us on instagram
            </Heading>
            <Button className="flex h-[49px] min-w-[238px] flex-row items-center justify-center rounded-[24px] bg-yellow-900 px-5 text-center text-xl font-medium text-white-a700_01">
              @wowskinscienceindia
            </Button>
          </div>
          <div className="flex w-full gap-[15px] md:flex-col">
            <div className="relative h-[320px] w-[24%] rounded-lg md:h-auto md:w-full">
              <Img
                src="img_rectangle_26044.png"
                width={318}
                height={320}
                alt="profile image"
                className="h-[320px] w-full rounded-lg object-cover"
              />
              <Button className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-[63px] w-[63px] items-center justify-center rounded-[31px] border border-solid border-black-900 px-[11px]">
                <Img src="img_forward.svg" width={38} height={38} />
              </Button>
            </div>
            <div className="relative h-[320px] w-[24%] rounded-lg md:h-auto md:w-full">
              <Img
                src="img_rectangle_26044_320x318.png"
                width={318}
                height={320}
                alt="forward image"
                className="h-[320px] w-full rounded-lg object-cover"
              />
              <Img
                src="img_forward.svg"
                width={38}
                height={38}
                alt="forward icon"
                className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[38px] w-[38px] rounded-sm"
              />
            </div>
            <div className="relative h-[320px] w-[24%] rounded-lg md:h-auto md:w-full">
              <Img
                src="img_rectangle_26044_1.png"
                width={318}
                height={320}
                alt="image"
                className="h-[320px] w-full rounded-lg object-cover"
              />
              <Img
                src="img_forward.svg"
                width={28}
                height={33}
                alt="forward"
                className="absolute bottom-0 right-[42%] top-0 my-auto h-[33px] rounded-sm"
              />
            </div>
            <Img
              src="img_rectangle_26044_319x318.png"
              width={318}
              height={319}
              alt="rectangle"
              className="h-[319px] w-[24%] object-cover md:w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

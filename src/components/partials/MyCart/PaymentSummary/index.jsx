// components/MyCart/PaymentSummary.jsx
import { Heading, Text, Img, Button } from "@/components/common";

export default function PaymentSummary({ summary, cashback }) {
  return (
    <div className="flex flex-col items-start gap-[11px]">
      <div className="flex items-center justify-center self-stretch rounded-lg bg-blue-50 p-1.5 shadow-sm">
        <Img
          src="img_image_2037.png"
          width={24}
          height={24}
          alt="cashback icon"
          className="h-[24px] w-[24px] object-cover"
        />
        <Text size="text3xl" as="p">
          You will earn {cashback} cashback with this order.
        </Text>
      </div>
      <Heading size="text5xl" as="h5">
        Payment Summary
      </Heading>
      <div className="flex flex-col gap-[9px] self-stretch">
        <div className="flex flex-col gap-[7px]">
          <div className="flex flex-wrap justify-between gap-5">
            <Heading
              size="headingxl"
              as="h6"
              className="!font-markpro !font-bold uppercase"
            >
              <span className="font-outfit font-normal text-black-900">S</span>
              <span className="font-outfit font-normal lowercase text-black-900">
                ubTOTAL
              </span>
            </Heading>
            <Text size="text4xl" as="p" className="uppercase">
              ₹{summary.subtotal}
            </Text>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-5">
            <Text size="text4xl" as="p" className="capitalize">
              Shipping
            </Text>
            <Text size="text4xl" as="p" className="uppercase">
              ₹{summary.shipping}
            </Text>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-5">
            <Text size="text4xl" as="p" className="capitalize">
              savings
            </Text>
            <Text size="text4xl" as="p" className="uppercase">
              ₹{summary.savings}
            </Text>
          </div>
        </div>
        <div className="h-px bg-black-900" />
        <div className="flex items-start justify-between gap-5">
          <div className="flex flex-col items-start">
            <Heading
              size="heading2xl"
              as="h5"
              className="!font-markpro !font-bold uppercase"
            >
              <span className="font-outfit font-semibold text-black-900">
                T
              </span>
              <span className="font-outfit font-semibold lowercase text-black-900">
                OTAL
              </span>
            </Heading>
            <Text size="textlg" as="p" className="!text-gray-700_01">
              Inclusive of all taxes
            </Text>
          </div>
          <Heading size="heading2xl" as="h5" className="uppercase">
            ₹{summary.total}
          </Heading>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Button className="flex h-[62px] w-full flex-row items-center justify-center rounded-[31px] bg-yellow-900 px-[35px] text-center font-inter text-2xl font-semibold lowercase text-white-a700_01 sm:px-5 md:text-[22px]">
            CHECKOUT
          </Button>
          <Text size="text3xl" as="p">
            Estimated delivery within 3-5 days
          </Text>
        </div>
      </div>
    </div>
  );
}

// components/MyCart/PaymentSummary.jsx
import { Heading, Text, Img, Button } from "@/components/elements";

export default function PaymentSummary({
  cashback,
  totalPrice,
  totalListingPrice,
  couponTotal,
  prepaidDiscount,
  prepaidDiscountPercent,
  shippingTotal,
  usableRewards,
  grandTotal,
  totalSaved,
}) {
  const showStrikePrice = totalListingPrice && totalPrice < totalListingPrice;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-[calc(100%+24px)] flex-1 -translate-x-3 items-center justify-center gap-0.5 bg-blue-50 px-2 py-1.5 shadow-sm sm:w-[calc(100%+40px)] sm:-translate-x-5 md:w-full md:translate-x-0 md:rounded-lg">
        <Img
          src="img_image_2037.png"
          width={24}
          height={24}
          alt="cashback icon"
          className="aspect-square w-[24px] object-cover"
        />
        <Text size="base" as="p">
          You will earn {cashback} cashback with this order.
        </Text>
      </div>
      <div className="flex flex-col gap-2">
        <Heading size="xl" as="h3" responsive>
          Payment Summary
        </Heading>
        <div className="flex flex-col gap-1 md:gap-2">
          <div className="flex items-center justify-between">
            <Text size="lg" as="p" className="capitalize" responsive>
              Subtotal
            </Text>
            <div className="flex items-center gap-2">
              {!!showStrikePrice && (
                <Text
                  size="sm"
                  as="p"
                  className="capitalize line-through"
                  responsive
                >
                  ₹{totalListingPrice}
                </Text>
              )}
              <Text size="lg" as="p" className="capitalize" responsive>
                ₹{totalPrice}
              </Text>
            </div>
          </div>
          {!!prepaidDiscount && (
            <div className="flex items-center justify-between">
              <Text>{prepaidDiscountPercent}% Online Payment Discount</Text>
              <Text className="text-green-600">-₹{prepaidDiscount}</Text>
            </div>
          )}
          <div className="flex items-center justify-between">
            <Text size="lg" as="p" className="capitalize" responsive>
              Shipping
            </Text>
            <Text size="lg" as="p" responsive>
              ₹{shippingTotal}
            </Text>
          </div>
        </div>
        <div className="h-px bg-black-900" />
        <div className="flex flex-col">
          <div className="flex justify-between">
            <Heading size="xl" as="h3" responsive>
              Total
            </Heading>
            <div className="flex flex-col items-end gap-1">
              <Heading size="xl" as="h3" responsive>
                ₹{grandTotal}
              </Heading>
              <Text className="font-light text-green-600" size="sm">
                You Saved ₹{totalSaved.toFixed(2)}
              </Text>
            </div>
          </div>
          <Text size="xs" as="span" className="text-[#696969]">
            Inclusive of all taxes
          </Text>
        </div>
        <div className="mt-1 flex flex-col items-center gap-2.5">
          {/* "redirectTo"  only works when "onClick" is added in button*/}
          <Button
            className="w-full"
            variant="primary"
            size="large"
            redirectTo="/checkout"
            onClick={() => {}}
          >
            <Heading size="2xl" as="h2" className="text-white-a700_01">
              Checkout
            </Heading>
          </Button>
          <Text size="base" as="p" className="text-sm" responsive>
            Estimated delivery within 3-5 days
          </Text>
        </div>
      </div>
    </div>
  );
}

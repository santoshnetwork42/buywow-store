import { CouponAndOffer, OfferTicket } from "@/assets/svg/icons";
import { Heading, Img, Text } from "@/components/elements";
import Accordion from "@/components/features/Accordion";
import ToggleArrow from "@/components/features/Accordion/AccordionToggle";
import { copyText, toDecimal } from "@/utils/helpers";
import { useFeaturedCoupons, useFreebie } from "@wow-star/utils";
import { useState } from "react";

const BestPriceDisplay = ({ bestCoupon, price, hasInventory }) => {
  const freeProduct = useFreebie();
  const { coupon, discount } = bestCoupon || {};
  const isProductCoupon = coupon?.couponType === "PRODUCT";

  if (!bestCoupon || !hasInventory) return null;

  return (
    <div className="flex justify-between rounded bg-gray-50 px-3 pb-2 pt-2.5 sm:w-[100%] md:w-full xl:w-[60%]">
      <div className="flex gap-2">
        <div className="aspect-square w-6 md:w-7">
          <Img
            src="img_product_best_price_display.svg"
            width={28}
            height={28}
            className="aspect-square h-auto w-full object-contain"
            isStatic
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <Heading size="base" as="h4" className="text-sm" responsive>
            Best Price
          </Heading>
          <div className="flex items-center gap-1">
            <Text as="span" size="sm" className="font-light" responsive>
              Use code:
            </Text>
            <Text as="span" size="sm" responsive>
              {coupon?.code}
            </Text>
            <Text
              as="span"
              size="sm"
              onClick={() =>
                copyText(coupon?.code, `Coupon code copied: ${coupon?.code}`)
              }
              className="cursor-pointer underline"
              responsive
            >
              Copy
            </Text>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Heading as="h4" size="base" className="text-sm font-bold" responsive>
          ₹{toDecimal(price - discount)}
        </Heading>
        <Text as="span" size="sm" className="line-through" responsive>
          ₹{toDecimal(price)}
        </Text>
      </div>
    </div>
  );
};

const AllOffers = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pdpFeaturedCoupons = [] } = useFeaturedCoupons(false, productId);

  if (pdpFeaturedCoupons?.length === 0) return null;
  return (
    <Accordion
      title={""}
      imgUrl={""}
      className="flex flex-1 rounded-md bg-blue-50 px-3 sm:w-[100%] md:w-full xl:w-[60%]"
      header={
        <div
          className="flex w-full items-center justify-between py-3 text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <CouponAndOffer className="h-4 w-4" size={28} />
            <Text>{pdpFeaturedCoupons?.length} Offers Available</Text>
          </div>
          <ToggleArrow open={isOpen} />
        </div>
      }
      accordionMainContainerClassName="mt-0 mb-0"
    >
      <div className="flex flex-col pb-1">
        {pdpFeaturedCoupons?.map((item, index) => {
          const { coupon } = item || {};
          const { couponTitle, code } = coupon || {};
          return (
            <div
              key={index}
              className="border-black flex flex-row items-center justify-between gap-2 border-t-[0.25px] border-black-900 py-1.5"
            >
              <div className="flex place-items-start gap-2">
                <OfferTicket size={16} color="#000000" />
                <div className="flex flex-col gap-2">
                  <Text as="span" size="sm" className="text-sm" responsive>
                    {couponTitle}
                  </Text>
                  <Text as="span" size="sm" className="text-sm" responsive>
                    Applicable on certain products
                  </Text>
                </div>
              </div>
              <div className="flex flex-col place-items-end gap-2">
                <Text size="sm" className="text-sm" responsive>
                  Use code
                </Text>
                <div className="h-fit rounded-full border-[1px] border-dashed border-black-900 bg-white-a700 px-2 py-1">
                  <Text
                    size="sm"
                    className="cursor-pointer text-sm"
                    responsive
                    onClick={() =>
                      copyText(code, `Coupon code copied: ${code}`)
                    }
                  >
                    {code}
                  </Text>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Accordion>
  );
};

const OffersAndDiscounts = ({ bestCoupon, price, hasInventory, productId }) => {
  if (!bestCoupon || !hasInventory) return null;
  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-col sm:items-center sm:gap-2.5 md:flex-col md:items-stretch lg:gap-3 xl:flex-row xl:items-center">
      <BestPriceDisplay
        bestCoupon={bestCoupon}
        price={price}
        hasInventory={hasInventory}
      />
      <AllOffers productId={productId} />
    </div>
  );
};

export default OffersAndDiscounts;

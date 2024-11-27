import { Heading, Img, Text } from "@/components/elements";
import Accordion from "@/components/features/Accordion";
import { copyText, toDecimal } from "@/utils/helpers";
import { useFeaturedCoupons, useFreebie } from "@wow-star/utils-cms";
import dynamic from "next/dynamic";

const OfferTicket = dynamic(() => import("@/src/assets/svg/offerTicket"));
const CouponAndOffer = dynamic(() => import("@/src/assets/svg/couponAndOffer"));

const BestPriceDisplay = ({ bestCoupon, price, hasInventory }) => {
  const freeProduct = useFreebie();
  const { coupon, discount } = bestCoupon || {};
  const isProductCoupon = coupon?.couponType === "PRODUCT";

  if (!bestCoupon || !hasInventory) return null;

  const finalPrice = price - discount >= 0 ? price - discount : price;

  return (
    <div className="flex h-fit w-full justify-between rounded bg-gray-50 px-3 pb-2 pt-2.5">
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
            {isProductCoupon ? `Free Product` : `Best Price`}
            {isProductCoupon ? (
              <Text
                as="div"
                size="sm"
                className="font-light md:mt-1"
                responsive
              >
                {coupon?.getYStoreProduct?.title}
                {coupon?.getYStoreProduct?.sku === "WOW_GIFT"
                  ? ""
                  : ` worth ₹ ${coupon?.getYStoreProduct?.price} on orders above ₹${coupon?.minOrderValue}`}
              </Text>
            ) : (
              <></>
            )}
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
      {!isProductCoupon && (
        <div className="flex flex-col items-end gap-2">
          <Heading as="h4" size="base" className="text-sm font-bold" responsive>
            ₹{toDecimal(finalPrice)}
          </Heading>
          {finalPrice !== price && (
            <Text as="span" size="sm" className="line-through" responsive>
              ₹{toDecimal(price)}
            </Text>
          )}
        </div>
      )}
    </div>
  );
};

const AllOffers = ({ product, bestCoupon }) => {
  const { pdpFeaturedCoupons = [] } = useFeaturedCoupons(false, product);

  //exclude bestCoupon from pdpFeaturedCoupons
  const filteredPdpFeaturedCoupons = pdpFeaturedCoupons?.filter(
    (pdpFeaturedCoupon) =>
      bestCoupon?.coupon?.couponId !== pdpFeaturedCoupon.coupon.id,
  );

  if (filteredPdpFeaturedCoupons?.length === 0) return null;

  return (
    <Accordion
      className="my-auto flex h-fit w-full shrink-0 rounded bg-blue-50 px-3"
      header={
        <div className="flex items-center gap-2 py-2.5 md:py-3">
          <CouponAndOffer className="size-6 md:size-7" size={28} />
          <Heading as="h4" size="base" className="text-sm" responsive>
            {filteredPdpFeaturedCoupons?.length} Offers Available
          </Heading>
        </div>
      }
      accordionMainContainerClassName="!my-0 !px-0"
    >
      <div className="flex flex-col pb-1">
        {filteredPdpFeaturedCoupons?.map((item, index) => {
          const { coupon } = item || {};
          const { couponTitle, code } = coupon || {};

          return (
            <div
              key={index}
              className="flex items-center justify-between gap-2 border-t-[0.25px] border-black-900 py-1.5"
            >
              <div className="flex gap-2">
                <OfferTicket
                  className="mt-0.5 size-4 shrink-0"
                  size={16}
                  color="#000000"
                />
                <div className="flex flex-col gap-1.5">
                  <Heading as="h4" size="sm">
                    {couponTitle}
                  </Heading>
                  <Text as="span" size="sm" responsive>
                    Applicable on certain products
                  </Text>
                </div>
              </div>
              <div className="flex flex-col place-items-end gap-1">
                <Text as="span" size="sm" className="font-light" responsive>
                  Use code
                </Text>
                <Text
                  as="span"
                  size="sm"
                  onClick={() => copyText(code, `Coupon code copied: ${code}`)}
                  className="cursor-pointer rounded-full border border-dashed border-black-900 bg-white-a700 px-2 py-0.5"
                  responsive
                >
                  {code}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </Accordion>
  );
};

const OffersAndDiscounts = ({ bestCoupon, price, hasInventory, product }) => {
  if (!hasInventory) return null;

  return (
    <div className="mt-4 flex flex-col gap-2 sm:gap-2.5 lg:gap-3">
      {!!bestCoupon && (
        <BestPriceDisplay
          bestCoupon={bestCoupon}
          price={price}
          hasInventory={hasInventory}
        />
      )}
      <AllOffers product={product} bestCoupon={bestCoupon} />
    </div>
  );
};

export default OffersAndDiscounts;

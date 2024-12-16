import CouponAndOffer from "@/assets/svg/couponAndOffer";
import DiscountIcon from "@/assets/svg/discountIcon";
import { BagIcon } from "@/assets/svg/icons";
import SummaryItem from "@/components/common/CheckoutSummaryItem";
import { Heading, Text } from "@/components/elements";
import Accordion from "@/components/features/Accordion";
import ToggleArrow from "@/components/features/Accordion/AccordionToggle";
import ProductPricing from "@/components/partials/CartDrawer/MainCartSection/ProductItem/ProductDetails/ProductPricing";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";
import { toDecimal } from "@/utils/helpers";
import React, { useMemo, useState } from "react";

const OrderSummary = ({
  cartList,
  totalPrice,
  totalListingPrice,
  appliedCoupon,
  couponTotal,
  selectedPaymentMethod,
  prepaidDiscount,
  prepaidDiscountPercent,
  codCharges,
  appliedCODCharges,
  shippingTotal,
  usableRewards,
  isRewardApplied,
  grandTotal,
  totalSaved,
  inventoryMapping,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  const renderProductList = useMemo(
    () =>
      cartList?.map((product, index) => {
        const isFreeProduct =
          product?.cartItemType === "FREE_PRODUCT" ||
          product?.cartItemType === "AUTO_FREE_PRODUCT";
        const isOutOfStock =
          inventoryMapping && product.qty > inventoryMapping[product.recordKey];

        return (
          <div className="flex flex-col" key={index}>
            <div
              key={index}
              className="flex w-full gap-2.5 rounded-md rounded-b-none border border-b-0 p-2 shadow-sm md:p-2.5"
            >
              <div className="max-h-22 max-w-20 overflow-hidden rounded bg-lime-50">
                <ProductThumbnail
                  width={170}
                  height={170}
                  imageKey={product?.thumbImage}
                  className="aspect-square h-auto w-full object-contain"
                  alt="Product Image"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Text
                  as="span"
                  size="base"
                  className="line-clamp-2 text-sm"
                  responsive
                >
                  {product?.title}
                </Text>
                {isOutOfStock ? (
                  <Text
                    as="span"
                    size="sm"
                    className="mt-auto w-fit rounded-md bg-gray-400 px-2 py-0.5 text-white-a700"
                    responsive
                  >
                    Out of Stock
                  </Text>
                ) : (
                  <>
                    <ProductPricing
                      price={product?.price}
                      listingPrice={product?.listingPrice}
                      cartItemType={product?.cartItemType}
                      isFreeProduct={isFreeProduct}
                      slug={product?.slug}
                    />
                    {!!product?.qty && (
                      <Text
                        size="sm"
                        as="p"
                        className="text-gray-500"
                        responsive
                      >
                        Qty: {product?.qty}
                      </Text>
                    )}
                  </>
                )}
              </div>
            </div>
            {!!appliedCoupon &&
              !!appliedCoupon?.code &&
              product?.isCouponApplied && (
                <Text
                  as="span"
                  size="xs"
                  className="bg-green-100_01 flex w-full items-center justify-center rounded-lg rounded-t-none border border-t-0 py-0.5 font-medium shadow-[0_4px_4px_#0000000D]"
                >
                  <DiscountIcon
                    width={20}
                    height={20}
                    color="green"
                    className="mr-2"
                  />
                  {`“${appliedCoupon?.code}” applied`}
                </Text>
              )}
          </div>
        );
      }),
    [cartList, inventoryMapping],
  );

  const renderSummaryItems = useMemo(
    () => (
      <>
        <SummaryItem
          label="Subtotal"
          value={totalPrice}
          originalValue={totalListingPrice}
        />
        {!!appliedCoupon && !!couponTotal && (
          <SummaryItem
            label={`Discounts (${appliedCoupon?.code})`}
            value={-couponTotal}
            color="text-green-600"
          />
        )}
        {selectedPaymentMethod === "PREPAID" && prepaidDiscount > 0 && (
          <SummaryItem
            label={`${prepaidDiscountPercent}% Online Payment Discount`}
            value={-prepaidDiscount}
            color="text-green-600"
          />
        )}
        {!!codCharges && (
          <SummaryItem
            label="COD Charges"
            value={appliedCODCharges ? appliedCODCharges : "Free"}
            originalValue={codCharges}
            color={appliedCODCharges ? "text-black-600" : "text-green-600"}
          />
        )}
        <SummaryItem
          label="Shipping"
          value={shippingTotal ? shippingTotal : "Free"}
          originalValue={shippingTotal < 50 ? 50 : null}
          color={shippingTotal ? "text-black-600" : "text-green-600"}
        />
        {!!usableRewards && isRewardApplied && (
          <SummaryItem
            label="WOW Cash"
            value={-usableRewards}
            color="text-green-600"
          />
        )}
      </>
    ),
    [
      totalPrice,
      totalListingPrice,
      appliedCoupon,
      couponTotal,
      selectedPaymentMethod,
      prepaidDiscount,
      prepaidDiscountPercent,
      codCharges,
      appliedCODCharges,
      shippingTotal,
      usableRewards,
      isRewardApplied,
    ],
  );

  return (
    <Accordion
      accordionMainContainerClassName="!px-1"
      showToggleArrow={false}
      header={
        <div
          className="flex w-full items-center justify-between py-3 text-left"
          onClick={toggleAccordion}
        >
          <div className="flex gap-2">
            <div className="mt-1">
              <BagIcon />
            </div>
            <div className="flex flex-col gap-1">
              <Text as="span" size="base">
                Order Summary
              </Text>
              <Text as="span" size="sm" className="text-green-600" responsive>
                You Saved ₹{toDecimal(totalSaved)}
              </Text>
            </div>
            <ToggleArrow open={isOpen} />
          </div>
          <Text as="span" size="lg" className="text-base" responsive>
            ₹{toDecimal(grandTotal)}
          </Text>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        {renderProductList}
        <div className="mt-1 flex flex-col gap-2">{renderSummaryItems}</div>
        <div className="h-px bg-black-900" />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col justify-between gap-0.5">
            <div className="flex justify-between gap-2">
              <Heading size="xl" as="h3" responsive>
                Total
              </Heading>
              <Heading size="xl" as="h3" responsive>
                ₹{grandTotal.toFixed(2)}
              </Heading>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Text size="xs" as="span" className="text-[#696969]">
                Inclusive of all taxes
              </Text>
              <Text className="text-green-600" size="sm">
                You Saved ₹{totalSaved?.toFixed(2)}
              </Text>
            </div>
          </div>
          <Text as="span" size="sm" className="text-gray-600" responsive>
            Estimated delivery within 5-7 days
          </Text>
        </div>
      </div>
    </Accordion>
  );
};

export default React.memo(OrderSummary);

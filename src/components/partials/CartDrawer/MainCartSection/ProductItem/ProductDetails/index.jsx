import Checkmark from "@/assets/svg/checkmark/icon";
import CouponAndOffer from "@/assets/svg/couponAndOffer";
import { Heading, Text } from "@/components/elements";
import ProductPricing from "@/components/partials/CartDrawer/MainCartSection/ProductItem/ProductDetails/ProductPricing";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import Link from "next/link";
import React from "react";

const ProductDetails = ({
  title,
  price,
  slug,
  hasInventory,
  currentInventory,
  listingPrice,
  cartItemType,
  isLTOProduct,
  isFreeProduct,
  quantity,
  couponMessage,
  isCouponApplied,
  appliedCoupon,
}) => {
  const { code = "" } = appliedCoupon || {};
  const { handleCartVisibility } = useModalDispatch();

  return (
    <div className="flex flex-1 flex-col justify-between gap-1">
      <div className="flex flex-col gap-1">
        <Link
          prefetch={false}
          href={`/product/${slug}`}
          onClick={() => handleCartVisibility(false)}
        >
          <Heading
            size="base"
            as="h4"
            className="line-clamp-3"
            title={title}
            responsive
          >
            {title}
          </Heading>
        </Link>

        {isLTOProduct && (
          <div className="my-2 flex items-center gap-2">
            <Checkmark className="size-4" />
            <div className="text-sm font-normal text-green-500">
              Added Successfully
            </div>
          </div>
        )}
        {isCouponApplied && !!code && (
          <div className="my-2 flex max-w-fit items-center gap-1 rounded bg-green-100 px-2">
            <CouponAndOffer
              className="size-5 md:size-5"
              size={20}
              color="green"
            />
            <div className="text-sm font-normal text-green-500">{code}</div>
          </div>
        )}

        <ProductPricing
          price={price}
          listingPrice={listingPrice}
          cartItemType={cartItemType}
          isFreeProduct={isFreeProduct}
          slug={slug}
        />
      </div>
      {!!hasInventory && currentInventory < 10 && (
        <Text size="xs" as="p" className="line-clamp-1 text-yellow-900">
          Only {currentInventory} left!
        </Text>
      )}
      {(isFreeProduct || isLTOProduct) && !!quantity && (
        <Text size="sm" as="p" className="mb-1 mt-2 text-gray-500" responsive>
          Qty: {quantity}
        </Text>
      )}
      {cartItemType === "AUTO_FREE_PRODUCT_DISABLED" && (
        <Text size="sm" as="p" className="mt-2 text-red-500" responsive>
          {couponMessage}
        </Text>
      )}
    </div>
  );
};

export default React.memo(ProductDetails);

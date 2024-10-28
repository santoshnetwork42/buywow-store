import { ShareNow } from "@/assets/svg/shareNowIcon";
import AddToCart from "@/components/common/AddToCart";
import { Button, Img, Text } from "@/components/elements";
import {
  extractAttributes,
  getDiscountPercentage,
  toDecimal,
} from "@/utils/helpers";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

const IndiaMapIcon = dynamic(() => import("@/assets/svg/indiaMapIcon"));
const VehicleIcon = dynamic(() => import("@/assets/svg/vehicleIcon"));

// Extracted Components
const MarketplaceLink = React.memo(({ marketItem }) => {
  const { url, alternativeText } = extractAttributes(marketItem.image);
  const { link } = marketItem;

  return (
    <Link
      href={link}
      className="flex items-center justify-between gap-4 rounded-full border border-yellow-600 bg-lime-50 px-4 py-1"
    >
      <div className="flex w-full justify-center">
        <Img
          src={url}
          width={100}
          height={100}
          alt={alternativeText || "Additional Ingredient"}
          className="aspect-[4/2] object-contain"
        />
      </div>
      <div>
        <ShareNow size={28} />
      </div>
    </Link>
  );
});

MarketplaceLink.displayName = "MarketplaceLink";

const MarketplaceGrid = React.memo(({ marketPlaceLinks }) => {
  const gridClass = useMemo(() => {
    switch (marketPlaceLinks?.length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
      case 4:
        return "grid-cols-2 grid-rows-2";
      default:
        return "grid-cols-1";
    }
  }, [marketPlaceLinks?.length]);

  if (!marketPlaceLinks?.length) return null;

  return (
    <div className={`grid gap-4 ${gridClass} my-2`}>
      {marketPlaceLinks.map((marketItem, index) => (
        <div
          key={index}
          className={`${
            index === 0 && marketPlaceLinks.length === 3 ? "col-span-2" : ""
          } hidden w-full md:block`}
        >
          <MarketplaceLink marketItem={marketItem} />
        </div>
      ))}
    </div>
  );
});

MarketplaceGrid.displayName = "MarketplaceGrid";

// Original Components (unchanged)
const ShippingInfo = () => (
  <div className="hidden justify-evenly gap-2 md:flex">
    <div className="flex items-center gap-1">
      <VehicleIcon size={24} />
      <Text as="p" size="sm" responsive>
        Ships within 1-2 days
      </Text>
    </div>
    <div className="flex items-center gap-1">
      <IndiaMapIcon size={16} />
      <Text as="p" size="sm" responsive>
        Shipping Across India
      </Text>
    </div>
  </div>
);

const PriceInfo = ({ price, listingPrice, discountPercentage }) => (
  <div className="flex items-center gap-2">
    <Text as="p" size="base">
      ₹{toDecimal(price)}
    </Text>
    {listingPrice > price && (
      <Text as="p" size="sm" className="text-gray-600 line-through">
        ₹{toDecimal(listingPrice)}
      </Text>
    )}
    {discountPercentage > 0 && (
      <Text
        as="p"
        size="sm"
        className="rounded-full bg-lime-100 px-2 py-1 text-[13px] md:font-medium"
      >
        {discountPercentage}% Off
      </Text>
    )}
  </div>
);

const DesktopStickyBar = ({
  isFixed,
  hasInventory,
  product,
  selectedVariant,
  thumbImage,
  title,
  price,
  listingPrice,
  discountPercentage,
  marketPlaceObject,
}) => {
  if (!isFixed || (!hasInventory && !marketPlaceObject)) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 hidden w-full border-t bg-white-a700_01 py-3 shadow-md md:block">
      <div className="container-main flex items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="size-20 shrink-0 overflow-hidden rounded bg-lime-50">
            <Img
              src={thumbImage?.imageKey}
              alt={title}
              height={200}
              width={200}
              addPrefix
              className="h-auto w-full object-contain mix-blend-darken"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Text as="h3" size="lg" className="font-semibold">
              {title}
            </Text>
            <PriceInfo
              price={price}
              listingPrice={listingPrice}
              discountPercentage={discountPercentage}
            />
          </div>
        </div>
        {marketPlaceObject ? (
          <div>
            <MarketplaceLink marketItem={marketPlaceObject} />
          </div>
        ) : (
          <div className="h-12 w-[50%] max-w-[500px] shrink-0">
            <AddToCart
              product={product}
              selectedVariant={selectedVariant}
              buttonText="Add To Cart"
              buttonClassName="w-full py-2 text-lg h-full"
              quantityClassName="flex-1 min-h-full"
              showGoToCart
            />
          </div>
        )}
      </div>
    </div>
  );
};

const AddToCartSection = React.memo(
  ({ product, selectedVariant, marketPlaceLinks }) => {
    const [isFixed, setIsFixed] = useState(false);
    const sectionRef = useRef(null);
    const borderRef = useRef(null);

    const { hasInventory, thumbImage, title, price, listingPrice } =
      product || {};

    const discountPercentage = useMemo(
      () => getDiscountPercentage(price, listingPrice),
      [price, listingPrice],
    );

    const marketPlaceObject = useMemo(
      () => (marketPlaceLinks?.length ? marketPlaceLinks[0] : null),
      [marketPlaceLinks],
    );

    const marketPlaceImage = useMemo(
      () => extractAttributes(marketPlaceObject?.image),
      [marketPlaceObject],
    );

    const checkVisibility = useCallback(() => {
      if (typeof window === "undefined") return;

      if (window.innerWidth < 768 && borderRef.current) {
        setIsFixed(
          borderRef.current.getBoundingClientRect().top <
            window.innerHeight - 60,
        );
      } else if (sectionRef.current) {
        setIsFixed(sectionRef.current.getBoundingClientRect().bottom < 0);
      }
    }, []);

    useEffect(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", checkVisibility);
        return () => window.removeEventListener("scroll", checkVisibility);
      }
    }, [checkVisibility]);

    const renderAddToCartContent = useCallback(
      () => (
        <>
          <AddToCart
            product={product}
            selectedVariant={selectedVariant}
            buttonText="Add To Cart"
            buttonClassName="w-full py-3 text-xl md:py-4"
            quantityClassName="flex-1 min-h-full"
            showGoToCart
          />
          <ShippingInfo />
        </>
      ),
      [product, selectedVariant],
    );

    const renderOutOfStockContent = useCallback(
      () => (
        <>
          <Button
            variant="primary"
            size="none"
            className="h-full w-full bg-gray-400 py-3 text-xl text-white-a700 opacity-100 md:py-4"
            disabled
          >
            Sold Out
          </Button>
          <Text
            as="p"
            size="base"
            className="hidden font-light text-red-600 md:block"
            responsive
          >
            We are working hard to be back in stock as soon as possible
          </Text>
        </>
      ),
      [],
    );

    return (
      <>
        <div ref={borderRef} />
        <div
          ref={sectionRef}
          className={twMerge(
            `z-50 mb-6 flex w-full flex-col gap-2 bg-white-a700_01 md:static md:mb-7 md:gap-2.5 md:border-0 md:py-0`,
            isFixed
              ? "container-main fixed bottom-0 left-0 mb-0 border-t py-3"
              : "",
          )}
        >
          {!marketPlaceObject ? (
            hasInventory ? (
              renderAddToCartContent()
            ) : (
              renderOutOfStockContent()
            )
          ) : (
            <div className="w-full md:hidden">
              <MarketplaceLink marketItem={marketPlaceObject} />
            </div>
          )}
        </div>

        <MarketplaceGrid marketPlaceLinks={marketPlaceLinks} />

        <DesktopStickyBar
          isFixed={isFixed}
          hasInventory={hasInventory}
          product={product}
          selectedVariant={selectedVariant}
          thumbImage={thumbImage}
          title={title}
          price={price}
          listingPrice={listingPrice}
          discountPercentage={discountPercentage}
          marketPlaceObject={marketPlaceObject}
          marketPlaceImage={marketPlaceImage}
        />
      </>
    );
  },
);

AddToCartSection.displayName = "AddToCartSection";

export default AddToCartSection;

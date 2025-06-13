import { Heading, Img, Text } from "@/components/elements";
import React, { useMemo } from "react";

const VariantSelector = React.memo(
  ({
    variantGroups,
    onVariantChange,
    isShoppable = false,
    showVariantThumbnails,
    setDefaultVariantId,
  }) => {
    const sortedVariantGroups = useMemo(
      () => [...variantGroups].sort((a, b) => a.position - b.position),
      [variantGroups],
    );

    if (!Array.isArray(variantGroups) || variantGroups.length === 0)
      return null;

    return (
      <div className="mb-6 flex flex-col gap-2 md:mb-7">
        <Heading as="h5" size="base">
          Select Pack
        </Heading>
        <div className="flex flex-col gap-4 md:gap-5">
          {sortedVariantGroups.map((group) => (
            <VariantGroup
              key={group.id}
              group={group}
              onVariantChange={onVariantChange}
              isShoppable={isShoppable}
              showVariantThumbnails={showVariantThumbnails}
              setDefaultVariantId={setDefaultVariantId}
            />
          ))}
        </div>
      </div>
    );
  },
);

const VariantGroup = React.memo(
  ({
    group,
    onVariantChange,
    isShoppable,
    showVariantThumbnails,
    setDefaultVariantId,
  }) => {
    const sortedVariantOptions = useMemo(
      () =>
        [...group.variantOptions].sort(
          (a, b) => (a?.price ?? 0) - (b?.price ?? 0),
        ),
      [group.variantOptions],
    );

    if (!group || !Array.isArray(group.variantOptions)) return null;

    return (
      <div className="flex flex-wrap gap-2 md:gap-3">
        {sortedVariantOptions.map((option) =>
          showVariantThumbnails ? (
            <VariantItem
              key={option.id}
              variant={option}
              onChange={() => {
                onVariantChange(group.id, option.id), setDefaultVariantId(null);
              }}
              isShoppable={isShoppable}
            />
          ) : (
            <VariantItemWithOutThumbnail
              key={option.id}
              variant={option}
              onChange={() => {
                onVariantChange(group.id, option.id), setDefaultVariantId(null);
              }}
              isShoppable={isShoppable}
            />
          ),
        )}
      </div>
    );
  },
);

const VariantItem = React.memo(({ variant, onChange, isShoppable }) => {
  const { title, price, listingPrice, selected, label, thumbImage, images } =
    variant;

  const productImage = thumbImage || images?.items[0]?.imageKey;

  // Modified container class to use consistent width and better flex behavior
  const containerClassName = `flex cursor-pointer gap-2 rounded bg-orange-50_01 p-1.5 ${
    selected ? "outline outline-2 outline-black-900" : ""
  } ${isShoppable ? "w-full" : "flex-col w-[112px] sm:w-[130px] md:p-2"}`;

  const discount = useMemo(
    () => (listingPrice > price ? listingPrice - price : null),
    [price, listingPrice],
  );

  if (!variant) return null;

  return (
    <div className={containerClassName} onClick={onChange}>
      {productImage && !isShoppable && (
        <div className="aspect-square rounded bg-white-a700">
          <Img
            src={productImage}
            width={300}
            height={300}
            alt={title || "Variant image"}
            addPrefix
            className="aspect-square h-auto w-full object-contain"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2">
        {(label || title) && (
          <Heading as="h6" size="sm" className="line-clamp-3">
            {label || title}
          </Heading>
        )}
        {price != null && (
          <div>
            <div className="flex items-center gap-1">
              <Heading as="h6" size="sm" className="font-semibold">
                ₹{price}
              </Heading>
              {listingPrice > price && (
                <Text as="p" size="xs" className="line-through">
                  ₹{listingPrice}
                </Text>
              )}
            </div>
            {discount != null && (
              <Text as="p" size="xs" className="font-semibold">
                Save ₹{discount}
              </Text>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

const VariantItemWithOutThumbnail = React.memo(
  ({ variant, onChange, isShoppable }) => {
    const {
      title,
      price,
      listingPrice,
      selected,
      label,
      hasInventory,
      inventory: currentInventory,
    } = variant;

    // Modified container class to use consistent width and better flex behavior
    const containerClassName = `relative p-2 overflow-hidden flex cursor-pointer gap-2 rounded  outline outline-2 outline-gray-300 ${
      selected ? "bg-yellow-900/15 !outline-black-900" : ""
    } ${isShoppable ? "w-full" : "flex-col w-[156px]"}`;

    const discount = useMemo(
      () => (listingPrice > price ? listingPrice - price : null),
      [price, listingPrice],
    );

    if (!variant) return null;

    return (
      <div className={containerClassName} onClick={onChange}>
        <div className="flex flex-1 flex-col gap-2">
          {(label || title) && (
            <Heading as="h6" size="base" className="line-clamp-2 font-bold">
              {label || title}
            </Heading>
          )}
          <div>
            {price != null && (
              <div className="flex items-center gap-1">
                <Heading as="h6" size="2xl" className="font-semibold">
                  ₹{price}
                </Heading>
              </div>
            )}
            {listingPrice > price && (
              <Text
                as="p"
                size="lg"
                className="font-semibold text-gray-600 line-through"
              >
                ₹{listingPrice}
              </Text>
            )}
            {price != null && (
              <div className="flex items-center gap-1">
                <Text as="p" size="xs" className="">
                  MRP (incl. of all taxes)
                </Text>
              </div>
            )}
          </div>
        </div>

        {!!hasInventory && !!(currentInventory < 99) && (
          <div className="flex animate-pulseCustom items-center gap-x-2">
            <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-red-600" />
            <Text as="p" size="sm" className="text-sm text-red-500">
              Last {currentInventory} units left
            </Text>
          </div>
        )}
        {discount != null && (
          <div className="border- absolute -right-8 top-4 w-32 rotate-[40deg] border-y-2 border-orange-700 text-center max-sm:top-3">
            <Text
              as="p"
              size="sm"
              className={`bg-yellow-900 px-3 py-1 font-semibold text-white-a700_01 shadow-md`}
            >
              Save ₹{discount}
            </Text>
          </div>
        )}
      </div>
    );
  },
);

VariantItemWithOutThumbnail.displayName = "VariantItemWithOutThumbnail";
VariantSelector.displayName = "VariantSelector";
VariantGroup.displayName = "VariantGroup";
VariantItem.displayName = "VariantItem";

export default VariantSelector;

import { Heading, Img, Text } from "@/components/elements";
import React, { useMemo } from "react";

const VariantSelector = React.memo(
  ({
    variantGroups,
    onVariantChange,
    isShoppable = false,
    totalOrders,
    hasInventory,
    currentInventory,
    showVariantThumbnails,
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
              totalOrders={totalOrders}
              hasInventory={hasInventory}
              currentInventory={currentInventory}
              showVariantThumbnails={showVariantThumbnails}
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
    totalOrders,
    hasInventory,
    currentInventory,
    showVariantThumbnails,
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
              onChange={() => onVariantChange(group.id, option.id)}
              isShoppable={isShoppable}
            />
          ) : (
            <VariantItemWithOutThumbnail
              key={option.id}
              variant={option}
              onChange={() => onVariantChange(group.id, option.id)}
              isShoppable={isShoppable}
              totalOrders={totalOrders}
              hasInventory={hasInventory}
              currentInventory={currentInventory}
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
  ({
    variant,
    onChange,
    isShoppable,
    totalOrders,
    hasInventory,
    currentInventory,
  }) => {
    const { title, price, listingPrice, selected, label } = variant;

    // Modified container class to use consistent width and better flex behavior
    const containerClassName = `flex cursor-pointer gap-2 rounded  outline outline-2 outline-gray-300 ${
      selected ? "bg-yellow-900/10 !outline-black-900" : ""
    } ${isShoppable ? "w-full" : "flex-col w-[130px] sm:w-[140px]"}`;

    const discount = useMemo(
      () => (listingPrice > price ? listingPrice - price : null),
      [price, listingPrice],
    );

    if (!variant) return null;

    return (
      <div className={containerClassName} onClick={onChange}>
        <div className="flex flex-1 flex-col gap-2 p-1.5">
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

        {price != null && (
          <div className="px-1.5">
            {!!(totalOrders > 0) && (
              <Text
                as="p"
                size="sm"
                className="text-sm font-medium text-green-700"
              >
                {Math.ceil((totalOrders || 0) / 1000) * 1000}+ units sold
              </Text>
            )}
            {!!hasInventory && !!(currentInventory < 99) && (
              <Text as="p" size="sm" className="text-sm text-red-500">
                Last {currentInventory} units left
              </Text>
            )}
          </div>
        )}
        {discount != null && (
          <Text
            as="p"
            size="sm"
            className={`text-center font-semibold !leading-6 !text-white-a700_01 ${selected ? "bg-yellow-900" : "bg-gray-600"} `}
          >
            Save ₹{discount}
          </Text>
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

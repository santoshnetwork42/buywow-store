import React, { useMemo } from "react";
import { Heading, Img, Text } from "@/components/elements";

const VariantSelector = React.memo(({ variantGroups, onVariantChange }) => {
  const sortedVariantGroups = useMemo(
    () => [...variantGroups].sort((a, b) => a.position - b.position),
    [variantGroups],
  );

  if (!Array.isArray(variantGroups) || variantGroups.length === 0) return null;

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Heading as="h5" size="base">
        Select Pack
      </Heading>
      <div className="flex flex-col gap-4 md:gap-5">
        {sortedVariantGroups.map((group) => (
          <VariantGroup
            key={group.id}
            group={group}
            onVariantChange={onVariantChange}
          />
        ))}
      </div>
    </div>
  );
});

const VariantGroup = React.memo(({ group, onVariantChange }) => {
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
      {sortedVariantOptions.map((option) => (
        <VariantItem
          key={option.id}
          variant={option}
          onChange={() => onVariantChange(group.id, option.id)}
        />
      ))}
    </div>
  );
});

const VariantItem = React.memo(({ variant, onChange }) => {
  const { title, price, listingPrice, selected, label, thumbImage } = variant;

  const containerClassName = useMemo(
    () =>
      `flex max-w-[112px] cursor-pointer flex-col gap-2 rounded bg-orange-50_01 p-1.5 sm:max-w-[130px] md:p-2 ${
        selected ? "outline outline-2 outline-black-900" : ""
      }`,
    [selected],
  );

  const discount = useMemo(
    () =>
      price && listingPrice && listingPrice > price
        ? listingPrice - price
        : null,
    [price, listingPrice],
  );

  if (!variant) return null;

  return (
    <div className={containerClassName} onClick={onChange}>
      {thumbImage && (
        <div className="aspect-[114/92] rounded bg-white-a700">
          <Img
            src={thumbImage}
            width={300}
            height={300}
            alt={title || "Variant image"}
            addPrefix
            isStatic
            className="aspect-[114/92] h-auto w-full object-contain p-1"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2">
        {(label || title) && (
          <div className="flex-1">
            {label && (
              <Heading as="h6" size="sm" className="line-clamp-3">
                {label}
              </Heading>
            )}
            {title && (
              <Text as="p" size="xs" className="line-clamp-2">
                {title}
              </Text>
            )}
          </div>
        )}
        {price != null && (
          <div>
            <div className="flex items-center gap-1">
              <Heading as="h6" size="sm" className="font-semibold">
                ₹{price}
              </Heading>
              {listingPrice != null && (
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

VariantSelector.displayName = "VariantSelector";
VariantGroup.displayName = "VariantGroup";
VariantItem.displayName = "VariantItem";

export default VariantSelector;

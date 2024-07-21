import { Img, Text } from "@/components/common";
import { extractAttributes } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

const CategoryItem = React.memo(({ image, title, link }) => {
  const { url, alternativeText } = extractAttributes(image);
  return (
    <Link
      href={`/collections/${link}`}
      className="flex w-20 grow-0 flex-col items-center gap-1.5"
    >
      <div className="overflow-hidden rounded-full">
        <Img
          src={url}
          alt={alternativeText}
          width={56}
          height={56}
          isStatic
          className="aspect-square w-14 object-contain"
        />
      </div>
      {title && (
        <Text
          size="sm"
          as="span"
          className="line-clamp-2 text-center capitalize"
        >
          {title}
        </Text>
      )}
    </Link>
  );
});

CategoryItem.displayName = "CategoryItem";

const TrendingCategories = ({ trendingCategoryItems: categories }) => {
  if (!categories?.length) return null;

  return (
    <div className="no-scrollbar w-full overflow-x-scroll lg:hidden">
      <div className="mx-auto flex w-max items-start justify-center p-3">
        {categories.map((category, index) => (
          <CategoryItem
            key={`category-${index}`}
            title={category?.title}
            image={category?.image}
            link={category?.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingCategories;

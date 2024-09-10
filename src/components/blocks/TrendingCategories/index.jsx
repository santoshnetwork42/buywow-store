"use client";

import { Img, Text } from "@/components/elements";
import { extractAttributes } from "@/utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryItem = ({ image, title, link }) => {
  const { url, alternativeText } = extractAttributes(image);
  return (
    <Link
      prefetch={false}
      href={`/collections/${link}`}
      className="flex w-20 grow-0 flex-col items-center gap-1.5"
    >
      <div className="overflow-hidden rounded-full">
        <Img
          src={url}
          alt={alternativeText}
          width={56}
          height={56}
          className="aspect-square w-14 object-contain"
        />
      </div>
      {!!title && (
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
};

CategoryItem.displayName = "CategoryItem";

const TrendingCategories = ({
  trendingCategoryItems: categories,
  isPersistLoading,
}) => {
  const pathname = usePathname();

  if (!categories?.length || (isPersistLoading && pathname !== "/"))
    return null;

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

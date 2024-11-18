import LinkClickTracker from "@/components/common/LinkClickTracker";
import SectionHeading from "@/components/common/SectionHeading";
import { Heading, Img, Text } from "@/components/elements";
import Slider from "@/components/features/Slider";
import { extractAttributes } from "@/utils/helpers";

const CategoryItem = ({ category, size, parentCategoryTitle, priority }) => {
  const { image, slug, title } = category;
  const { url, alternativeText } = extractAttributes(image);

  const imageSize = size === "SMALL" ? 260 : 396;
  const imageHeight = size === "SMALL" ? 260 : 470;
  const aspectRatio = size === "SMALL" ? "aspect-square" : "aspect-[396/470]";

  const linkClassName =
    size === "SMALL"
      ? "w-[calc(33vw-20px)] min-w-[100px] max-w-[260px] sm:w-[26vw] md:w-[24vw] lg:w-[22vw] xl:w-[20vw]"
      : "w-[calc(33vw-12px)] min-w-[112px] sm:w-[28vw] sm:max-w-[396px] md:w-[26vw] lg:w-[24vw] xl:w-[22vw]";

  return (
    <LinkClickTracker
      href={`/collections/${slug}` || "#"}
      className={linkClassName}
      trackingType="SHOP_BY_CLICK"
      trackingEventPayload={{
        slug,
        name: title,
        parentCategory: parentCategoryTitle,
        type: parentCategoryTitle,
      }}
    >
      <div
        className={`overflow-hidden rounded sm:rounded-md lg:rounded-lg ${aspectRatio}`}
      >
        <Img
          src={url}
          width={imageSize}
          height={imageHeight}
          alt={alternativeText || `${slug} Image`}
          className="h-auto w-full object-contain"
          priority={priority}
        />
      </div>
      <Text
        size="xl"
        as="p"
        className="m-auto mt-1 line-clamp-1 w-fit break-all border-b border-b-black-900 pb-1 font-medium sm:mt-2 lg:mt-3"
        responsive
      >
        {title}
      </Text>
    </LinkClickTracker>
  );
};

CategoryItem.displayName = "CategoryItem";

const FeaturedCategories = ({
  title,
  featuredCategoryItems: categories,
  featuredItemSize: itemSize = "SMALL",
  lazyBlock,
}) => {
  const sliderClassName = `gap-2 ${
    itemSize === "SMALL" ? "md:gap-2.5" : "sm:gap-3 md:gap-4 lg:gap-5"
  }`;

  if (!categories?.length) return null;

  return (
    <div className="container-main mb-main flex flex-col items-center justify-center">
      <SectionHeading title={title} />
      <Slider className="sm:hidden" sliderClassName={sliderClassName}>
        {categories.reduce((acc, category, index, arr) => {
          if (index % 2 === 0) {
            acc.push(
              <div
                key={`group-${index}`}
                className="flex flex-col max-sm:gap-y-6"
              >
                <CategoryItem
                  category={category}
                  size={itemSize}
                  parentCategoryTitle={title}
                  priority={!lazyBlock}
                />
                {!!arr[index + 1] && (
                  <CategoryItem
                    category={arr[index + 1]}
                    size={itemSize}
                    parentCategoryTitle={title}
                    priority={!lazyBlock}
                  />
                )}
              </div>,
            );
          }
          return acc;
        }, [])}
      </Slider>
      <Slider className="hidden sm:block" sliderClassName={sliderClassName}>
        {categories.map((category, index) => (
          <CategoryItem
            key={`category-${index}`}
            category={category}
            size={itemSize}
            parentCategoryTitle={title}
            priority={!lazyBlock}
          />
        ))}
      </Slider>
    </div>
  );
};

FeaturedCategories.displayName = "FeaturedCategories";

export default FeaturedCategories;

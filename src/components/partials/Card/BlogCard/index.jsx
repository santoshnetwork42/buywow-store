import { Heading, Img } from "@/components/elements";
import { extractAttributes } from "@/utils/helpers";
import Link from "next/link";

const BlogCard = ({
  cardData,
  isVertical = true,
  className = "",
  row,
  style,
}) => {
  if (!cardData) return null;

  const { title, image, button, bgColor } = cardData;
  const { url, alternativeText } = extractAttributes(image) || {};

  const cardClassName = `flex gap-3 h-full ${isVertical ? "flex-col" : "flex-row"} justify-between rounded-lg p-2.5 sm:p-3 lg:p-3.5 ${className}`;
  const contentClassName = `flex flex-col justify-between ${isVertical ? "mt-3 sm:mt-4 lg:mt-5 gap-5" : ""}`;
  const imageClassName = `shrink-0 overflow-hidden rounded ${isVertical ? "aspect-square" : "w-[44%] max-w-[200px] aspect-[155/112] md:aspect-[182/114]"}`;

  return (
    <div
      className={cardClassName}
      style={{
        backgroundColor: bgColor || "inherit",
        gridRow: row,
        ...style,
      }}
    >
      <div className={contentClassName}>
        {!!title && (
          <Heading
            as="h3"
            size="2xl"
            className="line-clamp-3 text-base normal-case"
            responsive
          >
            {title}
          </Heading>
        )}
        {!!button?.text && (
          <Link
            href={button?.link}
            className="w-fit rounded-full bg-yellow-900 px-3 py-1 md:px-4 md:py-2"
          >
            <Heading as="h4" size="lg" className="text-white-a700" responsive>
              {button?.text}
            </Heading>
          </Link>
        )}
      </div>
      {url && (
        <div className={imageClassName}>
          <Img
            src={url}
            className="h-full w-full object-cover"
            alt={alternativeText || "Blog Image"}
            isStatic
            width={isVertical ? 356 : 182}
            height={isVertical ? 356 : 114}
          />
        </div>
      )}
    </div>
  );
};

BlogCard.displayName = "BlogCard";

export default BlogCard;

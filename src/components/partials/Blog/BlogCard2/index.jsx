import LinkClickTracker from "@/components/common/LinkClickTracker";
import { Heading, Img, Text } from "@/components/elements";
import dayjs from "dayjs";

export default function BlogCard2({
  blog = {
    id,
    featuredImage,
    date,
    title,
    excerpt,
    slug,
  },
}) {
  return (
    <LinkClickTracker
      href={`/blog/${blog.slug}`}
      trackingType="BLOG_CLICK"
      trackingEventPayload={{
        id: blog.id,
        slug: blog.slug,
        name: blog.title,
        parentCategory: "top-blogs",
      }}
    >
      <div className="grid grid-cols-[1fr_3fr] gap-x-3">
        <div className="relative aspect-[4/3] w-full">
          <Img
            src={blog.featuredImage?.node?.mediaItemUrl}
            alt={blog.title}
            fill
            className="rounded-md"
          />
        </div>

        <div className="space-y-2">
          <Text as={"p"} className="line-clamp-1" size="sm">
            {dayjs(blog.date).format("MMMM DD, YYYY")}
          </Text>

          <Heading
            as="h6"
            size="sm"
            className="line-clamp-2 text-base normal-case"
            responsive
          >
            {blog.title}
          </Heading>
        </div>
      </div>
    </LinkClickTracker>
  );
}

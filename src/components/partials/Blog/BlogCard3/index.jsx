import LinkClickTracker from "@/components/common/LinkClickTracker";
import { Heading, Text } from "@/components/elements";
import dayjs from "dayjs";
import Image from "next/image";

export default function BlogCard3({
  blog = {
    id,
    featuredImage,
    date,
    author,
    title,
    excerpt,
    slug,
    seo: {
      readingTime,
    },
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
        parentCategory: "all",
      }}
    >
      <div className="grid items-center gap-4 md:grid-cols-[2fr,4fr]">
        <div className="relative aspect-video w-full">
          <Image
            src={blog.featuredImage?.node?.mediaItemUrl}
            alt={blog.title}
            fill
            className="rounded-md"
          />
        </div>

        <div className="space-y-3">
          <Text as={"p"} className="line-clamp-3" size="sm">
            {dayjs(blog.date).format("MMMM DD, YYYY")} | {blog.author.node.name}{" "}
            | {blog.seo.readingTime} min
          </Text>

          <Heading
            as="h5"
            size="2xl"
            className="line-clamp-3 text-base normal-case"
          >
            {blog.title}
          </Heading>

          <Text as={"div"} className="line-clamp-3" size="sm">
            {!!blog.excerpt && (
              <p
                dangerouslySetInnerHTML={{
                  __html: blog.excerpt,
                }}
              />
            )}
          </Text>
        </div>
      </div>
    </LinkClickTracker>
  );
}

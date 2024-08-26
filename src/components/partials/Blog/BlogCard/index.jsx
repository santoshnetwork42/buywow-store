import LinkClickTracker from "@/components/common/LinkClickTracker";
import { Heading, Text } from "@/components/elements";
import dayjs from "dayjs";
import Image from "next/image";

export default function BlogCard({
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
      <div className="flex h-full flex-col rounded-xl border p-3 shadow-xs">
        <div className="relative aspect-video w-full">
          <Image
            src={blog.featuredImage?.node?.mediaItemUrl}
            alt={blog.title}
            fill
            className="rounded-md"
          />
        </div>

        <Text as={"p"} className="mt-3 line-clamp-3" size="sm">
          {dayjs(blog.date).format("MMMM DD, YYYY")} | {blog.author.node.name} |{" "}
          {blog.seo.readingTime} min
        </Text>

        <Heading
          as="h5"
          size="2xl"
          className="my-2 line-clamp-2 text-base normal-case"
        >
          {blog.title}
        </Heading>

        <Text as={"div"} className="line-clamp-3" size="sm">
          {!!blog?.excerpt && (
            <p
              dangerouslySetInnerHTML={{
                __html: blog?.excerpt,
              }}
            />
          )}
        </Text>
      </div>
    </LinkClickTracker>
  );
}

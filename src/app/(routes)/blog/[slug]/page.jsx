import "@wordpress/block-library/build-style/common.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/theme.css";

import { Heading, Img, Text } from "@/components/elements";
import BlogAuthor from "@/components/partials/Blog/BlogAuthor";
import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import BlogSidebar from "@/components/partials/Blog/BlogSidebar";
import { PREBUILD_ALL_PAGES } from "@/config";
import { replaceBlogLinks } from "@/lib/replaceBlogLinks";
import {
  fetchAllBlogSlugs,
  fetchBlog,
  fetchFeaturedBlogs,
} from "@/lib/wordPressAPIs";
import handleRedirect from "@/utils/handleRedirect";
import dayjs from "dayjs";
import Link from "next/link";

export const revalidate = 86400;

export async function generateMetadata({ params }) {
  const blog = await fetchBlog(params.slug);

  if (blog) {
    return {
      siteName: "Wow Skin Science",
      title: blog?.title,
      description: blog?.seo?.metaDesc,
      image: blog?.featuredImage?.node?.mediaItemUrl,
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog?.slug}`,
      type: "article",
      authorName: blog?.author?.node?.name,
    };
  }
}

export async function generateStaticParams() {
  if (!PREBUILD_ALL_PAGES) {
    return [];
  }
  const { blogs } = await fetchAllBlogSlugs({});
  return blogs.map((blog) => ({
    slug: blog?.node?.slug,
  }));
}

export default async function ReadBlog({ params }) {
  const { slug } = params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    return await handleRedirect(`/blog/${slug}`);
  }

  const featuredBlogs = await fetchFeaturedBlogs(5);

  return (
    <div className="container-main mb-main grid grid-cols-12 gap-8 py-6">
      <div className="col-span-12 lg:col-span-9">
        <div className="grid gap-y-6">
          <BlogBreadCrumb
            links={[
              { label: "Blog", url: "/blog" },
              { label: blog?.title, url: `/blog/${blog?.slug}` },
            ]}
          />

          <div className="blog-font-size-convention space-y-3">
            <div className="flex flex-wrap gap-4">
              {blog?.categories?.nodes?.map((category, index) => (
                <Link
                  prefetch={false}
                  href={`/blog/category/${category?.slug}`}
                  key={category?.id || index}
                  className="rounded bg-yellow-900 px-2 py-1 text-sm text-white-a700"
                >
                  {category?.name}
                </Link>
              ))}
            </div>

            <Heading as="h1" size="2xl">
              {blog.title}
            </Heading>

            <Text as={"p"} size="sm">
              {blog?.author?.node?.name} |{" "}
              {dayjs(blog?.date).format("MMMM D, YYYY h:mm A")} |{" "}
              {blog?.seo?.readingTime} min read
            </Text>
          </div>

          <div className="blog-font-size-convention relative aspect-video w-full">
            <Img
              src={blog?.featuredImage?.node?.mediaItemUrl}
              alt={blog?.title}
              fill
              className="rounded-md"
            />
          </div>

          {!!blog?.content && (
            <div
              className="blog-content blog-font-size-convention"
              dangerouslySetInnerHTML={{
                __html: replaceBlogLinks(blog?.content),
              }}
            />
          )}

          <hr className="my-6 border-t border-gray-300" />

          <BlogAuthor
            name={blog?.author?.node?.name}
            avatar={blog?.author?.node.avatar?.url}
            description={blog?.author?.node?.description}
            slug={blog?.author?.node?.slug}
            linkedin={blog?.author?.node?.seo?.social?.linkedIn}
          />
        </div>
      </div>

      <BlogSidebar featuredBlogs={featuredBlogs} tags={blog?.tags?.nodes} />
    </div>
  );
}

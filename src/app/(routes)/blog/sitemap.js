import { WORDPRESS_URL } from "@/config";
import { getBlogsForSitemap } from "@/graphql/api";
import { wordpressAuth } from "@/lib/wordPressAPIs";

export default async function sitemap() {
  try {
    const blogsSitemapEntries = [];

    const fetchBlogData = async (first = 100, after) => {
      const blogRes = await fetch(WORDPRESS_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: wordpressAuth,
        },
        method: "POST",
        body: JSON.stringify({
          query: getBlogsForSitemap,
          variables: {
            first,
            after,
          },
        }),
      });

      const blogData = await blogRes.json();

      if (blogData?.data && blogData?.data?.posts?.edges) {
        const { edges: blogs } = blogData.data.posts;
        const { hasNextPage: loadMore, endCursor } =
          blogData.data.posts?.pageInfo;

        blogsSitemapEntries.push(
          ...blogs.map((blog) => ({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog?.node?.slug}`,
            lastModified: new Date(blog?.node?.date).toISOString(),
            changeFrequency: "daily",
          })),
        );
        if (loadMore) {
          await fetchBlogData(first, endCursor);
        }
      }
    };

    await fetchBlogData();

    const siteMapLinks = [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
      },
      ...blogsSitemapEntries,
    ];

    return siteMapLinks;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    };
  }
}
export const revalidate = 120;

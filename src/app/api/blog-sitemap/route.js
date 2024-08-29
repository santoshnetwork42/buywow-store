import { WORDPRESS_URL } from "@/config";
import { getBlogsForSitemap } from "@/graphql/api";
import { wordpressAuth } from "@/lib/wordPressAPIs";
import { NextResponse } from "next/server";

export async function GET() {
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
            loc: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog?.node?.slug}`,
            lastmod: new Date(blog?.node?.date).toISOString(),
            changefreq: "daily",
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
        loc: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      },
      ...blogsSitemapEntries,
    ];

    const sitemapContent = buildSitemapXml(siteMapLinks);

    return new NextResponse(sitemapContent, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.log("Error fetching data:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

const buildSitemapXml = (fields) => {
  const content = fields
    .map((fieldData) => {
      const field = Object.entries(fieldData).map(([key, value]) => {
        if (!value) return "";
        return `<${key}>${value}</${key}>`;
      });

      return `<url>${field.join("")}</url>\n`;
    })
    .join("");

  return withXMLTemplate(content);
};

const withXMLTemplate = (content) => {
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- This is the sitemap containing all entries for blog pages. -->
   \n${content}</urlset>`;
};

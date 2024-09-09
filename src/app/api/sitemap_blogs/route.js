import { WORDPRESS_AUTH, WORDPRESS_URL } from "@/config";
import { getBlogsForSitemap } from "@/graphql/api";
import { NextResponse } from "next/server";

const STORE_ENV = process.env.STORE_ENV;
const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function GET() {
  try {
    const blogsSitemapEntries = [];

    const fetchBlogData = async (first = 100, after) => {
      const blogRes = await fetch(WORDPRESS_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: WORDPRESS_AUTH,
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

      if (blogData.data && blogData.data.posts.edges) {
        const { edges: blogs } = blogData.data.posts;
        const { hasNextPage: loadMore, endCursor } =
          blogData.data.posts.pageInfo;

        blogsSitemapEntries.push(
          ...blogs.map((blog) => ({
            loc: `${NEXT_PUBLIC_SITE_URL}/blog/${blog.node.slug}`,
            lastmod: new Date(blog.node.date).toISOString(),
            changefreq: "daily",
          })),
        );
        if (loadMore) {
          await fetchBlogData(first, endCursor);
        }
      }
    };

    if (STORE_ENV === "production") {
      await fetchBlogData();
    }

    const siteMapLinks = [
      {
        loc: `${NEXT_PUBLIC_SITE_URL}`,
      },
      ...blogsSitemapEntries,
    ];

    const sitemapContent = buildSitemapXml(siteMapLinks);

    return new NextResponse(sitemapContent, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.log("Error fetching data:", error);
    return new NextResponse("Error fetching data", { status: 500 });
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

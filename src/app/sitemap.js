import { WORDPRESS_URL } from "@/config";
import { getBlogsForSitemap } from "@/graphql/api";
import { wordpressAuth } from "@/lib/wordPressAPIs";
import { getCMSPagesAPI, getPageMetadataBySlugAPI } from "@/lib/appSyncAPIs";

const { NEXT_PUBLIC_SITE_URL } = process.env;

const processPage = async (slug, type) => {
  const metadata = await getPageMetadataBySlugAPI(slug);
  if (!!Object.keys(metadata)?.length) {
    // If metadata has noIndex false & not seoCanonical, then add to sitemap
    if (!metadata.noIndex && !metadata.seoCanonical) {
      return {
        url: `${NEXT_PUBLIC_SITE_URL}${type === "PRODUCT" ? "/products" : type === "COLLECTION" ? "/collections" : ""}/${slug}`,
        lastModified: metadata.updatedAt,
        changeFrequency: "daily",
      };
    }
  }
  return null;
};

const productsLink = async () => {
  try {
    const productsPages = (await getCMSPagesAPI("product")) || [];
    const allSitemapEntries = (
      await Promise.all(
        productsPages.map((slug) => processPage(slug, "PRODUCT")),
      )
    ).filter((entry) => entry !== null);
    return allSitemapEntries;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    };
  }
};

const collectionsLink = async () => {
  try {
    const collectionsPages = (await getCMSPagesAPI("collection")) || [];
    const allSitemapEntries = (
      await Promise.all(
        collectionsPages.map((slug) => processPage(slug, "COLLECTION")),
      )
    ).filter((entry) => entry !== null);
    return allSitemapEntries;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      url: `${NEXT_PUBLIC_SITE_URL}`,
    };
  }
};

const blogsLink = async () => {
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
};

export async function generateSitemaps() {
  return [
    { id: "product" },
    { id: "collection" },
    { id: "blog" },
    { id: "static" },
  ];
}

export default async function sitemap({ id }) {
  const staticLinks = [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/health`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/policies/refund-policy`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/policies/terms-of-service`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/pages/shipping-and-delivery-policy`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/pages/contact-us`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/pages/about-us`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
    },
  ];

  switch (id) {
    case "product":
      return await productsLink();
    case "collection":
      return collectionsLink();
    case "blog":
      return await blogsLink();
    default:
      return staticLinks;
  }
}

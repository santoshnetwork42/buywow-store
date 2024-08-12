import {
  getBlog,
  getBlogs,
  getBlogsByCategory,
  getFeaturedBlogs,
} from "@/graphql/appSync/api";

export const wordpressAuth = `Basic ${Buffer.from(
  `${process.env.NEXT_PUBLIC_WP_USERNAME}:${process.env.NEXT_PUBLIC_WP_PASSWORD}`,
).toString("base64")}`;

export const fetchFeaturedBlogs = async (first = 3) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: wordpressAuth,
      },
      body: JSON.stringify({ query: getFeaturedBlogs, variables: { first } }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return data?.data?.posts?.nodes || [];
  } catch (error) {
    console.error(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return false;
  }
};

export const fetchBlogs = async (
  filters = {
    category,
    tags,
    first,
    last,
    after,
    before,
  },
) => {
  try {
    const variables = {};

    if (filters.category) variables.category = filters.category;
    if (filters.tags) variables.tag = filters.tags;
    if (filters.first) variables.first = filters.first;
    if (filters.last) variables.last = filters.last;
    if (filters.after) variables.after = filters.after;
    if (filters.before) variables.before = filters.before;

    const res = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: wordpressAuth,
      },
      body: JSON.stringify({
        query: getBlogs,
        variables: variables,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return data?.data?.posts?.edges || [];
  } catch (error) {
    console.error(JSON.stringify(error));
    return false;
  }
};

export const fetchBlog = async (slug) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: wordpressAuth,
      },
      body: JSON.stringify({
        query: getBlog,
        variables: { id: slug, idType: "SLUG" },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    console.log(data);

    return data?.data?.post || {};
  } catch (err) {
    console.log(err);
    return false;
  }
};

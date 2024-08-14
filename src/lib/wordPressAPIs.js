import {
  getAuthor,
  getAuthors,
  getBlog,
  getBlogs,
  getCategories,
  getCategory,
  getFeaturedBlogs,
  getTag,
  getTags,
  getTopMenu,
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
    console.error(JSON.stringify(error));
    return false;
  }
};

export const fetchBlogs = async (
  filters = {
    category,
    tags,
    author,
    first,
    last,
    after,
    before,
  },
) => {
  try {
    const variables = {};

    if (filters.category) variables.category = filters.category;
    if (filters.tags && filters.tags.length > 0) variables.tags = filters.tags;
    if (filters.first) variables.first = filters.first;
    if (filters.last) variables.last = filters.last;
    if (filters.after) variables.after = filters.after;
    if (filters.before) variables.before = filters.before;
    if (filters.author) variables.author = filters.author;

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

    const blogData = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    console.log("blogData", JSON.stringify(blogData, null, 2));

    return {
      blogs: blogData?.data?.posts?.edges || [],
      pageInfo: blogData?.data?.posts?.pageInfo,
    };
  } catch (error) {
    console.error(JSON.stringify(error));
    return {
      blogs: [],
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    };
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

export const fetchCategories = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: wordpressAuth,
      },
      body: JSON.stringify({
        query: getCategories,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return data?.data?.categories?.nodes || [];
  } catch (error) {
    console.error(JSON.stringify(error));
    return [];
  }
};

export const fetchCategory = async (slug) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: wordpressAuth,
      },
      body: JSON.stringify({
        query: getCategory,
        variables: { slug },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return data?.data?.category || {};
  } catch (error) {
    console.error(JSON.stringify(error));
    return false;
  }
};

export const fetchTags = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: wordpressAuth,
      },
      body: JSON.stringify({
        query: getTags,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return data?.data?.tags?.nodes || [];
  } catch (error) {
    console.error(JSON.stringify(error));
    return [];
  }
};

export const fetchTag = async (slug) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: wordpressAuth,
      },
      body: JSON.stringify({
        query: getTag,
        variables: { slug },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return data?.data?.tag || {};
  } catch (error) {
    console.error(JSON.stringify(error));
    return false;
  }
};

export const fetchAuthors = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: wordpressAuth,
      },
      body: JSON.stringify({
        query: getAuthors,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return data?.data?.users?.nodes || [];
  } catch (error) {
    console.error(JSON.stringify(error));
    return [];
  }
};

export const fetchAuthor = async (slug) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: wordpressAuth,
      },
      body: JSON.stringify({
        query: getAuthor,
        variables: { id: slug, idType: "SLUG" },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return data?.data?.user || {};
  } catch (error) {
    console.error(JSON.stringify(error));
    return false;
  }
};

export const fetchTopMenu = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: wordpressAuth,
      },
      body: JSON.stringify({
        query: getTopMenu,
        variables: { id: "dGVybTo1Mw==" },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return data?.data?.menu?.menuItems.nodes || [];
  } catch (error) {
    console.error(JSON.stringify(error));
    return [];
  }
};

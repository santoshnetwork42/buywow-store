import { fetchBlogs, fetchTopMenu } from "@/lib/wordPressAPIs";
import BlogHeaderClient from "@/components/partials/Blog/BlogHeader/BlogHeaderClient";

export default async function BlogHeader() {
  const menu = await fetchTopMenu();
  const categoryBlogs = await fetchCategoryBlogs(menu);

  return <BlogHeaderClient menu={menu} categoryBlogs={categoryBlogs} />;
}

async function fetchCategoryBlogs(menu) {
  const categoryBlogs = {};

  if (menu && menu.length > 0) {
    for (const item of menu) {
      if (item.path.includes("category")) {
        const categorySlug = item.path.split("/").pop();
        const { blogs } = await fetchBlogs({
          first: 4,
          category: categorySlug,
          tags: ["english"],
        });
        categoryBlogs[item.id] = blogs && blogs.length > 0 ? blogs : [];
      }
    }
  }

  return categoryBlogs;
}

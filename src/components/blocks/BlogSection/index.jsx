import SectionHeading from "@/components/common/SectionHeading";
import { Heading } from "@/components/elements";
import Slider from "@/components/features/Slider";
import BlogCard4 from "@/components/partials/Blog/BlogCard4";
import { SITE_URL } from "@/config";
import { getFeaturedBlogs } from "@/graphql/api";
import Link from "next/link";
import { Suspense } from "react";

async function getFeaturedBlogsData() {
  try {
    const apiUrl = SITE_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/api/blog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: getFeaturedBlogs,
        variables: { first: 5 },
      }),
      next: { revalidate: 86400, tags: ["blog"] },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch blog data");
    }

    const blogData = await res.json();
    return blogData.data.posts.nodes;
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    return [];
  }
}

export default async function BlogSection({
  title = "Explore Blogs",
  buttonText = "Read More",
}) {
  const featuredBlogs = await getFeaturedBlogsData();

  return (
    <div className="container-main mb-main flex flex-col items-center justify-center">
      <SectionHeading title={title} />
      <div className="gap px-auto flex w-full justify-evenly overflow-hidden sm:gap-5 md:gap-6 lg:gap-7">
        <Suspense fallback={<div>Loading blogs...</div>}>
          <Slider sliderClassName="gap-[10px] sm:gap-3 lg:gap-5">
            {featuredBlogs.map((blog, index) => (
              <BlogCard4 key={blog.id} blog={blog} index={index} />
            ))}
          </Slider>
        </Suspense>
      </div>
      <Link
        prefetch={false}
        href="/blog"
        className="mt-4 rounded-[24px] bg-yellow-900 px-4 py-2 text-center md:mt-5 md:px-5 md:py-3"
        aria-label="Read more blog articles"
      >
        <Heading as="h3" size="xl" className="text-white-a700_01" responsive>
          {buttonText}
          <span className="sr-only">about our blog articles</span>
        </Heading>
      </Link>
    </div>
  );
}

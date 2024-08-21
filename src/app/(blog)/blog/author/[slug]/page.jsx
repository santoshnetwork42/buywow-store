import BlogAuthor from "@/components/partials/Blog/BlogAuthor";
import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import BlogInfiniteScroll2 from "@/components/partials/Blog/BlogInfiniteScroll2";
import {
  fetchAuthor,
  fetchAuthors,
  fetchBlogs,
  fetchFeaturedBlogs,
} from "@/lib/wordPressAPIs";
import { notFound } from "next/navigation";
import React from "react";
import BlogSidebar from "@/components/partials/Blog/BlogSidebar";
import { getPublicImageURL } from "@/utils/helpers/img-loader";

export const revalidate = 60 * 60 * 24;

export async function generateStaticParams() {
  const authors = await fetchAuthors();

  if (!authors || authors.length === 0) {
    return [];
  }

  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }) {
  const author = await fetchAuthor(params.slug);

  if (author) {
    return {
      siteName: "Wow Skin Science",
      title: author?.name,
      description:
        "Discover the ultimate destination for expert skin & hair care tips, along with a curated selection of products for you. Explore our blog",
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/author/${author?.slug}`,
      image: getPublicImageURL("/images/logo.png"),
    };
  }
}

export default async function BlogsByAuthor({ params }) {
  const { slug } = params;

  const author = await fetchAuthor(slug);

  if (!author) {
    notFound();
  }

  const { blogs, pageInfo } = await fetchBlogs({
    author: slug,
    first: 9,
  });

  if (!blogs || blogs.length === 0) {
    notFound();
  }

  const featuredBlogs = await fetchFeaturedBlogs(5);

  return (
    <div className="container-main mb-main grid grid-cols-12 gap-8 py-6">
      <div className="col-span-12 lg:col-span-9">
        <div className="grid gap-y-8">
          <BlogBreadCrumb
            links={[
              { label: "Blog", url: "/blog" },
              { label: slug, url: `/blog/author/${slug}` },
            ]}
          />
          <BlogAuthor
            name={author.name}
            avatar={author.avatar.url}
            description={author.description}
            slug={author.slug}
          />

          <hr className="border-t border-gray-200" />

          <BlogInfiniteScroll2
            blogsData={blogs}
            pageInfoData={pageInfo}
            author={slug}
          />
        </div>
      </div>

      <BlogSidebar featuredBlogs={featuredBlogs} />
    </div>
  );
}

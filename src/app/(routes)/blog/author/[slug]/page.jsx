import BlogAuthor from "@/components/partials/Blog/BlogAuthor";
import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import BlogInfiniteScroll2 from "@/components/partials/Blog/BlogInfiniteScroll2";
import BlogSidebar from "@/components/partials/Blog/BlogSidebar";
import {
  fetchAuthor,
  fetchAuthors,
  fetchBlogs,
  fetchFeaturedBlogs,
} from "@/lib/wordPressAPIs";
import handleRedirect from "@/utils/handleRedirect";

export const revalidate = 86400;

export async function generateStaticParams() {
  const authors = await fetchAuthors();
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
      image: "/images/logo.png",
    };
  }
}

export default async function BlogsByAuthor({ params }) {
  const { slug } = params;

  const author = await fetchAuthor(slug);

  if (!author) {
    await handleRedirect(`/blog/author/${slug}`);
  }

  const { blogs, pageInfo } = await fetchBlogs({
    author: slug,
    first: 9,
  });

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

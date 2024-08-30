import { DownArrowIconSVG } from "@/assets/svg/icons";
import { fetchBlogs, fetchTopMenu } from "@/lib/wordPressAPIs";
import Image from "next/image";
import Link from "next/link";
import BlogCard2 from "../BlogCard2";

export default async function BlogHeader() {
  const menu = await fetchTopMenu();
  const categoryBlogs = {};

  if (menu && menu.length > 0) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].path.includes("category")) {
        const categorySlug = menu[i].path.split("/").pop();

        const { blogs } = await fetchBlogs({
          first: 4,
          category: categorySlug,
          tags: ["english"],
        });

        if (blogs && blogs.length > 0) {
          categoryBlogs[menu[i].id] = blogs;
        } else {
          categoryBlogs[menu[i].id] = [];
        }
      }
    }
  }

  return (
    <header className="container-main flex flex-col gap-y-6 border-b-[0.5px] border-solid border-gray-300_01 bg-white-a700_01 py-2.5 md:py-3 lg:py-4">
      <div className="grid w-full grid-cols-[1fr,auto,1fr] items-center justify-center gap-x-4">
        <div></div>
        <Link href={`/`}>
          <Image
            src="/images/img_wow_logo.png"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
      </div>

      {menu && menu.length > 0 && (
        <div className="hidden w-full items-center justify-center gap-x-4 lg:flex">
          {menu.map((item) => (
            <div key={item.id} className="group relative">
              <Link
                className="flex cursor-pointer items-center gap-x-1 py-2"
                href={`/blog/${item.path}`}
              >
                {item.label}
                {item.path.includes("category") && <DownArrowIconSVG />}
              </Link>

              {categoryBlogs[item.id] && categoryBlogs[item.id].length > 0 && (
                <div className="invisible absolute left-1/2 top-full z-10 hidden w-80 -translate-x-1/2 scale-95 transform gap-y-4 rounded-lg border-[0.5px] border-solid border-gray-300_01 bg-white-a700_01 p-4 opacity-0 shadow-lg transition-all duration-300 ease-in-out group-hover:visible group-hover:grid group-hover:scale-100 group-hover:opacity-100">
                  {categoryBlogs[item.id].map((blog) => (
                    <BlogCard2 key={blog.node.id} blog={blog.node} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

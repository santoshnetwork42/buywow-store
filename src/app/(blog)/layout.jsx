import BlogHeader from "@/components/partials/Blog/BlogHeader";
import "@/styles/blog.css";

export default async function BlogLayout({ children }) {
  return (
    <div className="grid-[auto,1fr,auto] grid">
      <BlogHeader />
      {children}
    </div>
  );
}

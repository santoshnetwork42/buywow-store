
export default function BlogCard3Skeleton() {
  return (
    <div className="grid animate-pulse items-center gap-4 md:grid-cols-[2fr,4fr]">
      <div className="relative aspect-video w-full rounded-md bg-gray-200"></div>

      <div className="space-y-2">
        <div className="h-4 rounded-md bg-gray-200" />
        <div className="h-6 rounded-md bg-gray-200" />
        <div className="space-y-1">
          <div className="h-4 rounded-md bg-gray-200" />
          <div className="h-4 rounded-md bg-gray-200" />
          <div className="h-4 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

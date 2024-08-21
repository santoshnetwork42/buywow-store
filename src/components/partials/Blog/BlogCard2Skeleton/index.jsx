
export default function BlogCard2Skeleton() {
  return (
    <div className="grid animate-pulse grid-cols-[auto_1fr] gap-x-3">
      <div className="relative aspect-[4/3] w-full rounded-md bg-gray-200"></div>

      <div className="space-y-2">
        <div className="h-[17.5px] w-full rounded bg-gray-200"></div>

        <div className="space-y-1">
          <div className="h-[17.5px] w-full rounded bg-gray-200"></div>
          <div className="h-[17.5px] w-4/5 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

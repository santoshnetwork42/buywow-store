export default function BlogCardSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col rounded-xl border p-3 shadow-xs">
      <div className="relative aspect-video w-full rounded-md bg-gray-200"></div>

      <div className="mt-3 space-y-2">
        <div className="h-4 rounded bg-gray-200"></div>
        <div className="h-8 rounded bg-gray-200"></div>
        <div className="space-y-1">
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 w-4/5 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

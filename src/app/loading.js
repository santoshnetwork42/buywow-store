const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`}></div>
);

export default function Loading() {
  return (
    <div className="container-main mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12">
        <Skeleton className="h-64 w-full rounded-lg md:h-96" />
      </div>

      {/* Featured Categories */}
      <div className="mb-12">
        <Skeleton className="mb-4 h-8 w-48" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-24 rounded-md" />
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <Skeleton className="mb-4 h-8 w-48" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="aspect-square rounded-md" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="mb-12">
        <Skeleton className="h-32 w-full rounded-lg md:h-48" />
      </div>

      {/* New Arrivals */}
      <div className="mb-12">
        <Skeleton className="mb-4 h-8 w-48" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="aspect-square rounded-md" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="mb-12">
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    </div>
  );
}

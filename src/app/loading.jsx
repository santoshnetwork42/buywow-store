// components/skeleton/NavbarSkeleton.jsx

const NavbarSkeleton = () => (
  <div className="h-16 w-full animate-pulse bg-gray-200">
    <div className="container mx-auto flex h-full items-center justify-between px-4">
      <div className="h-8 w-32 rounded bg-gray-300"></div>
      <div className="flex space-x-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-6 w-20 rounded bg-gray-300"></div>
        ))}
      </div>
      <div className="h-10 w-10 rounded-full bg-gray-300"></div>
    </div>
  </div>
);

const MainBannerSkeleton = () => (
  <div className="h-96 w-full animate-pulse bg-gray-200">
    <div className="container mx-auto flex h-full items-center justify-center">
      <div className="h-3/4 w-3/4 rounded bg-gray-300"></div>
    </div>
  </div>
);

const FeaturedListSkeleton = () => (
  <div className="container mx-auto my-8">
    <div className="mb-4 h-8 w-48 animate-pulse rounded bg-gray-200"></div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-32 animate-pulse rounded bg-gray-200"
        ></div>
      ))}
    </div>
  </div>
);

const FeaturedProductsTabSkeleton = () => (
  <div className="container mx-auto my-8">
    <div className="mb-4 flex space-x-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="h-8 w-24 animate-pulse rounded bg-gray-200"
        ></div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div key={item} className="flex animate-pulse flex-col">
          <div className="mb-2 h-48 w-full rounded bg-gray-200"></div>
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/2 rounded bg-gray-200"></div>
        </div>
      ))}
    </div>
  </div>
);

export default function Loading() {
  <div className="bg-white min-h-screen">
    <NavbarSkeleton />
    <MainBannerSkeleton />
    <FeaturedListSkeleton />
    <FeaturedProductsTabSkeleton />
  </div>;
}

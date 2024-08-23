const WowLoyaltySkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-3xl animate-pulse">
      <div className="mb-6 flex flex-col overflow-hidden rounded-md shadow-sm">
        <div className="bg-gray-300/50 p-4 md:p-5">
          <div className="mb-4 h-8 w-1/2 rounded bg-gray-400"></div>
          <div className="mb-2 h-6 w-3/4 rounded bg-gray-400"></div>
          <div className="h-10 w-1/3 rounded bg-gray-400"></div>
        </div>
        <div className="flex justify-between bg-white-a700 p-4">
          <div className="h-4 w-2/5 rounded bg-gray-300"></div>
          <div className="h-4 w-2/5 rounded bg-gray-300"></div>
        </div>
      </div>
      <div className="mb-4 h-6 w-1/4 rounded bg-gray-300"></div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="mb-6 space-y-3">
          <div className="h-4 w-1/6 rounded bg-gray-300"></div>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-300"></div>
              <div className="h-4 w-1/2 rounded bg-gray-300"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WowLoyaltySkeleton;

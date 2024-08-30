import { useEffect, useRef } from "react";

const InfiniteScroll = ({
  children,
  loadMore,
  hasMore,
  isLoading,
  rootMargin,
}) => {
  const observerRef = useRef(null);
  const loadingRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: rootMargin || "100px",
      threshold: 1.0,
    };

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    }, options);

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore, isLoading, rootMargin]);

  return (
    <>
      {children}
      {(hasMore || isLoading) && (
        <div
          ref={loadingRef}
          className="flex h-10 w-full items-center justify-center"
        />
      )}
    </>
  );
};

export default InfiniteScroll;

// components/features/token-pagination.js
"use client";

import { Button, Text } from "@/components/elements";
import { memo } from "react";

function TokenPagination({
  onPage,
  total = 0,
  loaded = 0,
  nextToken,
  content = "items",
}) {
  if (!total) return null;

  return (
    <div className="mb-4 flex flex-col gap-4">
      <Text as="span" size="sm" className="font-light">
        Showing <span>{`1 - ${loaded} of ${total}`}</span> {content}
      </Text>
      {!!nextToken && loaded < total && (
        <Button
          className="mx-auto w-fit rounded !text-base font-light hover:outline hover:outline-[0.5px]"
          variant="outline"
          size="medium"
          onClick={onPage}
        >
          Load More<i className="d-icon-arrow-right"></i>
        </Button>
      )}
    </div>
  );
}

export default memo(TokenPagination);

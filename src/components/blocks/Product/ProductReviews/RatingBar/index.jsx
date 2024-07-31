"use client";
import { Text } from "@/components/elements";
import React from "react";

const RatingBar = ({ starCount = 0, percentage = 0 }) => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="min-w-12">
        <Text as="p" size="sm" className="font-light">
          {starCount} {starCount > 1 ? "Stars" : "Star"}
        </Text>
      </div>
      <div className="h-1.5 flex-1 rounded-full bg-gray-300">
        {!!percentage && (
          <div
            className={`h-1.5 rounded-full bg-yellow-900`}
            style={{ width: percentage + "%" }}
          />
        )}
      </div>
      <div className="min-w-7">
        <Text as="p" size="sm" className="font-light">
          {percentage}%
        </Text>
      </div>
    </div>
  );
};

export default RatingBar;

"use client";
import { Heading, Text } from "@/components/elements";

const RatingBar = ({ starCount = 0, percentage = 0 }) => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <Text as="p" size="base" className="min-w-12 text-sm" responsive>
        {starCount} {starCount > 1 ? "Stars" : "Star"}
      </Text>
      <div className="h-1.5 flex-1 rounded-full bg-gray-300">
        {!!percentage && (
          <div
            className={`h-1.5 rounded-full bg-yellow-900`}
            style={{ width: percentage + "%" }}
          />
        )}
      </div>
      <Heading as="h4" size="base" className="min-w-7 text-sm" responsive>
        {percentage}%
      </Heading>
    </div>
  );
};

export default RatingBar;

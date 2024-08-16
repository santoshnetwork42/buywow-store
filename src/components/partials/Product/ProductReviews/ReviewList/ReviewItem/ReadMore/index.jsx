import { Text } from "@/components/elements";
import { useState } from "react";

const ReadMore = ({ content, maxLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (content.length <= maxLength) {
    return (
      <Text as="p" size="base">
        {content}
      </Text>
    );
  }

  return (
    <div>
      <Text as="p" size="base">
        {isExpanded ? content : `${content.slice(0, maxLength)}...`}
      </Text>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-sm text-blue-600 underline"
      >
        {isExpanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
};

export default ReadMore;

import { Button, Text } from "@/components/elements";
import { useState } from "react";

const ReadMore = ({ content, maxLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (content.length <= maxLength) {
    return (
      <Text as="p" size="base" className="text-sm" responsive>
        {content}
      </Text>
    );
  }

  return (
    <div>
      <Text as="p" size="base" className="text-sm" responsive>
        {isExpanded ? content : `${content.slice(0, maxLength)}...`}
      </Text>
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-sm text-blue-600 underline"
      >
        {isExpanded ? "Read less" : "Read more"}
      </Button>
    </div>
  );
};

export default ReadMore;

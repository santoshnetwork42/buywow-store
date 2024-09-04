import { Button, Text } from "@/components/elements";
import React, { useCallback, useMemo, useState } from "react";

const ReadMore = ({
  content,
  maxLength = 150,
  isHtml = false,
  buttonClassName,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const truncatedContent = useMemo(() => {
    if (!content) return "";
    if (content.length <= maxLength) return content;
    return `${content.slice(0, maxLength)}...`;
  }, [content, maxLength]);

  const renderContent = useCallback(() => {
    if (!content) return null;

    if (content.length <= maxLength) {
      return (
        <Text as="p" size="base" className="overflow-hidden text-sm" responsive>
          {isHtml ? (
            <span
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            content
          )}
        </Text>
      );
    }

    return (
      <div className="relative">
        <Text as="p" size="base" className="text-sm" responsive>
          {isHtml ? (
            <span
              className="text-sm"
              dangerouslySetInnerHTML={{
                __html: isExpanded ? content : truncatedContent,
              }}
            />
          ) : isExpanded ? (
            content
          ) : (
            truncatedContent
          )}
        </Text>
        <Button
          onClick={toggleExpand}
          className={`ml-auto rounded-none bg-white-a700 px-3 text-sm underline ${
            buttonClassName
          }`}
        >
          {isExpanded ? "Read less" : "Read more"}
        </Button>
      </div>
    );
  }, [
    content,
    isExpanded,
    isHtml,
    maxLength,
    truncatedContent,
    toggleExpand,
    buttonClassName,
  ]);

  return <div>{renderContent()}</div>;
};

export default React.memo(ReadMore);

import { Button, Text } from "@/components/elements";
import React, { useCallback, useMemo, useState } from "react";

const ReadMore = ({
  content,
  maxLength = 150,
  isHtml = false,
  buttonClassName,
  isProductDescription = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const processHtmlContent = useCallback((htmlContent) => {
    return htmlContent
      .replace(/<p>/g, isProductDescription ? "<h3 class='inline'>" : "<span>")
      .replace(/<\/p>/g, isProductDescription ? "</h3>" : "</span>");
  }, []);

  const truncatedContent = useMemo(() => {
    if (!content) return "";
    let processedContent = isHtml ? processHtmlContent(content) : content;

    if (processedContent.length <= maxLength) return processedContent;
    return `${processedContent.slice(0, maxLength)}...`;
  }, [content, maxLength, isHtml, processHtmlContent]);

  const renderContent = useCallback(() => {
    if (!content) return null;

    let displayContent = isHtml ? processHtmlContent(content) : content;

    if (displayContent.length <= maxLength) {
      return (
        <Text
          as={isProductDescription ? "div" : "span"}
          size="base"
          className="overflow-hidden text-sm"
          responsive
        >
          {isHtml ? (
            isProductDescription ? (
              <h3
                className="!inline text-sm"
                dangerouslySetInnerHTML={{ __html: displayContent }}
              />
            ) : (
              <span
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: displayContent }}
              />
            )
          ) : (
            displayContent
          )}
        </Text>
      );
    }

    return (
      <Text
        as={isProductDescription ? "div" : "p"}
        size="base"
        responsive
        className="max-sm:text-sm"
      >
        {isHtml ? (
          isProductDescription ? (
            <div
              className="inline"
              dangerouslySetInnerHTML={{
                __html: isExpanded ? displayContent : truncatedContent,
              }}
            />
          ) : (
            <span
              dangerouslySetInnerHTML={{
                __html: isExpanded ? displayContent : truncatedContent,
              }}
            />
          )
        ) : isExpanded ? (
          displayContent
        ) : (
          truncatedContent
        )}{" "}
        <Button
          enableRipple={false}
          onClick={toggleExpand}
          className={`ml-1 inline-block rounded-none text-sm underline lg:text-base ${buttonClassName || ""}`}
        >
          {isExpanded ? "Read less" : "Read more"}
        </Button>
      </Text>
    );
  }, [
    content,
    isExpanded,
    isHtml,
    maxLength,
    truncatedContent,
    toggleExpand,
    buttonClassName,
    processHtmlContent,
  ]);

  return <div>{renderContent()}</div>;
};

export default React.memo(ReadMore);

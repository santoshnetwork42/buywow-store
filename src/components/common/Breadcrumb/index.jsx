import Link from "next/link";
import React from "react";
import { Text } from "@/components/common";

export default function Breadcrumb({ items, ...props }) {
  return (
    <div {...props} className={`${props.className} flex items-center`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Link href={item.href}>
            <Text
              as="span"
              size="sm"
              className={`${
                index === items.length - 1 ? "font-medium" : "font-light"
              } capitalize`}
              responsive
            >
              {item.label}
            </Text>
          </Link>
          {index < items.length - 1 && (
            <Text as="span" size="sm" className="font-light" responsive>
              &nbsp;/&nbsp;
            </Text>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

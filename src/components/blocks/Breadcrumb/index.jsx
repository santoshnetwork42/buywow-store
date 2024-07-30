import Link from "next/link";
import React from "react";
import { Text } from "@/components/elements";

export default function Breadcrumb({ items, currentPage, ...props }) {
  return (
    <div {...props} className={`${props.className} flex items-center`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Link href={item.href}>
            <Text
              as="span"
              size="sm"
              className="font-light capitalize"
              responsive
            >
              {item.label}
            </Text>
          </Link>
          <Text as="span" size="sm" className="mx-1 font-light" responsive>
            /
          </Text>
        </React.Fragment>
      ))}
      <Text as="span" size="sm" className="font-medium capitalize" responsive>
        {currentPage}
      </Text>
    </div>
  );
}

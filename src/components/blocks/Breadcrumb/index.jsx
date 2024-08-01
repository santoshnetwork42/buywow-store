import Link from "next/link";
import React from "react";
import { Text } from "@/components/elements";

export default function Breadcrumb({ breadcrumbTitle: currentPageTitle }) {
  return (
    <div className={`container-main my-3 flex items-center`}>
      <Link href="/">
        <Text as="span" size="sm" className="font-light capitalize" responsive>
          Home
        </Text>
      </Link>
      <Text as="span" size="sm" className="mx-1 font-light" responsive>
        /
      </Text>
      <Text as="span" size="sm" className="font-medium capitalize" responsive>
        {currentPageTitle}
      </Text>
    </div>
  );
}

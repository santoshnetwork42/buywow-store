import { Text } from "@/components/elements";
import Link from "next/link";
import React from "react";

export default function BlogBreadCrumb({ links = [{ label: "", url: "/" }] }) {
  return (
    <div>
      <Link href="/">
        <Text as="span" size="sm" className="font-light capitalize" responsive>
          Home
        </Text>
      </Link>

      {links.map((link, index) => (
        <React.Fragment key={index}>
          <Text
            as="span"
            size="sm"
            className="font-light capitalize"
            responsive
          >
            {" / "}
          </Text>

          <Link href={link.url}>
            <Text
              as="span"
              size="sm"
              className="font-light capitalize"
              responsive
            >
              {link.label}
            </Text>
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}

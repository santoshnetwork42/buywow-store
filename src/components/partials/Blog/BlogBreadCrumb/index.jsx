import { Text } from "@/components/elements";
import Link from "next/link";
import React from "react";

export default function BlogBreadCrumb({ links = [{ label: "", url: "/" }] }) {
  return (
    <div>
      <Link prefetch={false} href="/">
        <Text as="span" size="sm" className="font-light capitalize" responsive>
          Home
        </Text>
      </Link>

      {links.map((link, index) =>
        index === links.length - 1 ? (
          <React.Fragment key={index}>
            <Text
              as="span"
              size="sm"
              className="font-light capitalize"
              responsive
            >
              {" / "}
            </Text>

            <Text
              as="span"
              size="sm"
              className="font-light capitalize"
              responsive
            >
              {link.label}
            </Text>
          </React.Fragment>
        ) : (
          <React.Fragment key={index}>
            <Text
              as="span"
              size="sm"
              className="font-light capitalize"
              responsive
            >
              {" / "}
            </Text>

            <Link prefetch={false} href={link.url}>
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
        ),
      )}
    </div>
  );
}

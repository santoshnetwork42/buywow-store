import { Heading, Text } from "@/components/elements";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogAuthor({ name, avatar, description, slug }) {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-6">
      <Image
        src={avatar}
        alt={name}
        width={100}
        height={100}
        className="rounded-full"
      />
      <div className="space-y-2">
        <div className="flex justify-between">
          <Link href={`/blog/author/${slug}`}>
            <Heading as="h4" size="lg">
              {name}
            </Heading>
          </Link>
        </div>

        <Text as="p" size="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

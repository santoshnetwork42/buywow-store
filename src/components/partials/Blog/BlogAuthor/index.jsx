import { Heading, Img, Text } from "@/components/elements";
import Link from "next/link";

export default function BlogAuthor({
  name,
  avatar,
  description,
  slug,
  linkedin,
}) {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-6">
      <Img
        src={avatar}
        alt={name}
        width={100}
        height={100}
        className="rounded-full"
      />
      <div className="space-y-2">
        <div className="flex justify-between">
          <Link prefetch={false} href={`/blog/author/${slug}`}>
            <Heading as="h4" size="lg">
              {name}
            </Heading>
          </Link>

          <div className="space-x-2">
            {linkedin && (
              <Link
                prefetch={false}
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Img
                  src="linkedin.svg"
                  alt="linkedin"
                  width={16}
                  height={16}
                  style={{ filter: "invert(1)" }}
                  isStatic
                />
              </Link>
            )}
          </div>
        </div>

        <Text as="p" size="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

import { Heading, Text } from "@/components/elements";
import Image from "next/image";
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

          <div className="space-x-2">
            {linkedin && (
              <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/linkedin.svg"
                  alt="linkedin"
                  width={16}
                  height={16}
                  style={{ filter: "invert(1)" }}
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

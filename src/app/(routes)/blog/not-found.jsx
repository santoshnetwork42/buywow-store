"use client";

import { Heading, Text } from "@/components/elements";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-main flex max-h-screen min-h-96 flex-1 flex-col items-center justify-center">
      <Heading className="mb-4 text-6xl font-bold text-gray-800">404</Heading>
      <Heading className="mb-6 text-2xl font-semibold text-gray-600">
        Page Not Found
      </Heading>
      <Text className="mb-8 max-w-md text-center text-gray-500">
        {`Oops! The page you're looking for doesn't exist or has been moved.`}
      </Text>
      <Link
        prefetch={false}
        href="/"
        className="rounded-full bg-yellow-900 px-6 py-3 transition duration-300"
      >
        <Text className="font-medium text-white-a700_01">Go Back Home</Text>
      </Link>
    </div>
  );
}

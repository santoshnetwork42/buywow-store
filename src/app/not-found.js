import { Text } from "@/components/elements";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-80 max-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mb-6 text-2xl font-semibold text-gray-600">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md text-center text-gray-500">
        {`Oops! The page you're looking for doesn't exist or has been moved.`}
      </p>
      <Link
        href="/"
        className="text-white rounded-md bg-yellow-900 px-6 py-3 transition duration-300"
      >
        <Text className="text-white-a700_01">Go Back Home</Text>
      </Link>
    </div>
  );
}

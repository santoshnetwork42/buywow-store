"use client";

import { AlertInfoIcon } from "@/assets/svg/icons";
import Link from "next/link";

export default function Error({ error, reset }) {
  console.error("Error caught by error boundary:", error);
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-gradient-to-r to-pink-50 p-6 text-center">
        <AlertInfoIcon size={64} />
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">
          Oops! Something went wrong
        </h2>
        <p className="mb-6 text-gray-600">
          {`We're having trouble loading the page you requested.`}
        </p>
        <p className="mb-8 text-gray-600">
          {`Don't worry, it's not you - it's us. Our team has been notified
              and we're working on a fix.`}
        </p>
        <Link
          href="/"
          className="text-white transform rounded-full px-6 py-3 font-semibold text-white-a700_01 transition duration-300 ease-in-out hover:scale-105 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Try Again
        </Link>
        <p className="mt-8 text-sm text-gray-500">
          If the problem persists, please contact our{" "}
          <a href="#" className="text-yellow-900 hover:underline">
            customer support
          </a>
          .
        </p>
      </div>
    </div>
  );
}

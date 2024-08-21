"use client";

import { AlertInfoIcon } from "@/assets/svg/icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-r to-pink-50 p-6 text-center">
        <AlertInfoIcon size={64} />
        <h2 className="text-2xl font-semibold text-gray-800">
          404 - Page Not Found
        </h2>
        <p className="text-gray-600">
          {`The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.`}
        </p>
        <Link
          href="/"
          className="text-white transform rounded-full bg-yellow-900 px-6 py-3 font-semibold text-white-a700_01 transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50"
        >
          Go to Home
        </Link>
        <p className="text-sm text-gray-500">
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

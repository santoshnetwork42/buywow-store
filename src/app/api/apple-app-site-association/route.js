import { NextResponse } from "next/server";

const STORE_ENV = process.env.STORE_ENV;

export async function GET() {
  let responseData;

  if (STORE_ENV !== "production") {
    responseData = {
      applinks: {
        apps: [],
        details: [
          {
            appID: "8D5QN8WNWH.com.buy-wow",
            paths: ["/product", "*", "/"],
          },
          {
            appID: "8D5QN8WNWH.com.buy-wow",
            paths: ["/collections", "*", "/"],
          },
          {
            appID: "8D5QN8WNWH.com.buy-wow",
            paths: ["*", "/"],
          },
        ],
      },
    };
  } else {
    responseData = {
      applinks: {
        apps: [],
        details: [
          {
            appID: "8D5QN8WNWH.com.tapcart.99G6QNo3nu",
            paths: ["/product", "*", "/"],
          },
          {
            appID: "8D5QN8WNWH.com.tapcart.99G6QNo3nu",
            paths: ["*", "/"],
          },
          {
            appID: "8D5QN8WNWH.com.tapcart.99G6QNo3nu",
            paths: ["/collections", "*", "/"],
          },
        ],
      },
    };
  }

  return NextResponse.json(responseData);
}

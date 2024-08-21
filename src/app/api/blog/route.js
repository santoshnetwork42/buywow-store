import { wordpressAuth } from "@/lib/wordPressAPIs";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const response = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: wordpressAuth,
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error(
      { error: "Error fetching data" },
      {
        status: 500,
      },
    );
  }
}

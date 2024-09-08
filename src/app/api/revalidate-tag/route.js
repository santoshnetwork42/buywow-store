import { revalidateTag } from "next/cache";
import { NextResponse, Res } from "next/server";

const { REVALIDATE_SECRET = "secret" } = process.env;

export async function POST(req) {
  if (req.nextUrl.searchParams.get("secret") !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!Array.isArray(data?.tags)) {
      return NextResponse.json(
        { message: "Please provide tag in body" },
        { status: 400 },
      );
    }

    data.tags.forEach((tag) => revalidateTag(tag));
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      status: 200,
    });
  } catch (err) {
    console.error("Error during revalidation for tag:", err);
    return NextResponse.json(
      { message: "Error revalidating tag", error: err.message },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const { REVALIDATE_SECRET = "secret" } = process.env;

export async function POST(req) {
  // Check for secret to confirm this is a valid request
  if (req.nextUrl.searchParams.get("secret") !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data?.path) {
      return NextResponse.json(
        { message: "Please provide path in body" },
        { status: 400 },
      );
    }

    // Revalidate the path
    revalidatePath(data.path);

    return NextResponse.json(
      { revalidated: true, now: Date.now() },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error during revalidation:", err);
    return NextResponse.json(
      { message: "Error revalidating", error: err.message },
      { status: 500 },
    );
  }
}

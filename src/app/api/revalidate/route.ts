import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { path, secret } = await request.json();

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    return NextResponse.json(
      { error: "Missing path parameter" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error revalidating" },
      { status: 500 }
    );
  }
}

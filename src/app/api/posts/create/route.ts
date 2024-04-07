import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log({ body });

    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        tagId: body.tag,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not create Post", error },
      { status: 500 }
    );
  }
}

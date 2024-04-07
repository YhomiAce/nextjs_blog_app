import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface ContextProps {
  params: {
    postId: string;
  };
}

export async function DELETE(req: Request, ctx: ContextProps) {
  try {
    console.log({ Id: ctx.params.postId });

    await db.post.delete({
      where: {
        id: ctx.params.postId,
      },
    });
    return new Response(null, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not delete Post", error },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, ctx: ContextProps) {
  try {
    const body = await req.json();
    console.log({ body, Id: ctx.params.postId });

    const post = await db.post.update({
      where: {
        id: ctx.params.postId,
      },
      data: {
        title: body.title,
        content: body.content,
        tagId: body.tag,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not delete Post", error },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, ctx: ContextProps) {
  try {
    console.log({ Id: ctx.params.postId });

    const post = await db.post.findFirst({
      where: {
        id: ctx.params.postId,
      },
      select: {
        id: true,
        content: true,
        title: true,
        tag: true,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not find Post", error },
      { status: 500 }
    );
  }
}

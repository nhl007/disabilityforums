import { NextResponse } from "next/server";
type body = {
  userId: string;
  postId: string;
};

export async function POST(req: Request) {
  const body: body = await req.json();

  const { userId, postId } = body;

  return NextResponse.json(
    {
      user: userId,
      post: postId,
    },
    { status: 200 }
  );
}

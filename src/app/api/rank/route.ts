import { connectToDB } from "@/libs/connectToDb";
import Business from "@/models/Business";
import { NextResponse } from "next/server";
type body = {
  userId: string;
  postId: string;
};

export async function POST(req: Request) {
  try {
    const body: body = await req.json();
    const { userId, postId } = body;

    if (!userId || !postId)
      return NextResponse.json(
        {
          success: false,
          message: "Need both userId and postId",
        },
        { status: 400 }
      );

    await connectToDB();

    const ranked = await Business.findByIdAndUpdate(
      "657e42a15536e7e4ba8558fa",
      {
        rank: 100,
      }
    ).select("_id rank");

    return NextResponse.json(
      {
        user: userId,
        post: postId,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error Occurred",
      },
      { status: 400 }
    );
  }
}

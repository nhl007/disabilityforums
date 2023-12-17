import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { connectToDB } from "@/libs/connectToDb";
import User from "@/models/User";
import { getDiscourseUserByEmail } from "@/actions/discourseApi";

type body = {
  name: string;
  email: string;
  password: string;
};

export async function POST(request: Request) {
  try {
    const body: body = await request.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      throw new Error("Missing fields!");
    }

    await connectToDB();

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const discourseData = await getDiscourseUserByEmail(email);

    let user;

    if (discourseData.length) {
      user = await User.create({
        email: email,
        password: hashedPassword,
        discourseId: discourseData[0].id,
        avatar:
          process.env.DISCOURSE_API_URL +
          discourseData[0].avatar_template.replace("{size}", "96"),
        name: discourseData[0].name,
        username: discourseData[0].username,
      });
    } else {
      user = await User.create({
        email: email,
        password: hashedPassword,
        username: name,
      });
    }

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json(err.message, { status: 400 });
  }
}

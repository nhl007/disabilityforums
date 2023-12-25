import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { connectToDB } from "@/libs/connectToDb";
import User from "@/models/User";
import {
  createADiscourseUser,
  getDiscourseUserByEmail,
} from "@/actions/discourseApi";

type body = {
  name: string;
  username: string;
  email: string;
  password: string;
  type: string;
};

export async function POST(request: Request) {
  try {
    const body: body = await request.json();

    const { name, username, email, password, type } = body;

    if (!name || !username || !email || !password || !type) {
      throw new Error("Missing fields!");
    }

    if (password.length < 10) {
      throw new Error("Password is less than 10 characters!");
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
        userType: type,
      });
    } else {
      const discourseId = await createADiscourseUser(
        name,
        email,
        password,
        username,
        type
      );
      if (discourseId) {
        user = await User.create({
          name: name,
          email: email,
          password: hashedPassword,
          username: username,
          discourseId: discourseId,
          userType: type,
        });
      } else {
        return NextResponse.json("Could not create account! Try again", {
          status: 400,
        });
      }
    }

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json(err.message, { status: 400 });
  }
}

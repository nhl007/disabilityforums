import User from "@/models/User";
import { connectToDB } from "./connectToDb";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  pages: {
    newUser: "/directory",
    signIn: "/sign-in",
    signOut: "/",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          type: "text",
        },
        email: {
          type: "text",
        },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        console.log("error here", credentials);

        await connectToDB();

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      //! store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user?.email });
      session.user.id = sessionUser._id;
      session.user.discourse_id = sessionUser.discourseId;
      session.user.name = sessionUser.name;
      session.user.image = sessionUser.avatar;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};

import User from "@/models/User";
import { connectToDB } from "./connectToDb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { AuthOptions, getServerSession } from "next-auth";

export const authOptions: AuthOptions = {
  pages: {
    newUser: "/directory",
    signIn: "/sign-in",
    signOut: "/sign-in",
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

        await connectToDB();

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        if (!user) {
          const username = await User.findOne({
            username: credentials.email,
          }).select("+password");

          if (!username || !username.password) {
            throw new Error("User not found!");
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            username.password
          );

          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }

          return username;
        }

        if (!user || !user.password) {
          throw new Error("User not found!");
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
      await connectToDB();
      const sessionUser: UserType | null = await User.findOne({
        email: session.user?.email,
      }).lean();
      if (sessionUser) {
        session.user.id = sessionUser._id;
        session.user.discourse_id = sessionUser.discourseId;
        session.user.name = sessionUser.username;
        session.user.image = sessionUser.avatar;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};

export const getAuthSession = async () => {
  return await getServerSession(authOptions);
};

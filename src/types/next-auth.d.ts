import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | number | null | undefined;
      discourse_id?: string | number | null | undefined;
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    };
  }
}

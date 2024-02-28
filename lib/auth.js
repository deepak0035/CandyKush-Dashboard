import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { User } from "@/models/usersSchema";
import bcrypt from "bcryptjs";


export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await db();

        const { email, password } = credentials;
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid Email or Password");
        }
        const passMatched = await bcrypt.compare(
          password.toString(),
          user.password
        );

        if (!passMatched) {
          throw new Error("Invalid Email or Password");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

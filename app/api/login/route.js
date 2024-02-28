import { NextResponse } from "next/server";
import { db } from "../../../db/db";
import { User } from "@/models/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await db();

  const { email, password } = await request.json();
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    const passMatched = bcrypt.compareSync(password, user.password);
    if (!passMatched) {
      throw new Error("Invalid Credentials");
    }
    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_SECRET_KEY
    );
    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
        user: user,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("auth_token", token, {
      expiresIn: "1d",
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        status: false,
      },
      {
        status: 401,
      }
    );
  }
}

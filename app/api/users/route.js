import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { User } from "@/models/usersSchema";
import bcrypt from "bcryptjs";

export async function GET(request) {
  await db();
  try {
    const users = await User.find().select("-password"); // Exclude password field
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: false,
    });
  }
}


export async function POST(request) {
  await db();

  const { name, email, password } = await request.json();
  console.log(name, email, password);

  try {
    // Hash the password with bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10); // Using 10 salt rounds
    const user = new User({ name, email, password: hashedPassword });

    const createdUser = await user.save();
    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: false,
    });
  }
}

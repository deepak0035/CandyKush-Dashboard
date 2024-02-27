import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { Order } from "@/models/orderSchema";

export async function GET(request) {
  await db();
  try {
    const orders = await Order.find();
    const response = NextResponse.json(orders);
    return response;
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: false,
    });
  }
}

export async function POST(request) {
  await db();

  const ordersData = await request.json();

  try {
    const createdOrders = await Order.create(ordersData);
    const response = NextResponse.json(createdOrders, { status: 201 });
    return response;
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: false,
    });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { Order } from "@/models/orderSchema";

db();

export async function GET(request, { params }) {
  const { orderId } = params;
  try {
    const orderDetail = await Order.findById(orderId);
    return NextResponse.json(orderDetail, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: false,
    });
  }
}

export async function DELETE(request, { params }) {
  const { orderId } = params;
  try {
    await Order.deleteOne({ _id: orderId });
    return NextResponse.json({
      meesage: "Order deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: false,
    });
  }
}

export async function PATCH(request, { params }) {
  const { orderId } = params;
  const { status, payment } = await request.json();
  try {
    const orderDetail = await Order.findById(orderId);

    // Check if status is provided and update accordingly
    if (status !== undefined) {
      orderDetail.status = status;
    }

    // Check if payment is provided and update accordingly
    if (payment !== undefined) {
      orderDetail.payment = payment;
    }

    const updatedOrder = await orderDetail.save();
    const response = NextResponse.json(updatedOrder, { status: 201 });
    return response;
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: false,
    });
  }
}


import mongoose from "mongoose";
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  productQuality: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productSize: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const orderSchema = new Schema({
  customerNumber: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderItems: [orderItemSchema],
  orderTime: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Delivered", "Rejected"],
    default: "Pending",
  },
  payment: {
    type: String,
    enum: ["Cash", "Card"],
  },
});

export const Order =
  mongoose.models.orders || mongoose.model("orders", orderSchema);

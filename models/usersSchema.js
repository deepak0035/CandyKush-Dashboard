import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: String,
});

export const User = mongoose.models.userData || mongoose.model("userData", userSchema);

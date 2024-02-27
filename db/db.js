import mongoose from "mongoose";

export const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "orderManager",
    });
    console.log("Connected to Mongoose");

    //console.log(connection);
  } catch (error) {
    console.log("failed to connect to Mongoose");
    console.log(error);
  }
};

import mongoose from "mongoose";
import { MONGO_URI } from "../config/config";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    if (process.env.NODE_ENV !== "test") {
      await mongoose.connect(MONGO_URI as string);
    }
    console.log("db is connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

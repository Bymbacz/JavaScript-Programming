import mongoose from "mongoose";

export async function initializeDatabase() {
  const dbUrl: string = "mongodb://127.0.0.1:27017/JS";

  try {
    await mongoose.connect(dbUrl, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
}

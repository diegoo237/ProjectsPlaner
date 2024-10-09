import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.SERVER_MONGO_URL;
console.log("MongoDB URI:", uri);
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Success, connected to MongoDB");
  } catch (error) {
    console.log("MongoDB error", error.message);
  }
};

export default connectDB;

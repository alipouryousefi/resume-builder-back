import mongoose from "mongoose";
import config from "./config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {});
    console.log("mongodb connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;

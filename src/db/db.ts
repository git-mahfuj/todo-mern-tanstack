import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URI;
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL as string);

    mongoose.connection.on("connected", () => {
      console.log("MongoDb Connected");
    });
    mongoose.connection.on("error", (error: Error) => {
      console.log("MongoDB Connection error" , error.message);
    });
  } catch (err: unknown) {
    console.log("error while connecting mongoDB", err);
  }
};

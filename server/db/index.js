import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_NAME}`
    );
    console.log("Connected to mongo db");
  } catch (error) {
    console.log("Error Occured while connecting to Database", error.message);
  }
};

import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.connect(process.env.MONGO_URI, {
    dbName: "TaskNext",
  });
};

export default connectDB;

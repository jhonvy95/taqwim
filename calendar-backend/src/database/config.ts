import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN as string);
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error to connect to DB - Verify logs");
  }
};

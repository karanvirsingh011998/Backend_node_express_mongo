import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  const connectionSTring = `${process.env.MONGODB_URI}/${DB_NAME}`;
  console.log(connectionSTring);
  try {
    const connectionInstance = await mongoose.connect(`${connectionSTring}`);

    console.log(connectionInstance.connection.host, "connectionInstance");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;

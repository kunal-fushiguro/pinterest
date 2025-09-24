import { MongoClient } from "mongodb";
import { MONGODB_URL } from "./env";

import mongoose from "mongoose";

export const client = new MongoClient(MONGODB_URL as string);
const db = client.db("pinterest");
export default db;

let isConnected: boolean = false;
export async function connectDb() {
  try {
    if (isConnected) {
      console.log("Database connected already");
      return;
    }
    await mongoose.connect(MONGODB_URL as string, {
      dbName: "pinterest",
      bufferCommands: false,
    });
    console.log("Database connected");
    isConnected = true;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

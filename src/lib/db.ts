import { MongoClient } from "mongodb";
import { MONGODB_URL } from "./env";

export const client = new MongoClient(MONGODB_URL as string);
const db = client.db();

export default db;

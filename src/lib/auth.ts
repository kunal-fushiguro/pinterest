import { betterAuth } from "better-auth";
import db, { client } from "./db";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: client,
  }),
});

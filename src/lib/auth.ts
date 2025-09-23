import { betterAuth } from "better-auth";
import db, { client } from "./db";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { GOOGLE_CLIENT_ID, GOOGLE_SECERT } from "./env";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client: client,
  }),
  socialProviders: {
    google: {
      // prompt: "select_account",
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_SECERT as string,
      // redirectURI: BASE_URL as string,
    },
  },
});

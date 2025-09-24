import { betterAuth } from "better-auth";
import db, { client, connectDb } from "./db";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { GOOGLE_CLIENT_ID, GOOGLE_SECERT } from "./env";
import { createAuthMiddleware } from "better-auth/api";
import { Users } from "@/models/user";
import { headers } from "next/headers";

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
  hooks: {
    after: createAuthMiddleware(async function (ctx) {
      try {
        if (ctx.path.startsWith("/sign-up")) {
          const newSession = ctx.context.newSession;
          if (newSession) {
            await connectDb();
            const user = await Users.findOne({ user: newSession.user.id });
            if (user) {
              return;
            }
            await Users.create({
              user: newSession.user.id,
              uploads: [],
              collections: [],
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }),
  },
});

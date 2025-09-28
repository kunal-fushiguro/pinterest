import { betterAuth } from "better-auth";
import db, { client, connectDb } from "./db";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { GOOGLE_CLIENT_ID, GOOGLE_SECERT } from "./env";
import { createAuthMiddleware } from "better-auth/api";
import { Users } from "@/models/user";

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
        // if (ctx.path.startsWith("/sign-up")) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          await connectDb();
          const user = await Users.findOne({
            userId: newSession.user.id,
          });
          if (user) {
            return;
          }
          await Users.create({
            userId: newSession.user.id,
            name: newSession.user.name,
            email: newSession.user.email,
            image: newSession.user.image || "",
            emailVerified: newSession.user.emailVerified,
            uploads: [],
            collections: [],
          });
        }
        // }
      } catch (error) {
        console.error(error);
      }
    }),
  },
});

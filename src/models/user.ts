import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
    },
    uploads: [
      {
        type: Schema.Types.ObjectId,
        ref: "photo",
      },
    ],
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: "collections",
      },
    ],
  },
  { timestamps: true },
);

export const Users = models.users || model("users", userSchema);

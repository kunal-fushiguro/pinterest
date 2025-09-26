import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
        ref: "Photo",
      },
    ],
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
  },
  { timestamps: true },
);

export const Users = models.Users || model("Users", userSchema);

import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
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

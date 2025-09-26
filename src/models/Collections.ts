import { Schema, model, models } from "mongoose";

const collectionsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    name: { type: String, required: true },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Photo" }],
  },
  { timestamps: true },
);

export const Collection =
  models.Collection || model("Collection", collectionsSchema);

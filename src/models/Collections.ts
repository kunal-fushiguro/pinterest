import { Schema, model, models } from "mongoose";

const collectionsSchema = new Schema(
  {
    name: { type: String, required: true },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "photo" }],
  },
  { timestamps: true },
);

export const Collections =
  models.collections || model("collections", collectionsSchema);

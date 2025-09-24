import { Schema, model, models } from "mongoose";

const photosSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

export const Photo = models.photo || model("photo", photosSchema);

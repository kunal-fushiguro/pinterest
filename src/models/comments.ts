import { Schema, model, models } from "mongoose";

const commentsSchema = new Schema(
  {
    photoId: {
      type: Schema.Types.ObjectId,
      ref: "photo",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Comment = models.comments || model("comments", commentsSchema);

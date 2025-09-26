import { Schema, model, models } from "mongoose";

const commentsSchema = new Schema(
  {
    photoId: {
      type: Schema.Types.ObjectId,
      ref: "Photo",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Comment = models.Comment || model("Comment", commentsSchema);

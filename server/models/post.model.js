import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    caption: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);

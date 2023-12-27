import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    caption: {
      type: String,
    },
    images: [
      {
        image_url: {
          type: String,
          required: true,
        },
        image_id: {
          type: String,
          required: true,
        },
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

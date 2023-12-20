import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Image = mongoose.model("Image", imageSchema);

import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Agriculture",
        "Business",
        "Education",
        "Entertainment",
        "Art",
        "Investment",
        "Uncategorized",
        "Weather",
      ],
      message: "{VALUE is not supported}",
    },
    description: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: String, enum: [] },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export { postSchema, Post };

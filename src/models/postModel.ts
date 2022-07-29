import mongoose, { Schema, Types, ObjectId } from "mongoose";
import UserAuth from "./userModel";

export interface PostModelSchema {
  user: Schema.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  tags: string[];
  postImage: {
    url: string;
    public_id: string;
  };
  likes: Schema.Types.ObjectId[];
  dislikes: Schema.Types.ObjectId[];
}

const postSchema = new Schema<PostModelSchema>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "UserAuth",
    },
    title: {
      type: String,
      required: [true, "Please add title"],
    },
    description: {
      type: String,
      required: [true, "Please add description"],
    },
    category: {
      type: String,
      required: [true, "Please add category"],
    },
    tags: {
      type: [String],
      required: [true, "Please add tags"],
    },
    postImage: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },

    likes: [{ type: Schema.Types.ObjectId, ref: "UserAuth" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "UserAuth" }],
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("PostModel", postSchema);

export default PostModel;

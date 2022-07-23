import mongoose, { Schema } from "mongoose";

export interface CommentModelSchema {
  writer: Schema.Types.ObjectId;
  postId: Schema.Types.ObjectId;
  responseTo: Schema.Types.ObjectId;
  content: string;
  likes: Schema.Types.ObjectId[];
  dislikes: Schema.Types.ObjectId[];
}

const commentSchema = new Schema<CommentModelSchema>(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "UserAuth",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "PostModel",
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "UserAuth",
    },
    content: {
      type: String,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "UserAuth" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "UserAuth" }],
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("CommentModel", commentSchema);

export default CommentModel;

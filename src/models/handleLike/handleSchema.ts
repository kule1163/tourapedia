import { Schema } from "mongoose";

export interface LikeModelSchema {
  userId: Schema.Types.ObjectId;
  itemId: Schema.Types.ObjectId;
  postId: Schema.Types.ObjectId;
}

export const handleSchema = new Schema<LikeModelSchema>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserAuth",
    },
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "CommentModel",
    },
  },
  {
    timestamps: true,
  }
);

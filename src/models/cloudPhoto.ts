import mongoose, { Schema } from "mongoose";

export interface CloudPhotoModelSchema {
  url: string;
  public_id: string;
}

const cloudPhotoSchema = new Schema<CloudPhotoModelSchema>(
  {
    url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
  { timestamps: true }
);

const CloudPhotoModel = mongoose.model("CloudPhotoModel", cloudPhotoSchema);

export default CloudPhotoModel;

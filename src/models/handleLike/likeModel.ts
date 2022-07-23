import mongoose, { Schema } from "mongoose";
import { handleSchema } from "./handleSchema";

const likeSchema = handleSchema;

const LikeModel = mongoose.model("LikeModel", likeSchema);

export default LikeModel;

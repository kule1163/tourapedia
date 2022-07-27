import mongoose, { Schema } from "mongoose";
import { handleSchema } from "./handleSchema";

const dislikeSchema = handleSchema;

const DislikeModel = mongoose.model("DislikeModel", dislikeSchema);

export default DislikeModel;

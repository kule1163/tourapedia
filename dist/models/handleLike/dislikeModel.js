"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const handleSchema_1 = require("./handleSchema");
const dislikeSchema = handleSchema_1.handleSchema;
const DislikeModel = mongoose_1.default.model("DislikeModel", dislikeSchema);
exports.default = DislikeModel;

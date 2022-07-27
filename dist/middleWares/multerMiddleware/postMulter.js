"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path_1.default.join(__dirname, "../../uploads/postPhotos"));
    },
    filename: (req, file, callback) => {
        callback(null, (0, uuid_1.v4)() + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
exports.postUpload = (0, multer_1.default)({
    storage: storage,
});
exports.upload = exports.postUpload;

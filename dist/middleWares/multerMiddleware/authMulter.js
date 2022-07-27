"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path_1.default.join(__dirname, "../../uploads/profilePhotos"));
    },
    filename: (req, file, callback) => {
        callback(null, (0, uuid_1.v4)() + "-" + Date.now() + path_1.default.extname(file === null || file === void 0 ? void 0 : file.originalname));
    },
});
exports.authUpload = (0, multer_1.default)({
    storage: storage,
});
exports.upload = exports.authUpload;
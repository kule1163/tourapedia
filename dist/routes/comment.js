"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_1 = require("../controller/comment");
const authMiddleWare_1 = require("../middleWares/authMiddleWare");
const postMulter_1 = require("../middleWares/multerMiddleware/postMulter");
const router = express_1.default.Router();
router.route("/:postId").get(comment_1.getComments);
router.route("/add-comment").post([authMiddleWare_1.protect, postMulter_1.postUpload.any()], comment_1.createComment);
router.route("/get-replies").post(postMulter_1.postUpload.any(), comment_1.getReplies);
exports.default = router;

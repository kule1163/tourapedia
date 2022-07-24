"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const like_1 = require("../controller/like");
const authMiddleWare_1 = require("../middleWares/authMiddleWare");
const likeMiddleware_1 = require("../middleWares/likeMiddleware");
const postMulter_1 = require("../middleWares/multerMiddleware/postMulter");
const router = express_1.default.Router();
router.route("/getLikes").post([postMulter_1.postUpload.any()], like_1.getLikes);
router.route("/uplike").post([postMulter_1.postUpload.any(), authMiddleWare_1.protect, likeMiddleware_1.likeVeriable], like_1.upLike);
router.route("/unlike").post([postMulter_1.postUpload.any(), authMiddleWare_1.protect, likeMiddleware_1.likeVeriable], like_1.unLike);
router.route("/getDislikes").post([postMulter_1.postUpload.any()], like_1.getDislikes);
router
    .route("/upDislike")
    .post([postMulter_1.postUpload.any(), authMiddleWare_1.protect, likeMiddleware_1.likeVeriable], like_1.upDislike);
router
    .route("/unDislike")
    .post([postMulter_1.postUpload.any(), authMiddleWare_1.protect, likeMiddleware_1.likeVeriable], like_1.unDislike);
exports.default = router;

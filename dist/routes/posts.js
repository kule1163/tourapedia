"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleWare_1 = require("../middleWares/authMiddleWare");
const postMulter_1 = require("../middleWares/multerMiddleware/postMulter");
const posts_1 = require("../controller/posts");
const router = express_1.default.Router();
router
    .route("/")
    .get(posts_1.getPosts)
    .post([authMiddleWare_1.protect, postMulter_1.postUpload.single("postImage")], posts_1.createPost);
router.route("/by-user").get(authMiddleWare_1.protect, posts_1.getToursByUser);
router
    .route("/post/:id")
    .patch([authMiddleWare_1.protect, postMulter_1.postUpload.single("postImage")], posts_1.updatePost)
    .delete([authMiddleWare_1.protect, postMulter_1.postUpload.single("postImage")], posts_1.deletePost)
    .get(posts_1.getSinglePost);
router.route("/like").put([authMiddleWare_1.protect, postMulter_1.postUpload.any()], posts_1.likePost);
router.route("/dislike").put([authMiddleWare_1.protect, postMulter_1.postUpload.any()], posts_1.dislikePost);
router.route("/tag/:tag").get(posts_1.getToursByTag);
router.route("/category/:categ").get(posts_1.getTourByCategory);
router.route("/related-post/:id").post(postMulter_1.postUpload.any(), posts_1.getRelatedPosts);
router.route("/search").get(posts_1.getToursBySearch);
exports.default = router;

import express from "express";
import { protect } from "../middleWares/authMiddleWare";
import { postUpload } from "../middleWares/multerMiddleware/postMulter";
import {
  getPosts,
  createPost,
  deletePost,
  likePost,
  getSinglePost,
  getToursByTag,
  getRelatedPosts,
  getToursByUser,
  getTourByCategory,
  updatePost,
  getToursBySearch,
  dislikePost,
} from "../controller/posts";

const router = express.Router();

router
  .route("/")
  .get(getPosts)
  .post([protect, postUpload.single("postImage")], createPost);
router.route("/by-user").get(protect, getToursByUser);
router
  .route("/post/:id")
  .patch([protect, postUpload.single("postImage")], updatePost)
  .delete([protect, postUpload.single("postImage")], deletePost)
  .get(getSinglePost);
router.route("/like").put([protect, postUpload.any()], likePost);
router.route("/dislike").put([protect, postUpload.any()], dislikePost);
router.route("/tag/:tag").get(getToursByTag);
router.route("/category/:categ").get(getTourByCategory);
router.route("/related-post/:id").post(postUpload.any(), getRelatedPosts);
router.route("/search").get(getToursBySearch);

export default router;

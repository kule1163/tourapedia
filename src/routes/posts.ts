import express from "express";
import { protect } from "../middleWares/authMiddleWare";
import { uploadMulter } from "../middleWares/multer";
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
  .post([protect, uploadMulter.single("postImage")], createPost);
router.route("/by-user").get(protect, getToursByUser);
router
  .route("/post/:id")
  .patch([protect, uploadMulter.single("postImage")], updatePost)
  .delete([protect, uploadMulter.single("postImage")], deletePost)
  .get(getSinglePost);
router.route("/like").put([protect, uploadMulter.any()], likePost);
router.route("/dislike").put([protect, uploadMulter.any()], dislikePost);
router.route("/tag/:tag").get(getToursByTag);
router.route("/category/:categ").get(getTourByCategory);
router.route("/related-post/:id").post(uploadMulter.any(), getRelatedPosts);
router.route("/search").get(getToursBySearch);

export default router;

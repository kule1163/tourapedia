import express from "express";
import {
  getDislikes,
  getLikes,
  unDislike,
  unLike,
  upDislike,
  upLike,
} from "../controller/like";
import { protect } from "../middleWares/authMiddleWare";
import { likeVeriable } from "../middleWares/likeMiddleware";
import { postUpload } from "../middleWares/multerMiddleware/postMulter";

const router = express.Router();

router.route("/getLikes").post([postUpload.any()], getLikes);
router.route("/uplike").post([postUpload.any(), protect, likeVeriable], upLike);
router.route("/unlike").post([postUpload.any(), protect, likeVeriable], unLike);

router.route("/getDislikes").post([postUpload.any()], getDislikes);
router
  .route("/upDislike")
  .post([postUpload.any(), protect, likeVeriable], upDislike);
router
  .route("/unDislike")
  .post([postUpload.any(), protect, likeVeriable], unDislike);

export default router;

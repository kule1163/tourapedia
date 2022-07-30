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
import { uploadMulter } from "../middleWares/multer";

const router = express.Router();

router.route("/getLikes").post([uploadMulter.any()], getLikes);
router
  .route("/uplike")
  .post([uploadMulter.any(), protect, likeVeriable], upLike);
router
  .route("/unlike")
  .post([uploadMulter.any(), protect, likeVeriable], unLike);

router.route("/getDislikes").post([uploadMulter.any()], getDislikes);
router
  .route("/upDislike")
  .post([uploadMulter.any(), protect, likeVeriable], upDislike);
router
  .route("/unDislike")
  .post([uploadMulter.any(), protect, likeVeriable], unDislike);

export default router;

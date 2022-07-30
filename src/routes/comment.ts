import express from "express";
import { createComment, getComments, getReplies } from "../controller/comment";
import { protect } from "../middleWares/authMiddleWare";
import { uploadMulter } from "../middleWares/multer";

const router = express.Router();

router.route("/:postId").get(getComments);
router.route("/add-comment").post([protect, uploadMulter.any()], createComment);
router.route("/get-replies").post(uploadMulter.any(), getReplies);

export default router;

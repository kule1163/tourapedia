import express from "express";
import { createComment, getComments, getReplies } from "../controller/comment";
import { protect } from "../middleWares/authMiddleWare";
import { postUpload } from "../middleWares/multerMiddleware/postMulter";

const router = express.Router();

router.route("/:postId").get(getComments);
router.route("/add-comment").post([protect, postUpload.any()], createComment);
router.route("/get-replies").post(postUpload.any(), getReplies);

export default router;

import express from "express";
import {
  changePassword,
  editProfile,
  forgetPassword,
  getMe,
  loginUser,
  registerUser,
  resetPassword,
} from "../controller/auth";
import { protect } from "../middleWares/authMiddleWare";
import { uploadMulter } from "../middleWares/multer";

const router = express.Router();

router.post("/", uploadMulter.single("profilePhoto"), registerUser);
router.patch(
  "/edit",
  [uploadMulter.single("profilePhoto"), protect],
  editProfile
);
router.post("/login", uploadMulter.any(), loginUser);
router.get("/me", protect, getMe);
router.patch("/change-password", [protect, uploadMulter.any()], changePassword);
router
  .route("/reset-password")
  .patch([protect, uploadMulter.any()], resetPassword);
router.route("/forget-password").post(uploadMulter.any(), forgetPassword);
export default router;

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
import { authUpload } from "../middleWares/multerMiddleware/authMulter";

const router = express.Router();

router.post("/", authUpload.single("profilePhoto"), registerUser);
router.patch(
  "/edit",
  [authUpload.single("profilePhoto"), protect],
  editProfile
);
router.post("/login", authUpload.any(), loginUser);
router.get("/me", protect, getMe);
router.patch("/change-password", [protect, authUpload.any()], changePassword);
router
  .route("/reset-password")
  .patch([protect, authUpload.any()], resetPassword);
router.route("/forget-password").post(authUpload.any(), forgetPassword);
export default router;

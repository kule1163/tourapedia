"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/auth");
const authMiddleWare_1 = require("../middleWares/authMiddleWare");
const authMulter_1 = require("../middleWares/multerMiddleware/authMulter");
const router = express_1.default.Router();
router.post("/", authMulter_1.authUpload.single("profilePhoto"), auth_1.registerUser);
router.patch("/edit", [authMulter_1.authUpload.single("profilePhoto"), authMiddleWare_1.protect], auth_1.editProfile);
router.post("/login", authMulter_1.authUpload.any(), auth_1.loginUser);
router.get("/me", authMiddleWare_1.protect, auth_1.getMe);
router.patch("/change-password", [authMiddleWare_1.protect, authMulter_1.authUpload.any()], auth_1.changePassword);
router
    .route("/reset-password")
    .patch([authMiddleWare_1.protect, authMulter_1.authUpload.any()], auth_1.resetPassword);
router.route("/forget-password").post(authMulter_1.authUpload.any(), auth_1.forgetPassword);
exports.default = router;

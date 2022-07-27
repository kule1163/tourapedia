"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.editProfile = exports.changePassword = exports.registerUser = exports.resetPassword = exports.forgetPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sendEmail = require("../utils/sendEmail");
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
exports.forgetPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (!user) {
        res.status(400).send("no user by this email");
    }
    if (user) {
        const reset_token = generateToken(user._id);
        yield (user === null || user === void 0 ? void 0 : user.updateOne({
            expireToken: reset_token,
        }));
        const url = `http://localhost:3000/reset-password/${reset_token}`;
        sendEmail(email, url);
        res.status(200).json(reset_token);
    }
}));
exports.resetPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword } = req.body;
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, salt);
    if (req.currentUser.expireToken) {
        const user = yield userModel_1.default.findOneAndUpdate({ _id: req.currentUser._id, expireToken: req.currentUser.expireToken }, {
            password: hashedPassword,
            _id: req.currentUser._id,
            firstname: "b",
            expireToken: "",
        }, { new: true });
        res.status(200).json(user);
    }
    else {
        res.status(400).send("no reset token");
    }
}));
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        res.status(400);
        throw new Error("please add all field");
    }
    const userExist = yield userModel_1.default.findOne({ email });
    if (userExist) {
        res.status(400).send("user already exist");
        /* throw new Error("user already exist"); */
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const user = yield userModel_1.default.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        profilePhoto: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
    });
    if (user) {
        res.status(201).json({
            _id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            profilePhoto: (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("invalid user");
    }
}));
exports.changePassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = req.body;
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, salt);
    const newUser = {
        password: hashedPassword,
        _id: req.currentUser._id,
    };
    const user = yield userModel_1.default.findOne({ email: req.currentUser.email });
    if (user && (yield bcryptjs_1.default.compare(oldPassword, user.password))) {
        yield user.updateOne(newUser, {
            new: true,
        });
        res.status(200).json("password changed");
    }
    else {
        res.status(400).send("your old password doesnt match");
    }
}));
exports.editProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    let newUser;
    if (req.file) {
        fs_1.default.unlink(path_1.default.join(__dirname, `../uploads/profilePhotos/${req.currentUser.profilePhoto}`), (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
        newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            profilePhoto: (_c = req.file) === null || _c === void 0 ? void 0 : _c.filename,
            _id: req.currentUser._id,
        };
    }
    else {
        newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            _id: req.currentUser._id,
        };
    }
    const editedUser = yield userModel_1.default.findByIdAndUpdate(req.currentUser._id, newUser, { new: true }).select("-password");
    res
        .status(200)
        .json({ editedUser, token: generateToken(req.currentUser._id) });
}));
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            profilePhoto: user.profilePhoto,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400).send("invalid user");
        /* throw new Error("invalid user"); */
    }
}));
exports.getMe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.currentUser) {
        res.status(200).json(req.currentUser);
    }
    else {
        throw new Error("there isnt current user");
    }
}));

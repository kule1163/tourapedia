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
exports.getReplies = exports.getComments = exports.createComment = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const commentModel_1 = __importDefault(require("../models/commentModel"));
exports.createComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment, postId, responseTo } = req.body;
    const newComment = new commentModel_1.default({
        postId: postId,
        writer: req.currentUser._id,
        content: comment,
        responseTo: responseTo ? responseTo : null,
    });
    newComment.save((err, comment) => {
        if (err)
            return res.status(400).json({ success: false, err });
        commentModel_1.default.find({ _id: comment._id })
            .populate("writer")
            .exec((err, result) => {
            if (err)
                return res.json({ success: false, err });
            return res.status(200).json({ success: true, result });
        });
    });
}));
exports.getComments = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    commentModel_1.default.find({ postId: req.params.postId })
        .sort({ createdAt: -1 })
        .populate("writer")
        .exec((err, result) => {
        if (err)
            return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
    });
}));
exports.getReplies = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { responseTo } = req.body;
    commentModel_1.default.find({ _id: responseTo })
        .populate("writer")
        .exec((err, result) => {
        if (err)
            return res.json(err);
        return res.status(200).json(result);
    });
}));

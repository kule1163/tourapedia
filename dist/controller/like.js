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
exports.unDislike = exports.upDislike = exports.getDislikes = exports.unLike = exports.upLike = exports.getLikes = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const commentModel_1 = __importDefault(require("../models/commentModel"));
const dislikeModel_1 = __importDefault(require("../models/handleLike/dislikeModel"));
const likeModel_1 = __importDefault(require("../models/handleLike/likeModel"));
const postModel_1 = __importDefault(require("../models/postModel"));
exports.getLikes = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.body;
    const likeCount = yield likeModel_1.default.find({ itemId });
    res.status(200).json(likeCount);
}));
exports.upLike = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, commentId } = req.body;
    let currentItem = null;
    if (postId)
        currentItem = yield postModel_1.default.findById(postId);
    if (commentId)
        currentItem = yield commentModel_1.default.findById(commentId);
    if (currentItem) {
        currentItem
            .updateOne({
            $push: { likes: req.currentUser._id },
            $pull: { dislikes: req.currentUser._id },
        }, { new: true })
            .exec((err) => {
            if (err)
                res.status(404).json({ success: false, err });
            res.status(200).json(req.likeVeriable);
        });
    }
}));
exports.unLike = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, commentId } = req.body;
    let currentItem = null;
    if (postId)
        currentItem = yield postModel_1.default.findById(postId);
    if (commentId)
        currentItem = yield commentModel_1.default.findById(commentId);
    if (currentItem) {
        currentItem
            .updateOne(req.body.itemId, {
            $pull: { likes: req.currentUser._id },
        })
            .exec((err, currentPost) => {
            if (err)
                res.status(404).json({ success: false, err });
            res.status(200).json(req.likeVeriable);
        });
    }
}));
exports.getDislikes = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.body;
    const dislikeCount = yield dislikeModel_1.default.find({ itemId });
    res.status(200).json(dislikeCount);
}));
exports.upDislike = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, commentId } = req.body;
    let currentItem = null;
    if (postId)
        currentItem = yield postModel_1.default.findById(postId);
    if (commentId)
        currentItem = yield commentModel_1.default.findById(commentId);
    if (currentItem) {
        currentItem
            .updateOne({
            $pull: { likes: req.currentUser._id },
            $push: { dislikes: req.currentUser._id },
        }, { new: true })
            .exec((err) => {
            if (err)
                res.status(404).json({ success: false, err });
            res.status(200).json(req.likeVeriable);
        });
    }
}));
exports.unDislike = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, commentId } = req.body;
    let currentItem = null;
    if (postId)
        currentItem = yield postModel_1.default.findById(postId);
    if (commentId)
        currentItem = yield commentModel_1.default.findById(commentId);
    if (currentItem) {
        currentItem
            .updateOne({
            $pull: { dislikes: req.currentUser._id },
        })
            .exec((err, currentPost) => {
            if (err)
                res.status(404).json({ success: false, err });
            res.status(200).json(req.likeVeriable);
        });
    }
}));

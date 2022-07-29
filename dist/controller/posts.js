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
exports.getToursBySearch = exports.getTourByCategory = exports.getRelatedPosts = exports.getToursByTag = exports.getSinglePost = exports.dislikePost = exports.likePost = exports.deletePost = exports.updatePost = exports.createPost = exports.getToursByUser = exports.getPosts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postModel_1 = __importDefault(require("../models/postModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
exports.getPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    const limit = 3;
    const startIndex = (Number(page) - 1) * limit;
    const total = yield postModel_1.default.countDocuments({});
    const tours = yield postModel_1.default.find()
        .limit(limit)
        .skip(startIndex)
        .sort({ createdAt: -1 });
    const posts = {
        data: tours,
        currentPage: Number(page),
        totalTours: total,
        numberOfPages: Math.ceil(total / limit),
    };
    if (posts) {
        res.status(200).json(posts);
    }
    else {
        throw new Error("something went wrong getPosts");
    }
}));
exports.getToursByUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    const limit = 3;
    const startIndex = (Number(page) - 1) * limit;
    const total = yield postModel_1.default.find({
        user: req.currentUser._id,
    }).countDocuments({});
    const tours = yield postModel_1.default.find({ user: req.currentUser._id })
        .limit(limit)
        .skip(startIndex)
        .sort({ createdAt: -1 });
    const posts = {
        data: tours,
        currentPage: Number(page),
        totalTours: total,
        numberOfPages: Math.ceil(total / limit),
    };
    if (!mongoose_1.default.Types.ObjectId.isValid(req.currentUser._id)) {
        res.status(404).json({ message: "User doesn't exist" });
    }
    res.status(200).json(posts);
}));
exports.createPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description, category, tags } = req.body;
    if (req.currentUser.id) {
        if (!title || !description || !tags || !category) {
            res.status(400);
            throw new Error("please add all field");
        }
        let result;
        if (req.file) {
            result = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        }
        const post = new postModel_1.default(Object.assign(Object.assign({}, req.body), { postImage: {
                url: result
                    ? result.secure_url
                    : "https://res.cloudinary.com/da30n9tw5/image/upload/v1659043847/cld-sample-2.jpg",
                public_id: result ? result.public_id : "default",
            }, user: req.currentUser.id }));
        if (post) {
            post.save();
            res.status(201).json(post);
        }
    }
    else {
        throw new Error("no user");
    }
}));
exports.updatePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new Error("id is not valid");
    }
    const post = yield postModel_1.default.findById(id);
    if (post) {
        if (!req.currentUser.id) {
            throw new Error("no user");
        }
        if (req.currentUser.id !== ((_b = post.user) === null || _b === void 0 ? void 0 : _b.toString())) {
            throw new Error("not authorized");
        }
        let newPost;
        if (req.file) {
            yield cloudinary_1.default.uploader.destroy(post.postImage.public_id);
            const result = yield cloudinary_1.default.uploader.upload((_c = req.file) === null || _c === void 0 ? void 0 : _c.path);
            newPost = Object.assign(Object.assign({}, req.body), { postImage: {
                    url: result
                        ? result.secure_url
                        : "https://res.cloudinary.com/da30n9tw5/image/upload/v1659043847/cld-sample-2.jpg",
                    public_id: result ? result.public_id : "default",
                }, _id: id });
        }
        else {
            newPost = {
                category: req.body.category,
                description: req.body.description,
                title: req.body.title,
                tags: req.body.tags,
                _id: id,
            };
        }
        const updatedPost = yield postModel_1.default.findByIdAndUpdate(id, newPost, {
            new: true,
        });
        res.json(updatedPost);
    }
}));
exports.deletePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findById(req.params.id);
    if (!post) {
        res.status(400);
        throw new Error("post not found");
    }
    if (!req.currentUser) {
        res.status(401);
        throw new Error("user not found");
    }
    if (post.user.toString() !== req.currentUser.id) {
        res.status(401);
        throw new Error("user not authorized");
    }
    if (post) {
        yield cloudinary_1.default.uploader.destroy(post.postImage.public_id);
    }
    yield post.remove();
    res.status(200).json({ id: req.params.id });
}));
exports.likePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findById(req.body.id);
    if (!post) {
        res.status(404);
        throw new Error("no post with that id");
    }
    else {
        const updatedPost = yield postModel_1.default.findByIdAndUpdate(req.body.id, {
            $push: { likes: req.currentUser._id },
        }, { new: true });
        res.status(200).json({ updatedPost, userId: req.currentUser._id });
    }
}));
exports.dislikePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findById(req.body.id);
    if (!post) {
        res.status(404);
        throw new Error("no post with that id");
    }
    else {
        const updatedPost = yield postModel_1.default.findByIdAndUpdate(req.body.id, { $pull: { likes: req.currentUser._id } }, { new: true });
        res.status(200).json({ updatedPost, userId: req.currentUser._id });
    }
}));
exports.getSinglePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findById(req.params.id);
    yield (post === null || post === void 0 ? void 0 : post.populate("user", "firstname lastname"));
    res.status(200).json(post);
}));
exports.getToursByTag = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tag } = req.params;
    const posts = yield postModel_1.default.find({ tags: { $in: tag } });
    res.status(200).json(posts);
}));
exports.getRelatedPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tags } = req.body;
    const { id } = req.params;
    const relatedPosts = yield postModel_1.default.find({
        tags: { $in: tags },
        _id: { $nin: id },
    });
    res.status(200).json(relatedPosts);
}));
exports.getTourByCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categ } = req.params;
    const posts = yield postModel_1.default.find({ category: categ });
    res.status(200).json(posts);
}));
exports.getToursBySearch = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchQuery } = req.query;
    const { page } = req.query;
    const limit = 3;
    const startIndex = (Number(page) - 1) * limit;
    if (searchQuery) {
        const title = new RegExp(searchQuery, "i");
        const total = yield postModel_1.default.find({ title }).countDocuments({});
        const tours = yield postModel_1.default.find({ title })
            .limit(limit)
            .skip(startIndex)
            .sort({ createdAt: -1 });
        const posts = {
            data: tours,
            currentPage: Number(page),
            totalTours: total,
            numberOfPages: Math.ceil(total / limit),
        };
        res.status(200).json(posts);
    }
    else {
        res.status(404).json({ message: "Something went wrong" });
    }
}));

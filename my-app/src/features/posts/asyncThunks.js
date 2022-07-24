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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPosts = exports.updatePost = exports.getPostByCateg = exports.getPostsByTag = exports.getRelatedPosts = exports.dislikePost = exports.likePost = exports.deletePost = exports.createPost = exports.getSinglePost = exports.getUserPosts = exports.getAllPosts = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const postServices_1 = require("../../services/postServices");
const postServices = new postServices_1.PostServices();
exports.getAllPosts = (0, toolkit_1.createAsyncThunk)("posts/getAllPosts", ({ page, navigate }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield postServices.getAllPosts(page);
        /* navigate(`/?page=${page}`); */
        return res.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.getUserPosts = (0, toolkit_1.createAsyncThunk)("posts/getUserPosts", (page, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = thunkAPI.getState().auth.user) === null || _a === void 0 ? void 0 : _a.token;
        if (token) {
            const res = yield postServices.getUserPosts(token, page);
            return res.data;
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.getSinglePost = (0, toolkit_1.createAsyncThunk)("posts/getSinglePost", (id, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield postServices.getSinglePost(id);
        return res.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.createPost = (0, toolkit_1.createAsyncThunk)("posts/createPost", ({ formData, navigate }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const token = (_b = thunkAPI.getState().auth.user) === null || _b === void 0 ? void 0 : _b.token;
        if (token) {
            const res = yield postServices.createPost(formData, token);
            navigate("/");
            return res.data;
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.deletePost = (0, toolkit_1.createAsyncThunk)("posts/deletePost", (id, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const token = (_c = thunkAPI.getState().auth.user) === null || _c === void 0 ? void 0 : _c.token;
        if (token) {
            yield postServices.deletePost(id, token);
            return id;
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.likePost = (0, toolkit_1.createAsyncThunk)("posts/likePost", (formData, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const token = (_d = thunkAPI.getState().auth.user) === null || _d === void 0 ? void 0 : _d.token;
        if (token) {
            const res = yield postServices.likePost(token, formData);
            return res.data;
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.dislikePost = (0, toolkit_1.createAsyncThunk)("posts/dislikePost", (formData, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const token = (_e = thunkAPI.getState().auth.user) === null || _e === void 0 ? void 0 : _e.token;
        if (token) {
            const res = yield postServices.dislikePost(token, formData);
            return res.data;
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.getRelatedPosts = (0, toolkit_1.createAsyncThunk)("posts/getRelatedPosts", ({ formData, id }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield postServices.getRelatedPosts({ formData, id });
        return res.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.getPostsByTag = (0, toolkit_1.createAsyncThunk)("posts/getPostsBytag", (tag, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield postServices.getPostsByTag(tag);
        return res.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.getPostByCateg = (0, toolkit_1.createAsyncThunk)("posts/getPostByCateg", (categ, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield postServices.getPostByCateg(categ);
        return res.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.updatePost = (0, toolkit_1.createAsyncThunk)("posts/updatePost", ({ formData, id, navigate }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const token = (_f = thunkAPI.getState().auth.user) === null || _f === void 0 ? void 0 : _f.token;
        if (token) {
            const res = yield postServices.updatePost(id, formData, token);
            navigate("/");
            return res.data;
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.searchPosts = (0, toolkit_1.createAsyncThunk)("posts/searchPosts", ({ searchQuery, page, navigate, searchValue }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield postServices.searchPosts(searchQuery, page);
        navigate(`/search?searchQuery=${searchValue}&page=${page}`);
        return res.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));

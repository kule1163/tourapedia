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
exports.getLikes = exports.unLike = exports.upLike = exports.getDislikes = exports.unDislike = exports.upDislike = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const likeSevices_1 = require("../../services/likeSevices");
const likeServices = new likeSevices_1.LikeServices();
exports.upDislike = (0, toolkit_1.createAsyncThunk)("dislike/upDislike", (formData, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = thunkAPI.getState().auth.user) === null || _a === void 0 ? void 0 : _a.token;
        if (token) {
            const res = yield likeServices.upDislike(formData, token);
            return res.data;
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.unDislike = (0, toolkit_1.createAsyncThunk)("dislike/unDislike", (formData, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const token = (_b = thunkAPI.getState().auth.user) === null || _b === void 0 ? void 0 : _b.token;
        if (token) {
            const res = yield likeServices.unDislike(formData, token);
            return res.data;
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.getDislikes = (0, toolkit_1.createAsyncThunk)("dislike/getDislikes", (formData, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield likeServices.getDislikes(formData);
        return res.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.upLike = (0, toolkit_1.createAsyncThunk)("like/upLike", (formData, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const token = (_c = thunkAPI.getState().auth.user) === null || _c === void 0 ? void 0 : _c.token;
        if (token) {
            const res = yield likeServices.upLike(formData, token);
            return res.data;
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.unLike = (0, toolkit_1.createAsyncThunk)("like/unLike", (formData, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const token = (_d = thunkAPI.getState().auth.user) === null || _d === void 0 ? void 0 : _d.token;
        if (token) {
            const res = yield likeServices.unLike(formData, token);
            return res.data;
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.getLikes = (0, toolkit_1.createAsyncThunk)("like/getLikes", (formData, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield likeServices.getLikes(formData);
        return res.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));

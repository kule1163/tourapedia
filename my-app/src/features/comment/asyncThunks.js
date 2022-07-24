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
exports.getComments = exports.createComment = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const commentServices_1 = require("../../services/commentServices");
const commentServices = new commentServices_1.CommentServices();
exports.createComment = (0, toolkit_1.createAsyncThunk)("comment/createComment", (comment, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = thunkAPI.getState().auth.user) === null || _a === void 0 ? void 0 : _a.token;
        if (token) {
            const res = yield commentServices.createComment(comment, token);
            return res.data.result[0];
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.getComments = (0, toolkit_1.createAsyncThunk)("comment/getComments", (postId, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield commentServices.getComments(postId);
        return res.data.result;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));

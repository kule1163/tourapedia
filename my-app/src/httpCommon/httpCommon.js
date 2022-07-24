"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpDislike = exports.httpLike = exports.httpComment = exports.httpPosts = exports.httpAuth = void 0;
const axios_1 = __importDefault(require("axios"));
exports.httpAuth = axios_1.default.create({
    baseURL: "http://localhost:5000/auth",
    headers: {
        "Content-Type": `application/x-www-form-urlencoded`,
    },
});
exports.httpPosts = axios_1.default.create({
    baseURL: "http://localhost:5000/posts",
});
exports.httpComment = axios_1.default.create({
    baseURL: "http://localhost:5000/comment",
});
exports.httpLike = axios_1.default.create({
    baseURL: "http://localhost:5000/like",
});
exports.httpDislike = axios_1.default.create({
    baseURL: "http://localhost:5000/dislike",
});

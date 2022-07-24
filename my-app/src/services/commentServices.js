"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentServices = void 0;
const httpCommon_1 = require("../httpCommon/httpCommon");
class CommentServices {
    constructor() {
        this.createComment = (formData, token) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpComment.post("/add-comment", formData, config);
        };
        this.getComments = (postId) => {
            return httpCommon_1.httpComment.get(`/${postId}`);
        };
        this.getReplies = (formData) => {
            return httpCommon_1.httpComment.post("/get-replies", formData);
        };
    }
}
exports.CommentServices = CommentServices;

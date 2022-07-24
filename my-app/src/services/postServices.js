"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostServices = void 0;
const httpCommon_1 = require("../httpCommon/httpCommon");
class PostServices {
    constructor() {
        this.getAllPosts = (page) => {
            return httpCommon_1.httpPosts.get(`?page=${page}`);
        };
        this.getUserPosts = (token, page) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpPosts.get(`/by-user?page=${page}`, config);
        };
        this.getSinglePost = (id) => {
            return httpCommon_1.httpPosts.get(`/post/${id}`);
        };
        this.createPost = (post, token) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpPosts.post("/", post, config);
        };
        this.deletePost = (id, token) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpPosts.delete(`/post/${id}`, config);
        };
        this.likePost = (token, formData) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpPosts.put(`/like`, formData, config);
        };
        this.dislikePost = (token, formData) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpPosts.put(`/dislike`, formData, config);
        };
        this.getPostsByTag = (tag) => {
            return httpCommon_1.httpPosts.get(`/tag/${tag}`);
        };
        this.getPostByCateg = (categ) => {
            return httpCommon_1.httpPosts.get(`/category/${categ}`);
        };
        this.getRelatedPosts = ({ formData, id }) => {
            return httpCommon_1.httpPosts.post(`/related-post/${id}`, formData);
        };
        this.updatePost = (id, formData, token) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpPosts.patch(`/post/${id}`, formData, config);
        };
        this.searchPosts = (query, page) => {
            return httpCommon_1.httpPosts.get(`/search?searchQuery=${query}&page=${page}`);
        };
    }
}
exports.PostServices = PostServices;

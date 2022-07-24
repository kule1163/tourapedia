"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentPage = exports.setCurrentPost = exports.resetSinglePost = exports.resetPost = exports.postsSlice = exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const asyncThunks_1 = require("../like/asyncThunks");
const asyncThunks_2 = require("./asyncThunks");
exports.initialState = {
    status: "idle",
    addTourStatus: "idle",
    singlePostStatus: "idle",
    deleteStatus: "idle",
    paginationToursStatus: "idle",
    likeStatus: "idle",
    entities: [],
    paginationTours: {},
    singlePost: {},
    message: "",
    singlePostMessage: "",
    currentPost: {},
    currentPage: 1,
    numberOfPages: null,
    dashboardNumberOfPages: null,
};
const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;
exports.postsSlice = (0, toolkit_1.createSlice)({
    name: "posts",
    initialState: exports.initialState,
    reducers: {
        resetSinglePost: (state) => {
            state.singlePostStatus = "idle";
            state.singlePost = {};
            state.message = "";
        },
        resetPost: (state) => {
            state.status = "idle";
            state.message = "";
        },
        setCurrentPost: (state, action) => {
            const currentPost = state.entities.find((item) => item._id === action.payload);
            if (currentPost)
                state.currentPost = currentPost;
            if (action.payload === "reset")
                state.currentPost = null;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        //getUserPosts
        builder.addCase(asyncThunks_2.getUserPosts.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(asyncThunks_2.getUserPosts.fulfilled, (state, action) => {
            state.status = "succeeded";
            if (action.payload) {
                state.entities = action.payload.data;
                state.currentPage = action.payload.currentPage;
                state.numberOfPages = action.payload.numberOfPages;
            }
        });
        builder.addCase(asyncThunks_2.getUserPosts.rejected, (state, action) => {
            state.status = "failed";
            state.message = action.payload;
        });
        //getSinglePost
        builder.addCase(asyncThunks_2.getSinglePost.pending, (state) => {
            state.singlePostStatus = "pending";
        });
        builder.addCase(asyncThunks_2.getSinglePost.fulfilled, (state, action) => {
            state.singlePostStatus = "succeeded";
            state.singlePost = action.payload;
        });
        builder.addCase(asyncThunks_2.getSinglePost.rejected, (state, action) => {
            state.singlePostStatus = "failed";
            state.singlePostMessage = action.payload;
        });
        //getAllPosts
        builder.addCase(asyncThunks_2.getAllPosts.pending, (state) => {
            state.paginationToursStatus = "pending";
        });
        builder.addCase(asyncThunks_2.getAllPosts.fulfilled, (state, action) => {
            state.paginationToursStatus = "succeeded";
            state.entities = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.numberOfPages = action.payload.numberOfPages;
        });
        builder.addCase(asyncThunks_2.getAllPosts.rejected, (state, action) => {
            state.paginationToursStatus = "failed";
            state.message = action.payload;
        });
        //getRelatedPosts
        builder.addCase(asyncThunks_2.getRelatedPosts.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(asyncThunks_2.getRelatedPosts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.entities = action.payload;
        });
        builder.addCase(asyncThunks_2.getRelatedPosts.rejected, (state, action) => {
            state.status = "failed";
            state.message = action.payload;
        });
        //createPost
        builder.addCase(asyncThunks_2.createPost.pending, (state) => {
            state.addTourStatus = "pending";
        });
        builder.addCase(asyncThunks_2.createPost.fulfilled, (state, action) => {
            state.entities = [...state.entities, action.payload];
            state.addTourStatus = "succeeded";
        });
        builder.addCase(asyncThunks_2.createPost.rejected, (state, action) => {
            state.addTourStatus = "failed";
            state.message = action.payload;
        });
        //uodatePost
        builder.addCase(asyncThunks_2.updatePost.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(asyncThunks_2.updatePost.fulfilled, (state) => {
            state.status = "succeeded";
        });
        builder.addCase(asyncThunks_2.updatePost.rejected, (state, action) => {
            state.status = "failed";
            state.message = action.payload;
        });
        //deletePost
        builder.addCase(asyncThunks_2.deletePost.pending, (state) => {
            state.deleteStatus = "pending";
        });
        builder.addCase(asyncThunks_2.deletePost.fulfilled, (state, action) => {
            state.deleteStatus = "succeeded";
            state.entities = state.entities.filter((item) => item._id !== action.payload);
        });
        builder.addCase(asyncThunks_2.deletePost.rejected, (state, action) => {
            state.deleteStatus = "failed";
            state.message = action.payload;
        });
        //likePost
        builder.addCase(asyncThunks_2.likePost.pending, (state) => {
            state.likeStatus = "pending";
        });
        builder.addCase(asyncThunks_2.likePost.fulfilled, (state, action) => {
            state.likeStatus = "succeeded";
            if (action.payload) {
                state.entities = state.entities.map((item) => {
                    var _a;
                    return item._id === ((_a = action.payload) === null || _a === void 0 ? void 0 : _a.updatedPost._id)
                        ? Object.assign(Object.assign({}, item), { likes: [...item.likes, action.payload.userId] }) : item;
                });
            }
        });
        builder.addCase(asyncThunks_2.likePost.rejected, (state, action) => {
            state.likeStatus = "failed";
            state.message = action.payload;
        });
        //dislikePost
        builder.addCase(asyncThunks_2.dislikePost.pending, (state) => {
            state.likeStatus = "pending";
        });
        builder.addCase(asyncThunks_2.dislikePost.fulfilled, (state, action) => {
            state.likeStatus = "succeeded";
            if (action.payload) {
                state.entities = state.entities.map((item) => {
                    var _a;
                    return item._id === ((_a = action.payload) === null || _a === void 0 ? void 0 : _a.updatedPost._id)
                        ? Object.assign(Object.assign({}, item), { likes: item.likes.filter((like) => { var _a; return like !== ((_a = action.payload) === null || _a === void 0 ? void 0 : _a.userId); }) }) : item;
                });
            }
        });
        builder.addCase(asyncThunks_2.dislikePost.rejected, (state, action) => {
            state.likeStatus = "failed";
            state.message = action.payload;
        });
        //getByTagName
        builder.addCase(asyncThunks_2.getPostsByTag.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(asyncThunks_2.getPostsByTag.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.entities = action.payload;
        });
        builder.addCase(asyncThunks_2.getPostsByTag.rejected, (state, action) => {
            state.status = "failed";
            state.message = action.payload;
        });
        //getPostByCateg
        builder.addCase(asyncThunks_2.getPostByCateg.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(asyncThunks_2.getPostByCateg.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.entities = action.payload;
        });
        builder.addCase(asyncThunks_2.getPostByCateg.rejected, (state, action) => {
            state.status = "failed";
            state.message = action.payload;
        });
        //getPostSeaechQuery
        builder.addCase(asyncThunks_2.searchPosts.pending, (state) => {
            state.paginationToursStatus = "pending";
        });
        builder.addCase(asyncThunks_2.searchPosts.fulfilled, (state, action) => {
            state.paginationToursStatus = "succeeded";
            state.entities = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.numberOfPages = action.payload.numberOfPages;
        });
        builder.addCase(asyncThunks_2.searchPosts.rejected, (state, action) => {
            state.paginationToursStatus = "failed";
            state.message = action.payload;
        });
        //uplikePost
        builder.addCase(asyncThunks_1.upLike.pending, (state) => {
            state.likeStatus = "pending";
        });
        builder.addCase(asyncThunks_1.upLike.fulfilled, (state, action) => {
            state.likeStatus = "succeeded";
            state.entities = state.entities.map((item) => item._id === action.payload.postId
                ? Object.assign(Object.assign({}, item), { likes: [...item.likes, action.payload.userId], dislikes: item.dislikes.filter((item) => item !== action.payload.userId) }) : item);
        });
        builder.addCase(asyncThunks_1.upLike.rejected, (state, action) => {
            state.likeStatus = "failed";
            state.message = action.payload;
        });
        //unlikePost
        builder.addCase(asyncThunks_1.unLike.pending, (state) => {
            state.likeStatus = "pending";
        });
        builder.addCase(asyncThunks_1.unLike.fulfilled, (state, action) => {
            state.likeStatus = "succeeded";
            const currentPost = state.entities.find((item) => item._id === action.payload.postId);
            if (currentPost) {
                currentPost.likes = currentPost.likes.filter((item) => item !== action.payload.userId);
            }
        });
        builder.addCase(asyncThunks_1.unLike.rejected, (state, action) => {
            state.likeStatus = "failed";
            state.message = action.payload;
        });
        //updislike
        builder.addCase(asyncThunks_1.upDislike.pending, (state) => {
            state.likeStatus = "pending";
        });
        builder.addCase(asyncThunks_1.upDislike.fulfilled, (state, action) => {
            state.likeStatus = "succeeded";
            state.entities = state.entities.map((item) => item._id === action.payload.postId
                ? Object.assign(Object.assign({}, item), { dislikes: [...item.dislikes, action.payload.userId], likes: item.likes.filter((item) => item !== action.payload.userId) }) : item);
        });
        builder.addCase(asyncThunks_1.upDislike.rejected, (state, action) => {
            state.likeStatus = "failed";
            state.message = action.payload;
        });
        //undislike
        builder.addCase(asyncThunks_1.unDislike.pending, (state) => {
            state.likeStatus = "pending";
        });
        builder.addCase(asyncThunks_1.unDislike.fulfilled, (state, action) => {
            state.likeStatus = "succeeded";
            const currentPost = state.entities.find((item) => item._id === action.payload.postId);
            if (currentPost) {
                currentPost.dislikes = currentPost.dislikes.filter((item) => item !== action.payload.userId);
            }
        });
        builder.addCase(asyncThunks_1.unDislike.rejected, (state, action) => {
            state.likeStatus = "failed";
            state.message = action.payload;
        });
    },
});
_a = exports.postsSlice.actions, exports.resetPost = _a.resetPost, exports.resetSinglePost = _a.resetSinglePost, exports.setCurrentPost = _a.setCurrentPost, exports.setCurrentPage = _a.setCurrentPage;
exports.default = exports.postsSlice.reducer;

"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentReply = exports.hideReply = exports.setChildComments = exports.setReply = exports.commentSlice = exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const asyncThunks_1 = require("./asyncThunks");
const asyncThunks_2 = require("../like/asyncThunks");
exports.initialState = {
    status: "idle",
    createStatus: "idle",
    likeStatus: "idle",
    currentReply: null,
    entities: [],
    message: "",
};
exports.commentSlice = (0, toolkit_1.createSlice)({
    name: "comment",
    initialState: exports.initialState,
    reducers: {
        hideReply: (state, action) => {
            const singleComment = state.entities.find((item) => item._id === action.payload);
            if (singleComment) {
                singleComment.reply = false;
            }
        },
        setReply: (state, action) => {
            const singleComment = state.entities.find((item) => item._id === action.payload);
            if (singleComment) {
                singleComment.reply = !singleComment.reply;
            }
        },
        setChildComments: (state, action) => {
            state.entities = state.entities.map((item) => item.responseTo === action.payload
                ? Object.assign(Object.assign({}, item), { childComments: !item.childComments }) : item);
        },
        setCurrentReply: (state, action) => {
            state.currentReply = action.payload;
        },
    },
    extraReducers: (builder) => {
        //createComment
        builder.addCase(asyncThunks_1.createComment.pending, (state) => {
            state.createStatus = "pending";
        });
        builder.addCase(asyncThunks_1.createComment.fulfilled, (state, action) => {
            state.createStatus = "succeeded";
            if (action.payload) {
                state.entities = [
                    Object.assign(Object.assign({}, action.payload), { reply: false, childComments: true, status: "succeded" }),
                    ...state.entities,
                ];
            }
        });
        builder.addCase(asyncThunks_1.createComment.rejected, (state, action) => {
            state.createStatus = "failed";
            state.message = action.payload;
        });
        //getComments
        builder.addCase(asyncThunks_1.getComments.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(asyncThunks_1.getComments.fulfilled, (state, action) => {
            state.status = "succeeded";
            if (action.payload) {
                state.entities = action.payload.map((item) => (Object.assign(Object.assign({}, item), { reply: false, childComments: false, status: "succeded" })));
            }
        });
        builder.addCase(asyncThunks_1.getComments.rejected, (state, action) => {
            state.status = "failed";
            state.message = action.payload;
        });
        //uplikePost
        builder.addCase(asyncThunks_2.upLike.pending, (state) => {
            state.likeStatus = "pending";
        });
        builder.addCase(asyncThunks_2.upLike.fulfilled, (state, action) => {
            state.likeStatus = "succeeded";
            state.entities = state.entities.map((item) => item._id === action.payload.commentId
                ? Object.assign(Object.assign({}, item), { likes: [...item.likes, action.payload.userId], dislikes: item.dislikes.filter((item) => item !== action.payload.userId) }) : item);
        });
        builder.addCase(asyncThunks_2.upLike.rejected, (state, action) => {
            state.likeStatus = "failed";
            state.message = action.payload;
        });
        //unlikePost
        builder.addCase(asyncThunks_2.unLike.pending, (state) => {
            state.likeStatus = "pending";
        });
        builder.addCase(asyncThunks_2.unLike.fulfilled, (state, action) => {
            state.likeStatus = "succeeded";
            const currentPost = state.entities.find((item) => item._id === action.payload.commentId);
            if (currentPost) {
                currentPost.likes = currentPost.likes.filter((item) => item !== action.payload.userId);
            }
        });
        builder.addCase(asyncThunks_2.unLike.rejected, (state, action) => {
            state.likeStatus = "failed";
            state.message = action.payload;
        });
        //updislike
        builder.addCase(asyncThunks_2.upDislike.pending, (state) => {
            state.likeStatus = "pending";
        });
        builder.addCase(asyncThunks_2.upDislike.fulfilled, (state, action) => {
            state.likeStatus = "succeeded";
            state.entities = state.entities.map((item) => item._id === action.payload.commentId
                ? Object.assign(Object.assign({}, item), { dislikes: [...item.dislikes, action.payload.userId], likes: item.likes.filter((item) => item !== action.payload.userId) }) : item);
        });
        builder.addCase(asyncThunks_2.upDislike.rejected, (state, action) => {
            state.likeStatus = "failed";
            state.message = action.payload;
        });
        //undislike
        builder.addCase(asyncThunks_2.unDislike.pending, (state) => {
            state.likeStatus = "pending";
        });
        builder.addCase(asyncThunks_2.unDislike.fulfilled, (state, action) => {
            state.likeStatus = "succeeded";
            const currentPost = state.entities.find((item) => item._id === action.payload.commentId);
            if (currentPost) {
                currentPost.dislikes = currentPost.dislikes.filter((item) => item !== action.payload.userId);
            }
        });
        builder.addCase(asyncThunks_2.unDislike.rejected, (state, action) => {
            state.likeStatus = "failed";
            state.message = action.payload;
        });
    },
});
_a = exports.commentSlice.actions, exports.setReply = _a.setReply, exports.setChildComments = _a.setChildComments, exports.hideReply = _a.hideReply, exports.setCurrentReply = _a.setCurrentReply;
exports.default = exports.commentSlice.reducer;

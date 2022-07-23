import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createComment, getComments } from "./asyncThunks";
import { CommentProps, SetLeftProps } from "./types";
import { upLike, unLike, unDislike, upDislike } from "../like/asyncThunks";

export interface CommentState {
  status: "idle" | "pending" | "succeeded" | "failed";
  createStatus: "idle" | "pending" | "succeeded" | "failed";
  likeStatus: "idle" | "pending" | "succeeded" | "failed";
  entities: CommentProps[];
  currentReply: string | null;
  message: any;
}

export const initialState: CommentState = {
  status: "idle",
  createStatus: "idle",
  likeStatus: "idle",
  currentReply: null,
  entities: [] as CommentProps[],
  message: "",
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    hideReply: (state, action: PayloadAction<string>) => {
      const singleComment = state.entities.find(
        (item) => item._id === action.payload
      );

      if (singleComment) {
        singleComment.reply = false;
      }
    },
    setReply: (state, action: PayloadAction<string>) => {
      const singleComment = state.entities.find(
        (item) => item._id === action.payload
      );

      if (singleComment) {
        singleComment.reply = !singleComment.reply;
      }
    },
    setChildComments: (state, action: PayloadAction<string>) => {
      state.entities = state.entities.map((item) =>
        item.responseTo === action.payload
          ? { ...item, childComments: !item.childComments }
          : item
      );
    },
    setCurrentReply: (state, action: PayloadAction<string | null>) => {
      state.currentReply = action.payload;
    },
  },
  extraReducers: (builder) => {
    //createComment
    builder.addCase(createComment.pending, (state) => {
      state.createStatus = "pending";
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.createStatus = "succeeded";
      if (action.payload) {
        state.entities = [
          {
            ...action.payload,
            reply: false,
            childComments: true,
            status: "succeded",
          },
          ...state.entities,
        ];
      }
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.createStatus = "failed";
      state.message = action.payload;
    });
    //getComments
    builder.addCase(getComments.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (action.payload) {
        state.entities = action.payload.map((item) => ({
          ...item,
          reply: false,
          childComments: false,
          status: "succeded",
        }));
      }
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload;
    });
    //uplikePost
    builder.addCase(upLike.pending, (state) => {
      state.likeStatus = "pending";
    });
    builder.addCase(upLike.fulfilled, (state, action) => {
      state.likeStatus = "succeeded";
      state.entities = state.entities.map((item) =>
        item._id === action.payload.commentId
          ? {
              ...item,
              likes: [...item.likes, action.payload.userId],
              dislikes: item.dislikes.filter(
                (item) => item !== action.payload.userId
              ),
            }
          : item
      );
    });
    builder.addCase(upLike.rejected, (state, action) => {
      state.likeStatus = "failed";
      state.message = action.payload;
    });
    //unlikePost
    builder.addCase(unLike.pending, (state) => {
      state.likeStatus = "pending";
    });
    builder.addCase(unLike.fulfilled, (state, action) => {
      state.likeStatus = "succeeded";
      const currentPost = state.entities.find(
        (item) => item._id === action.payload.commentId
      );
      if (currentPost) {
        currentPost.likes = currentPost.likes.filter(
          (item) => item !== action.payload.userId
        );
      }
    });
    builder.addCase(unLike.rejected, (state, action) => {
      state.likeStatus = "failed";
      state.message = action.payload;
    });
    //updislike
    builder.addCase(upDislike.pending, (state) => {
      state.likeStatus = "pending";
    });
    builder.addCase(upDislike.fulfilled, (state, action) => {
      state.likeStatus = "succeeded";
      state.entities = state.entities.map((item) =>
        item._id === action.payload.commentId
          ? {
              ...item,
              dislikes: [...item.dislikes, action.payload.userId],
              likes: item.likes.filter(
                (item) => item !== action.payload.userId
              ),
            }
          : item
      );
    });
    builder.addCase(upDislike.rejected, (state, action) => {
      state.likeStatus = "failed";
      state.message = action.payload;
    });
    //undislike
    builder.addCase(unDislike.pending, (state) => {
      state.likeStatus = "pending";
    });
    builder.addCase(unDislike.fulfilled, (state, action) => {
      state.likeStatus = "succeeded";
      const currentPost = state.entities.find(
        (item) => item._id === action.payload.commentId
      );
      if (currentPost) {
        currentPost.dislikes = currentPost.dislikes.filter(
          (item) => item !== action.payload.userId
        );
      }
    });
    builder.addCase(unDislike.rejected, (state, action) => {
      state.likeStatus = "failed";
      state.message = action.payload;
    });
  },
});

export const { setReply, setChildComments, hideReply, setCurrentReply } =
  commentSlice.actions;

export default commentSlice.reducer;

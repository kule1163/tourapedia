import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Inputs } from "../../pages/addTour/AddTour";
import { unDislike, unLike, upDislike, upLike } from "../like/asyncThunks";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getSinglePost,
  getRelatedPosts,
  getUserPosts,
  likePost,
  getPostsByTag,
  getPostByCateg,
  searchPosts,
  dislikePost,
} from "./asyncThunks";
import { EntitieProps, PaginateTourProps } from "./types";

export interface PostState {
  status: "idle" | "pending" | "succeeded" | "failed";
  addTourStatus: "idle" | "pending" | "succeeded" | "failed";
  singlePostStatus: "idle" | "pending" | "succeeded" | "failed";
  deleteStatus: "idle" | "pending" | "succeeded" | "failed";
  paginationToursStatus: "idle" | "pending" | "succeeded" | "failed";
  likeStatus: "idle" | "pending" | "succeeded" | "failed";
  entities: EntitieProps[];
  paginationTours: PaginateTourProps;
  singlePost: EntitieProps;
  message: any;
  singlePostMessage: any;
  currentPost: EntitieProps | null;
  currentPage: number;
  numberOfPages: number | null;
  dashboardNumberOfPages: number | null;
}

export const initialState: PostState = {
  status: "idle",
  addTourStatus: "idle",
  singlePostStatus: "idle",
  deleteStatus: "idle",
  paginationToursStatus: "idle",
  likeStatus: "idle",
  entities: [],
  paginationTours: {} as PaginateTourProps,
  singlePost: {} as EntitieProps,
  message: "",
  singlePostMessage: "",
  currentPost: {} as EntitieProps,
  currentPage: 1,
  numberOfPages: null,
  dashboardNumberOfPages: null,
};

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") || "{}")
  : null;

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetSinglePost: (state) => {
      state.singlePostStatus = "idle";
      state.singlePost = {} as EntitieProps;
      state.message = "";
    },
    resetPost: (state) => {
      state.status = "idle";
      state.message = "";
    },
    setCurrentPost: (state, action: PayloadAction<string>) => {
      const currentPost = state.entities.find(
        (item) => item._id === action.payload
      );

      if (currentPost) state.currentPost = currentPost;
      if (action.payload === "reset") state.currentPost = null;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    //getUserPosts
    builder.addCase(getUserPosts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (action.payload) {
        state.entities = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      }
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload;
    });
    //getSinglePost
    builder.addCase(getSinglePost.pending, (state) => {
      state.singlePostStatus = "pending";
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.singlePostStatus = "succeeded";
      state.singlePost = action.payload;
    });
    builder.addCase(getSinglePost.rejected, (state, action) => {
      state.singlePostStatus = "failed";
      state.singlePostMessage = action.payload;
    });
    //getAllPosts
    builder.addCase(getAllPosts.pending, (state) => {
      state.paginationToursStatus = "pending";
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.paginationToursStatus = "succeeded";
      state.entities = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.paginationToursStatus = "failed";
      state.message = action.payload;
    });
    //getRelatedPosts
    builder.addCase(getRelatedPosts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getRelatedPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.entities = action.payload;
    });
    builder.addCase(getRelatedPosts.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload;
    });

    //createPost
    builder.addCase(createPost.pending, (state) => {
      state.addTourStatus = "pending";
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.entities = [...state.entities, action.payload];
      state.addTourStatus = "succeeded";
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.addTourStatus = "failed";
      state.message = action.payload;
    });
    //uodatePost
    builder.addCase(updatePost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updatePost.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload;
    });
    //deletePost
    builder.addCase(deletePost.pending, (state) => {
      state.deleteStatus = "pending";
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.deleteStatus = "succeeded";
      state.entities = state.entities.filter(
        (item) => item._id !== action.payload
      );
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.deleteStatus = "failed";
      state.message = action.payload;
    });
    //likePost
    builder.addCase(likePost.pending, (state) => {
      state.likeStatus = "pending";
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.likeStatus = "succeeded";
      if (action.payload) {
        state.entities = state.entities.map((item) =>
          item._id === action.payload?.updatedPost._id
            ? { ...item, likes: [...item.likes, action.payload.userId] }
            : item
        );
      }
    });
    builder.addCase(likePost.rejected, (state, action) => {
      state.likeStatus = "failed";
      state.message = action.payload;
    });
    //dislikePost
    builder.addCase(dislikePost.pending, (state) => {
      state.likeStatus = "pending";
    });
    builder.addCase(dislikePost.fulfilled, (state, action) => {
      state.likeStatus = "succeeded";
      if (action.payload) {
        state.entities = state.entities.map((item) =>
          item._id === action.payload?.updatedPost._id
            ? {
                ...item,
                likes: item.likes.filter(
                  (like) => like !== action.payload?.userId
                ),
              }
            : item
        );
      }
    });
    builder.addCase(dislikePost.rejected, (state, action) => {
      state.likeStatus = "failed";
      state.message = action.payload;
    });
    //getByTagName
    builder.addCase(getPostsByTag.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getPostsByTag.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.entities = action.payload;
    });
    builder.addCase(getPostsByTag.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload;
    });
    //getPostByCateg
    builder.addCase(getPostByCateg.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getPostByCateg.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.entities = action.payload;
    });
    builder.addCase(getPostByCateg.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload;
    });
    //getPostSeaechQuery
    builder.addCase(searchPosts.pending, (state) => {
      state.paginationToursStatus = "pending";
    });
    builder.addCase(searchPosts.fulfilled, (state, action) => {
      state.paginationToursStatus = "succeeded";
      state.entities = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;
    });
    builder.addCase(searchPosts.rejected, (state, action) => {
      state.paginationToursStatus = "failed";
      state.message = action.payload;
    });
    //uplikePost
    builder.addCase(upLike.pending, (state) => {
      state.likeStatus = "pending";
    });
    builder.addCase(upLike.fulfilled, (state, action) => {
      state.likeStatus = "succeeded";
      state.entities = state.entities.map((item) =>
        item._id === action.payload.postId
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
        (item) => item._id === action.payload.postId
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
        item._id === action.payload.postId
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
        (item) => item._id === action.payload.postId
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

export const { resetPost, resetSinglePost, setCurrentPost, setCurrentPage } =
  postsSlice.actions;

export default postsSlice.reducer;

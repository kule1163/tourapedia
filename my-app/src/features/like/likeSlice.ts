import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getDislikes,
  getLikes,
  unDislike,
  unLike,
  upDislike,
  upLike,
} from "./asyncThunks";
import { LikeProps } from "./types";

export interface LikeState {
  dislikeStatus: "idle" | "pending" | "succeeded" | "failed";
  dislikeEntities: LikeProps[];
  likeStatus: "idle" | "pending" | "succeeded" | "failed";
  likeEntities: LikeProps[];
  message: any;
  itemId: string;
}

export const initialState: LikeState = {
  dislikeStatus: "idle",
  dislikeEntities: [] as LikeProps[],
  likeStatus: "idle",
  likeEntities: [] as LikeProps[],
  message: "",
  itemId: "",
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    setItemId: (state, action: PayloadAction<string>) => {
      state.itemId = action.payload;
    },
  },
  extraReducers: (builder) => {
    /*  //getDislike
    builder.addCase(getDislikes.pending, (state) => {
      state.dislikeStatus = "pending";
    });
    builder.addCase(getDislikes.fulfilled, (state, action) => {
      state.dislikeStatus = "succeeded";
      if (action.payload) {
        state.dislikeEntities = action.payload;
      }
    });
    builder.addCase(getDislikes.rejected, (state, action) => {
      state.dislikeStatus = "failed";
      state.message = action.payload;
    });
    //upDislike
    builder.addCase(upDislike.pending, (state) => {
      state.dislikeStatus = "pending";
    });
    builder.addCase(upDislike.fulfilled, (state, action) => {
      state.dislikeStatus = "succeeded";
      if (action.payload) {
        state.dislikeEntities = [
          ...state.dislikeEntities,
          action.payload.dislikeResult,
        ];
        state.likeEntities = state.likeEntities.filter(
          (item) =>
            item.userId !== action.payload?.likeResult.userId &&
            item.itemId !== action.payload?.likeResult.itemId
        );
      }
    });
    builder.addCase(upDislike.rejected, (state, action) => {
      state.dislikeStatus = "failed";
      state.message = action.payload;
    });
    //unDisLike
    builder.addCase(unDislike.pending, (state) => {
      state.dislikeStatus = "pending";
    });
    builder.addCase(unDislike.fulfilled, (state, action) => {
      state.dislikeStatus = "succeeded";
      if (action.payload) {
        state.dislikeEntities = state.dislikeEntities.filter(
          (item) => item._id !== action.payload?._id
        );
      }
    });
    builder.addCase(unDislike.rejected, (state, action) => {
      state.dislikeStatus = "failed";
      state.message = action.payload;
    });
    //getLikes
    builder.addCase(getLikes.pending, (state) => {
      state.likeStatus = "pending";
    });
    builder.addCase(getLikes.fulfilled, (state, action) => {
      state.likeStatus = "succeeded";
      if (action.payload) {
        state.likeEntities = action.payload;
      }
    });
    builder.addCase(getLikes.rejected, (state, action) => {
      state.likeStatus = "failed";
      state.message = action.payload;
    });
    //upLike
    builder.addCase(upLike.pending, (state) => {
      state.likeStatus = "pending";
    });
    builder.addCase(upLike.fulfilled, (state, action) => {
      state.likeStatus = "succeeded";
      if (action.payload) {
        state.likeEntities = [...state.likeEntities, action.payload.likeResult];

        state.dislikeEntities = state.dislikeEntities.filter(
          (item) =>
            item.userId !== action.payload?.dislikeResult.userId &&
            item.itemId !== action.payload?.dislikeResult.itemId
        );
      }
    });
    builder.addCase(upLike.rejected, (state, action) => {
      state.likeStatus = "failed";
      state.message = action.payload;
    });
    //unlike
     builder.addCase(unLike.pending, (state) => {
      state.likeStatus = "pending";
    });
    builder.addCase(unLike.fulfilled, (state, action) => {
      state.likeStatus = "succeeded";
      if (action.payload) {
        state.likeEntities = state.likeEntities.filter(
          (item) => item._id !== action.payload?._id
        );
      }
    });
    builder.addCase(unLike.rejected, (state, action) => {
      state.likeStatus = "failed";
      state.message = action.payload;
    }); */
  },
});

export const { setItemId } = likeSlice.actions;

export default likeSlice.reducer;
